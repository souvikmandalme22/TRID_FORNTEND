"use client";

import { Suspense, useState, useCallback, useEffect, useMemo } from "react";
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
  file: File | null | undefined;   // ✅ FIX: allow null/undefined
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

// ✅ FIX: shown when file is not available (pricing page after refresh)
function NoFileState() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-muted">
      <svg
        className="w-12 h-12 opacity-25"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
        />
      </svg>
      <p className="text-sm font-medium opacity-50">3D preview not available</p>
      <p className="text-xs opacity-30">Re-upload to view model</p>
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

  // ✅ FIX: safe fallback when file is null/undefined
  const fileType = useMemo<FileType>(
    () => (file?.name ? getFileType(file.name) : "stl"),
    [file?.name]
  );

  useEffect(() => {
    if (!file) {
      setModelUrl(null);
      return;
    }
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

        {/* ✅ Only render Canvas when we have a real file */}
        {file && modelUrl ? (
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
        ) : file && !modelUrl ? (
          <LoadingFallback />
        ) : (
          <NoFileState />   // ✅ pricing page after refresh
        )}

        <AnimatePresence>
          {dimensions && <DimensionBadge dims={dimensions} />}
        </AnimatePresence>
      </div>

      {/* Action buttons — only show on upload/preview page */}
      {file && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={onReupload}
            className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-xl hover:border-border-strong transition-colors"
          >
            Re-upload
          </button>
          <button
            onClick={() => onConfirm(file)}
            className="flex-[2] px-4 py-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors shadow-accent-glow"
          >
            Looks Good — Get Quote
          </button>
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
