"use client";

import { useEffect, useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

interface ModelSceneProps {
  url: string;
  fileType: "stl" | "obj" | "step";
  onDimensions: (dims: { x: number; y: number; z: number }) => void;
}

type ModelDimensions = { x: number; y: number; z: number };

interface LoadedModelProps {
  url: string;
  onDimensions: (dims: ModelDimensions) => void;
}

function STLModel({ url, onDimensions }: LoadedModelProps) {
  const geometry = useLoader(STLLoader, url);

  const data = useMemo(() => {
    geometry.computeBoundingBox();

    const box = geometry.boundingBox!;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    geometry.translate(-center.x, -center.y, -center.z);

    return {
      geometry,
      dims: {
        x: Number(size.x.toFixed(2)),
        y: Number(size.y.toFixed(2)),
        z: Number(size.z.toFixed(2)),
      },
    };
  }, [geometry]);

  useEffect(() => {
    onDimensions(data.dims);
  }, [data, onDimensions]);

  return (
    <mesh geometry={data.geometry}>
      <meshStandardMaterial color="#B0BEC5" metalness={0.3} roughness={0.6} />
    </mesh>
  );
}

function OBJModel({ url, onDimensions }: LoadedModelProps) {
  const obj = useLoader(OBJLoader, url);

  const data = useMemo(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    obj.position.sub(center);

    obj.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#B0BEC5",
          metalness: 0.3,
          roughness: 0.6,
        });
      }
    });

    return {
      obj,
      dims: {
        x: Number(size.x.toFixed(2)),
        y: Number(size.y.toFixed(2)),
        z: Number(size.z.toFixed(2)),
      },
    };
  }, [obj]);

  useEffect(() => {
    onDimensions(data.dims);
  }, [data, onDimensions]);

  return <primitive object={data.obj} />;
}

export function ModelScene({ url, fileType, onDimensions }: ModelSceneProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(80, 60, 120);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  if (!url) return null;

  if (fileType === "obj") {
    return <OBJModel url={url} onDimensions={onDimensions} />;
  }

  return <STLModel url={url} onDimensions={onDimensions} />;
}
