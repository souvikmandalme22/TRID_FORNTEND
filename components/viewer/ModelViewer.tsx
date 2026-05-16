"use client";

import { Suspense, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, Grid } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ModelScene } from "./ModelScene";
import { SceneLighting } from "./SceneLighting";
import { cn } from "@/lib/utils";

interface Dimensions {
  x: number;
  y: number;
  z: number;
}

type FileType = "stl" | "obj" | "step";

interface ModelViewerProps {
  file: File;
  onConfirm: (file: File) => void;
  onReupload: () => void;
  className?: string;
}

function getFileType(name: string): FileType {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "obj") return "obj";
  return "stl";
}

function DimensionBadge({ dims }: { dims: Dimensions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-4 bg-black/60 border border-border rounded-xl px-3 py-2"
    >
      <span className="text-xs text-white font-mono">
        {dims.x} × {dims.y} × {dims.z} mm
      </span>
    </motion.div>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export function ModelViewer({
  file,
  onConfirm,
  onReupload,
  className,
}: ModelViewerProps) {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const fileType = useMemo(() => getFileType(file.name), [file.name]);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setModelUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleDimensions = useCallback((dims: Dimensions) => {
    setDimensions(dims);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#111315] border border-border h-[360px]">

        {modelUrl && (
          <Canvas camera={{ position: [80, 60, 120], fov: 45 }}>
            <color attach="background" args={["#111315"]} />

            <SceneLighting />

            <Suspense fallback={null}>
              <ModelScene
                url={modelUrl}
                fileType={fileType}
                onDimensions={handleDimensions}
              />

              <Grid
                args={[200, 200]}
                cellSize={10}
                cellColor="#2A2A2A"
                sectionSize={50}
                sectionColor="#333333"
                position={[0, -0.5, 0]}
              />
            </Suspense>

            <OrbitControls makeDefault />
            <GizmoHelper alignment="bottom-right">
              <GizmoViewport />
            </GizmoHelper>
          </Canvas>
        )}

        {!modelUrl && <LoadingFallback />}

        <AnimatePresence>
          {dimensions && <DimensionBadge dims={dimensions} />}
        </AnimatePresence>
      </div>

      {/* actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onReupload}
          className="flex-1 px-4 py-2 border rounded-lg"
        >
          Re-upload
        </button>

        <button
          onClick={() => onConfirm(file)}
          className="flex-[2] px-4 py-2 bg-white text-black rounded-lg"
        >
          Looks Good — Get Quote
        </button>
      </div>
    </div>
  );
}

export default ModelViewer;
