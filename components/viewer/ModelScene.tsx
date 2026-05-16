"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

interface ModelSceneProps {
  url: string;
  fileType: "stl" | "obj" | "step";
  onDimensions: (dims: { x: number; y: number; z: number }) => void;
}

/* ─────────────────────────────
   STL
───────────────────────────── */
function STLModel({
  url,
  onDimensions,
}: {
  url: string;
  onDimensions: ModelSceneProps["onDimensions"];
}) {
  const geometry = useLoader(STLLoader, url);

  const { meshGeometry, dimensions } = useMemo(() => {
    // IMPORTANT: clone so we don't mutate cached geometry
    const geo = geometry.clone();

    geo.computeBoundingBox();

    const box = geo.boundingBox!;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    // center geometry safely
    geo.translate(-center.x, -center.y, -center.z);

    return {
      meshGeometry: geo,
      dimensions: {
        x: Number(size.x.toFixed(2)),
        y: Number(size.y.toFixed(2)),
        z: Number(size.z.toFixed(2)),
      },
    };
  }, [geometry]);

  useEffect(() => {
    onDimensions(dimensions);
  }, [dimensions, onDimensions]);

  return (
    <mesh geometry={meshGeometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#B0BEC5"
        metalness={0.25}
        roughness={0.6}
      />
    </mesh>
  );
}

/* ─────────────────────────────
   OBJ
───────────────────────────── */
function OBJModel({
  url,
  onDimensions,
}: {
  url: string;
  onDimensions: ModelSceneProps["onDimensions"];
}) {
  const obj = useLoader(OBJLoader, url);

  const { scene, dimensions } = useMemo(() => {
    const cloned = obj.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    cloned.position.sub(center);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.material = new THREE.MeshStandardMaterial({
          color: "#B0BEC5",
          metalness: 0.25,
          roughness: 0.6,
        });
      }
    });

    return {
      scene: cloned,
      dimensions: {
        x: Number(size.x.toFixed(2)),
        y: Number(size.y.toFixed(2)),
        z: Number(size.z.toFixed(2)),
      },
    };
  }, [obj]);

  useEffect(() => {
    onDimensions(dimensions);
  }, [dimensions, onDimensions]);

  return <primitive object={scene} />;
}

/* ─────────────────────────────
   MAIN
───────────────────────────── */
export function ModelScene({
  url,
  fileType,
  onDimensions,
}: ModelSceneProps) {
  // STEP fallback (important)
  if (fileType === "step") {
    return null;
  }

  if (fileType === "obj") {
    return <OBJModel url={url} onDimensions={onDimensions} />;
  }

  return <STLModel url={url} onDimensions={onDimensions} />;
}
