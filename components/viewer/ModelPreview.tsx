"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SceneLighting } from "./SceneLighting";

export default function ModelPreview({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [80, 60, 120], fov: 45 }}
        style={{ background: "#111315" }}
      >
        <SceneLighting />

        {/* TODO: replace with actual loaded model later */}
        <mesh>
          <boxGeometry args={[40, 40, 40]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>

        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}
