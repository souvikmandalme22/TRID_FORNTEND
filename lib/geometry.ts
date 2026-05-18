import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

/* ─────────────────────────────────────────────
   CONSTANTS
──────────────────────────────────────────── */

const MIN_VOLUME_CC = 0.1;

const BOUNDING_BOX_SOLID_RATIO = 0.35;

const DEFAULT_SHELL_FACTOR = 0.28;

const HOLLOW_RATIO_THRESHOLD = 0.25;

const ASSUMED_WALL_THICKNESS_MM = 2;

const MAX_REASONABLE_DIMENSION_MM = 1000;

const MAX_REASONABLE_VOLUME_CC = 10000;

/* ─────────────────────────────────────────────
   TYPES
──────────────────────────────────────────── */

export interface GeometryResult {
  modelVolumeCc: number;
  supportVolumeCc: number;
  effectiveMaterialCc: number;
}

/* ─────────────────────────────────────────────
   CORE VOLUME
──────────────────────────────────────────── */

function calcSignedVolumeCc(
  geometry: THREE.BufferGeometry
): number {
  const position = geometry.attributes.position;

  if (!position || position.count < 3) return 0;

  let volume = 0;

  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const v3 = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 3) {
    v1.fromBufferAttribute(position, i);
    v2.fromBufferAttribute(position, i + 1);
    v3.fromBufferAttribute(position, i + 2);

    volume += v1.dot(
      v2.clone().cross(v3)
    ) / 6;
  }

  // mm³ → cc
  return Math.abs(volume) / 1000;
}

/* ─────────────────────────────────────────────
   SURFACE AREA
──────────────────────────────────────────── */

function estimateSurfaceArea(
  geometry: THREE.BufferGeometry
): number {
  const position = geometry.attributes.position;

  if (!position) return 0;

  let area = 0;

  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const v3 = new THREE.Vector3();

  const cross = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 3) {
    v1.fromBufferAttribute(position, i);
    v2.fromBufferAttribute(position, i + 1);
    v3.fromBufferAttribute(position, i + 2);

    cross.crossVectors(
      v2.clone().sub(v1),
      v3.clone().sub(v1)
    );

    area += cross.length() / 2;
  }

  return area;
}

/* ─────────────────────────────────────────────
   BOUNDING BOX VOLUME
──────────────────────────────────────────── */

function estimateBoundingBoxVolumeCc(
  geometry: THREE.BufferGeometry
): number {
  geometry.computeBoundingBox();

  const box = geometry.boundingBox;

  if (!box) return 0;

  const size = new THREE.Vector3();

  box.getSize(size);

  const boxVolumeCc =
    Math.abs(size.x * size.y * size.z) / 1000;

  if (
    !Number.isFinite(boxVolumeCc) ||
    boxVolumeCc <= 0
  ) {
    return 0;
  }

  return boxVolumeCc * BOUNDING_BOX_SOLID_RATIO;
}

/* ─────────────────────────────────────────────
   UNIT SANITY CHECK
──────────────────────────────────────────── */

function applyUnitSanityCheck(
  geometry: THREE.BufferGeometry
) {
  geometry.computeBoundingBox();

  const box = geometry.boundingBox;

  if (!box) return;

  const size = new THREE.Vector3();

  box.getSize(size);

  const maxDim = Math.max(
    size.x,
    size.y,
    size.z
  );

  // Likely inches interpreted as mm
  if (maxDim > MAX_REASONABLE_DIMENSION_MM) {
    console.warn(
      "Large geometry detected. Applying scale correction."
    );

    geometry.scale(
      0.03937,
      0.03937,
      0.03937
    );
  }
}

/* ─────────────────────────────────────────────
   MAIN VOLUME LOGIC
──────────────────────────────────────────── */

function calcVolumeFromGeometry(
  geometry: THREE.BufferGeometry
): number {

  applyUnitSanityCheck(geometry);

  const signed = calcSignedVolumeCc(geometry);

  geometry.computeBoundingBox();

  const box = geometry.boundingBox;

  if (!box) {
    return signed > MIN_VOLUME_CC
      ? signed
      : estimateBoundingBoxVolumeCc(geometry);
  }

  const size = new THREE.Vector3();

  box.getSize(size);

  const bboxVolumeCc =
    Math.abs(size.x * size.y * size.z) / 1000;

  /* ─────────────────────────────────────────
     HOLLOW SHELL DETECTION
  ───────────────────────────────────────── */

  if (
    bboxVolumeCc > 0 &&
    signed / bboxVolumeCc <
      HOLLOW_RATIO_THRESHOLD &&
    signed > 500
  ) {
    const surfaceAreaMm2 =
      estimateSurfaceArea(geometry);

    const shellVolumeCc =
      (surfaceAreaMm2 *
        ASSUMED_WALL_THICKNESS_MM) /
      1000;

    const realisticShell =
      Math.max(
        shellVolumeCc,
        signed * 0.12
      );

    return parseFloat(
      realisticShell.toFixed(2)
    );
  }

  let finalVolume =
    signed > MIN_VOLUME_CC
      ? signed
      : estimateBoundingBoxVolumeCc(geometry);

  /* ─────────────────────────────────────────
     EXTREME VOLUME SAFETY
  ───────────────────────────────────────── */

  if (finalVolume > MAX_REASONABLE_VOLUME_CC) {
    console.warn(
      "Extreme volume detected:",
      finalVolume
    );

    finalVolume =
      estimateBoundingBoxVolumeCc(geometry);
  }

  return parseFloat(finalVolume.toFixed(2));
}

/* ─────────────────────────────────────────────
   FILE PARSERS
──────────────────────────────────────────── */

export async function calculateFileVolume(
  file: File
): Promise<number> {
  const ext = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  /* ─────────────────────────────────────────
     STL
  ───────────────────────────────────────── */

  if (ext === "stl") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const buffer =
            e.target?.result as ArrayBuffer;

          const loader = new STLLoader();

          const geometry =
            loader.parse(buffer);

          resolve(
            calcVolumeFromGeometry(
              geometry
            )
          );
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  }

  /* ─────────────────────────────────────────
     OBJ
  ───────────────────────────────────────── */

  if (ext === "obj") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const text =
            e.target?.result as string;

          const loader = new OBJLoader();

          const obj =
            loader.parse(text);

          let total = 0;

          obj.traverse((child: any) => {
            if (
              child.isMesh &&
              child.geometry
            ) {
              total +=
                calcVolumeFromGeometry(
                  child.geometry
                );
            }
          });

          resolve(
            parseFloat(total.toFixed(2))
          );
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = reject;

      reader.readAsText(file);
    });
  }

  // STEP not supported in browser

  return 0;
}

/* ─────────────────────────────────────────────
   SUPPORT ESTIMATION
──────────────────────────────────────────── */

export function calcSupportVolume(
  modelVolumeCc: number,
  options: {
    materialSlug?: string;
    useCase?: string;
  } = {}
): number {

  const slug =
    options.materialSlug?.toLowerCase() ??
    "";

  // SLS / MJF = no supports

  if (
    slug.includes("sls") ||
    slug.includes("mjf")
  ) {
    return 0;
  }

  const supportRatioMap: Record<
    string,
    number
  > = {
    showpiece: 0.003,
    fit: 0.01,
    daily: 0.012,
    heavy: 0.018,
  };

  const ratio =
    supportRatioMap[
      options.useCase ?? ""
    ] ?? 0.01;

  return parseFloat(
    (modelVolumeCc * ratio).toFixed(2)
  );
}

/* ─────────────────────────────────────────────
   EFFECTIVE MATERIAL
──────────────────────────────────────────── */

export function calcEffectiveVolume(
  modelVolumeCc: number,
  supportVolumeCc: number,
  infillPercent: number
): number {

  const infill =
    infillPercent / 100;

  const shellFactor =
    DEFAULT_SHELL_FACTOR;

  const effectiveModel =
    modelVolumeCc *
    (
      shellFactor +
      (1 - shellFactor) * infill
    );

  return parseFloat(
    (
      effectiveModel +
      supportVolumeCc
    ).toFixed(2)
  );
}

/* ─────────────────────────────────────────────
   SINGLE ENTRY POINT
──────────────────────────────────────────── */

export async function getGeometryData(
  file: File,
  options?: {
    materialSlug?: string;
    useCase?: string;
    infillPercent?: number;
  }
): Promise<GeometryResult> {

  const modelVolume =
    await calculateFileVolume(file);

  const supportVolume =
    calcSupportVolume(
      modelVolume,
      {
        materialSlug:
          options?.materialSlug,

        useCase:
          options?.useCase,
      }
    );

  const effective =
    calcEffectiveVolume(
      modelVolume,
      supportVolume,
      options?.infillPercent ?? 20
    );

  return {
    modelVolumeCc:
      parseFloat(
        modelVolume.toFixed(2)
      ),

    supportVolumeCc:
      supportVolume,

    effectiveMaterialCc:
      effective,
  };
}
