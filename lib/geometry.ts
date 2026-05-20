import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const MIN_VOLUME_CC            = 0.1;
const MAX_REASONABLE_VOLUME_CC = 10000;
const MAX_REASONABLE_DIM_MM    = 1000;
const WALL_THICKNESS_MM        = 1.2;
const SV_THIN_WALL_THRESHOLD   = 0.50;
const LARGE_PART_DIM_CM        = 15.0;
const LARGE_PART_BBOX_CC       = 1000;
const SUPPORT_INFILL_DENSITY   = 0.15;

export type PartType = "solid" | "thin_wall" | "structural";

export interface GeometryResult {
  modelVolumeCc:       number;
  supportVolumeCc:     number;
  effectiveMaterialCc: number;
  surfaceAreaCm2:      number;
  partType:            PartType;
  svRatio:             number;
  printTimeHrs:        number;
}

function calcSignedVolumeCc(geo: THREE.BufferGeometry): number {
  const pos = geo.attributes.position;
  if (!pos || pos.count < 3) return 0;
  let vol = 0;
  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const v3 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    v1.fromBufferAttribute(pos, i);
    v2.fromBufferAttribute(pos, i + 1);
    v3.fromBufferAttribute(pos, i + 2);
    vol += v1.dot(v2.clone().cross(v3)) / 6;
  }
  return Math.abs(vol) / 1000;
}

function calcSurfaceAreaCm2(geo: THREE.BufferGeometry): number {
  const pos = geo.attributes.position;
  if (!pos) return 0;
  let area = 0;
  const v1    = new THREE.Vector3();
  const v2    = new THREE.Vector3();
  const v3    = new THREE.Vector3();
  const cross = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    v1.fromBufferAttribute(pos, i);
    v2.fromBufferAttribute(pos, i + 1);
    v3.fromBufferAttribute(pos, i + 2);
    cross.crossVectors(v2.clone().sub(v1), v3.clone().sub(v1));
    area += cross.length() / 2;
  }
  return area / 100;
}

interface BBoxInfo {
  volumeCc: number;
  longestCm: number;
  x: number; y: number; z: number;
}

function getBBoxInfo(geo: THREE.BufferGeometry): BBoxInfo {
  geo.computeBoundingBox();
  const box = geo.boundingBox;
  if (!box) return { volumeCc: 0, longestCm: 0, x: 0, y: 0, z: 0 };
  const size = new THREE.Vector3();
  box.getSize(size);
  const xCm = size.x / 10;
  const yCm = size.y / 10;
  const zCm = size.z / 10;
  return {
    volumeCc:  xCm * yCm * zCm,
    longestCm: Math.max(xCm, yCm, zCm),
    x: xCm, y: yCm, z: zCm,
  };
}

function applyUnitCheck(geo: THREE.BufferGeometry): void {
  const bbox = getBBoxInfo(geo);
  if (bbox.longestCm * 10 > MAX_REASONABLE_DIM_MM) {
    geo.scale(0.03937, 0.03937, 0.03937);
  }
}

function detectPartType(
  meshVolumeCc: number,
  surfaceAreaCm2: number,
  bbox: BBoxInfo
): { partType: PartType; svRatio: number } {
  const svRatio = meshVolumeCc > 0 ? surfaceAreaCm2 / meshVolumeCc : 999;
  const isLarge = bbox.longestCm > LARGE_PART_DIM_CM || bbox.volumeCc > LARGE_PART_BBOX_CC;
  if (isLarge || svRatio > SV_THIN_WALL_THRESHOLD) {
    const partType: PartType =
      svRatio > 0.80 || bbox.longestCm > 25 ? "thin_wall" : "structural";
    return { partType, svRatio };
  }
  return { partType: "solid", svRatio };
}

function calcEffectiveVolumeCc(
  meshVolumeCc: number,
  surfaceAreaCm2: number,
  partType: PartType,
  infillPercent: number
): number {
  const infill      = infillPercent / 100;
  const wallThickCm = WALL_THICKNESS_MM / 10;
  let shellCc       = surfaceAreaCm2 * wallThickCm;
  shellCc           = Math.min(shellCc, meshVolumeCc * 0.95);
  const innerCc     = Math.max(0, meshVolumeCc - shellCc);
  let infillCc: number;
  if (partType === "solid") {
    infillCc = innerCc * infill;
  } else if (partType === "thin_wall") {
    infillCc = innerCc * Math.min(infill, 0.10);
  } else {
    infillCc = innerCc * (0.08 + infill * 0.30);
  }
  return parseFloat((shellCc + infillCc).toFixed(2));
}

function estimatePrintTimeHrs(
  effectiveCc: number,
  quality: "draft" | "standard" | "fine" = "standard"
): number {
  const speed: Record<string, number> = { draft: 12, standard: 8, fine: 3.5 };
  return parseFloat((effectiveCc / (speed[quality] || 8)).toFixed(2));
}

export function calcSupportVolume(
  modelVolumeCc: number,
  options: { materialSlug?: string; useCase?: string } = {}
): number {
  const slug = options.materialSlug?.toLowerCase() ?? "";
  if (slug.includes("sls") || slug.includes("mjf")) return 0;
  const ratioMap: Record<string, number> = {
    showpiece: 0.05,
    fit:       0.12,
    daily:     0.15,
    heavy:     0.20,
  };
  const ratio = ratioMap[options.useCase ?? ""] ?? 0.10;
  return parseFloat((modelVolumeCc * ratio * SUPPORT_INFILL_DENSITY).toFixed(2));
}

function calcVolumeFromGeometry(geo: THREE.BufferGeometry): number {
  applyUnitCheck(geo);
  const signed = calcSignedVolumeCc(geo);
  const bbox   = getBBoxInfo(geo);
  let final    = signed > MIN_VOLUME_CC ? signed : bbox.volumeCc * 0.35;
  if (final > MAX_REASONABLE_VOLUME_CC) final = bbox.volumeCc * 0.35;
  return parseFloat(final.toFixed(2));
}

async function parseSTL(file: File): Promise<THREE.BufferGeometry> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buf = e.target?.result as ArrayBuffer;
        resolve(new STLLoader().parse(buf));
      } catch (err) { reject(err); }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

async function parseOBJ(file: File): Promise<THREE.BufferGeometry[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const obj  = new OBJLoader().parse(text);
        const geos: THREE.BufferGeometry[] = [];
        obj.traverse((child: any) => {
          if (child.isMesh && child.geometry) geos.push(child.geometry);
        });
        resolve(geos);
      } catch (err) { reject(err); }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export async function getGeometryData(
  file: File,
  options?: {
    materialSlug?:  string;
    useCase?:       string;
    infillPercent?: number;
    quality?:       "draft" | "standard" | "fine";
  }
): Promise<GeometryResult> {
  const infill  = options?.infillPercent ?? 20;
  const quality = options?.quality ?? "standard";
  const ext     = file.name.split(".").pop()?.toLowerCase();

  let geo: THREE.BufferGeometry | null = null;
  let meshVolumeCc   = 0;
  let surfaceAreaCm2 = 0;

  if (ext === "stl") {
    geo            = await parseSTL(file);
    meshVolumeCc   = calcVolumeFromGeometry(geo);
    surfaceAreaCm2 = calcSurfaceAreaCm2(geo);
  } else if (ext === "obj") {
    const geos = await parseOBJ(file);
    for (const g of geos) {
      meshVolumeCc   += calcVolumeFromGeometry(g);
      surfaceAreaCm2 += calcSurfaceAreaCm2(g);
    }
    geo = geos[0] ?? null;
  } else {
    return {
      modelVolumeCc: 0, supportVolumeCc: 0,
      effectiveMaterialCc: 0, surfaceAreaCm2: 0,
      partType: "solid", svRatio: 0, printTimeHrs: 0,
    };
  }

  const bbox = geo ? getBBoxInfo(geo) : { volumeCc: 0, longestCm: 0, x: 0, y: 0, z: 0 };
  const { partType, svRatio } = detectPartType(meshVolumeCc, surfaceAreaCm2, bbox);

  const effectiveCc  = calcEffectiveVolumeCc(meshVolumeCc, surfaceAreaCm2, partType, infill);
  const supportCc    = calcSupportVolume(meshVolumeCc, {
    materialSlug: options?.materialSlug,
    useCase:      options?.useCase,
  });
  const printTimeHrs = estimatePrintTimeHrs(effectiveCc + supportCc, quality);

  console.info("[geometry]", { meshVolumeCc, surfaceAreaCm2, partType, svRatio, effectiveCc, supportCc });

  return {
    modelVolumeCc:       parseFloat(meshVolumeCc.toFixed(2)),
    supportVolumeCc:     supportCc,
    effectiveMaterialCc: parseFloat((effectiveCc + supportCc).toFixed(2)),
    surfaceAreaCm2:      parseFloat(surfaceAreaCm2.toFixed(2)),
    partType,
    svRatio:             parseFloat(svRatio.toFixed(4)),
    printTimeHrs,
  };
}

export { calcEffectiveVolumeCc as calcEffectiveVolume };
export { calcVolumeFromGeometry as calculateFileVolume };
