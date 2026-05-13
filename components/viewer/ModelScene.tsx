"use client";

import { useEffect, useRef, useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

interface ModelSceneProps {
  url: string;
  fileType: "stl" | "obj" | "step";
  onDimensions: (dims: { x: number; y: number; z: number }) => void;
}

function STLModel({ url, onDimensions }: { url: string; onDimensions: ModelSceneProps["onDimensions"] }) {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  const { centered, dimensions } = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Translate geometry to center
    geometry.translate(-center.x, -center.y, -center.z);

    return {
      centered: geometry,
      dimensions: {
        x: parseFloat(size.x.toFixed(2)),
        y: parseFloat(size.y.toFixed(2)),
        z: parseFloat(size.z.toFixed(2)),
      },
    };
  }, [geometry]);

  useEffect(() => {
    onDimensions(dimensions);
  }, [dimensions, onDimensions]);

  return (
    <mesh ref={meshRef} geometry={centered} castShadow receiveShadow>
      <meshStandardMaterial
        color="#B0BEC5"
        metalness={0.4}
        roughness={0.55}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function OBJModel({ url, onDimensions }: { url: string; onDimensions: ModelSceneProps["onDimensions"] }) {
  const obj = useLoader(OBJLoader, url);

  const { centered, dimensions } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    obj.position.sub(center);

    // Apply material to all meshes
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: "#B0BEC5",
          metalness: 0.4,
          roughness: 0.55,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return {
      centered: obj,
      dimensions: {
        x: parseFloat(size.x.toFixed(2)),
        y: parseFloat(size.y.toFixed(2)),
        z: parseFloat(size.z.toFixed(2)),
      },
    };
  }, [obj]);

  useEffect(() => {
    onDimensions(dimensions);
  }, [dimensions, onDimensions]);

  return <primitive object={centered} />;
}

export function ModelScene({ url, fileType, onDimensions }: ModelSceneProps) {
  const { camera } = useThree();

  useEffect(() => {
    // Position camera for a nice angled view
    camera.position.set(80, 60, 120);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  if (fileType === "obj") {
    return <OBJModel url={url} onDimensions={onDimensions} />;
  }

  return <STLModel url={url} onDimensions={onDimensions} />;
}
