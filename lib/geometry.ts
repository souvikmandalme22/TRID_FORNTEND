import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const MIN_VOLUME_CC = 0.1;
const BOUNDING_BOX_SOLID_RATIO = 0.35;
const DEFAULT_SHELL_MATERIAL_FACTOR = 0.28;

const SUPPORT_RATIO_BY_USE_CASE: Record<string, number> = {
  showpiece: 0.003,
  fit: 0.01,
  daily: 0.012,
  heavy: 0.018,
};

function calcSignedVolumeCc(geometry: THREE.BufferGeometry): number {
  const position = geometry.attributes.position;
  let volume = 0;

  if (!position || position.count < 3) return 0;

  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const v3 = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 3) {
    v1.fromBufferAttribute(position, i);
    v2.fromBufferAttribute(position, i + 1);
    v3.fromBufferAttribute(position, i + 2);

    // v1 · (v2 × v3) / 6
    volume += v1.dot(v2.clone().cross(v3)) / 6;
  }

  return Math.abs(volume) / 1000;
}

function estimateBoundingBoxVolumeCc(geometry: THREE.BufferGeometry): number {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) return 0;

  const size = new THREE.Vector3();
  box.getSize(size);

  const boxVolumeCc = Math.abs(size.x * size.y * size.z) / 1000;
  if (!Number.isFinite(boxVolumeCc) || boxVolumeCc <= 0) return 0;

  return boxVolumeCc * BOUNDING_BOX_SOLID_RATIO;
}

/**
 * STL/OBJ mesh volume in cc. Closed meshes use signed tetrahedrons; open or
 * inconsistent meshes get a bounding-box estimate instead of the fixed app
 * fallback, so different uploads still produce different quotes.
 */
function calcVolumeFromGeometry(geometry: THREE.BufferGeometry): number {
  const signedVolume = calcSignedVolumeCc(geometry);
  if (signedVolume > MIN_VOLUME_CC) return signedVolume;
  return estimateBoundingBoxVolumeCc(geometry);
}

export async function calculateFileVolume(file: File): Promise<number> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "stl") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const buffer   = e.target?.result as ArrayBuffer;
          const loader   = new STLLoader();
          const geometry = loader.parse(buffer);
          resolve(calcVolumeFromGeometry(geometry));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  if (ext === "obj") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text   = e.target?.result as string;
          const loader = new OBJLoader();
          const obj    = loader.parse(text);
          let   total  = 0;

          obj.traverse((child: any) => {
            if (child.isMesh && child.geometry) {
              total += calcVolumeFromGeometry(child.geometry);
            }
          });

          resolve(total);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // STEP files — browser mein parse nahi ho sakta, fallback use karo
  return 0;
}

export function calcSupportVolume(
  modelVolumeCc: number,
  options: { materialSlug?: string; useCase?: string } = {}
): number {
  const materialSlug = options.materialSlug?.toLowerCase() ?? "";

  if (materialSlug.includes("sls") || materialSlug.includes("mjf")) {
    return 0;
  }

  const ratio = materialSlug.includes("resin")
    ? 0.015
    : SUPPORT_RATIO_BY_USE_CASE[options.useCase ?? ""] ?? 0.01;

  return parseFloat((modelVolumeCc * ratio).toFixed(2));
}

export function calcEffectiveVolume(
  modelVolumeCc   : number,
  supportVolumeCc : number,
  infillPercent   : number
): number {
  const infill        = infillPercent / 100;
  const shellOverhead = DEFAULT_SHELL_MATERIAL_FACTOR;
  const effectiveModel = modelVolumeCc * (shellOverhead + (1 - shellOverhead) * infill);
  return parseFloat((effectiveModel + supportVolumeCc).toFixed(2));
}
