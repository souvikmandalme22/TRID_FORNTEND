"use client";

import { Suspense, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, Grid } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ModelScene } from "./ModelScene";
import { SceneLighting } from "./SceneLighting";
import { Button } from "@/components/ui";
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
      transition={{ duration: 0.4 }}
      className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-md border border-border rounded-xl px-4 py-2.5"
    >
      <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>

      <span className="text-xs font-mono text-text-secondary">
        <span className="text-text-primary font-semibold">{dims.x}</span>
        <span className="text-text-muted mx-1">×</span>
        <span className="text-text-primary font-semibold">{dims.y}</span>
        <span className="text-text-muted mx-1">×</span>
        <span className="text-text-primary font-semibold">{dims.z}</span>
        <span className="text-text-muted ml-1">mm</span>
      </span>
    </motion.div>
  );
}

function ControlHint() {
  return (
    <div className="absolute bottom-20 left-4 flex flex-col gap-1.5 pointer-events-none">
      {[
        { icon: "⟳", label: "Drag to rotate" },
        { icon: "⊕", label: "Scroll to zoom" },
        { icon: "⇥", label: "Right-drag to pan" },
      ].map(({ icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-xs text-text-muted">
          <span className="w-5 text-center">{icon}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full"
      />
      <p className="text-text-secondary text-sm">Parsing model…</p>
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
  const [hintsVisible, setHintsVisible] = useState(true);

  const fileType = useMemo(() => getFileType(file.name), [file.name]);

  const hintTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setModelUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const onInteract = useCallback(() => {
    clearTimeout(hintTimer.current);

    hintTimer.current = setTimeout(() => {
      setHintsVisible(false);
    }, 2000);
  }, []);

  useEffect(() => {
    hintTimer.current = setTimeout(() => {
      setHintsVisible(false);
    }, 5000);

    return () => clearTimeout(hintTimer.current);
  }, []);

  const handleDimensions = useCallback((dims: Dimensions) => {
    setDimensions(dims);
  }, []);

  return (
    <div className={cn("flex flex-col gap-0 w-full", className)}>
      <div
        className="relative w-full rounded-3xl overflow-hidden bg-[#111315] border border-border"
        style={{ aspectRatio: "16/9", minHeight: 320 }}
      >
        {modelUrl && (
          <Canvas
            shadows
            dpr={1}
            camera={{
              position: [80, 60, 120],
              fov: 45,
              near: 0.1,
              far: 10000,
            }}
            gl={{
              antialias: true,
              alpha: false,
              preserveDrawingBuffer: false,
              powerPreference: "high-performance",
            }}
            style={{ background: "transparent" }}
            onPointerDown={onInteract}
            onWheel={onInteract}
          >
            <color attach="background" args={["#111315"]} />
            <fog attach="fog" args={["#111315", 400, 1200]} />

            <SceneLighting />

            <Suspense fallback={null}>
              <ModelScene
                url={modelUrl}
                fileType={fileType}
                onDimensions={handleDimensions}
              />

              <Grid
                args={[300, 300]}
                cellSize={10}
                cellThickness={0.5}
                cellColor="#2A2A2A"
                sectionSize={50}
                sectionThickness={1}
                sectionColor="#333333"
                fadeDistance={250}
                fadeStrength={1.5}
                position={[0, -0.5, 0]}
              />
            </Suspense>

            <OrbitControls
              enableDamping
              dampingFactor={0.06}
              rotateSpeed={0.6}
              zoomSpeed={0.8}
              panSpeed={0.6}
              minDistance={20}
              maxDistance={600}
              makeDefault
            />

            <GizmoHelper alignment="bottom-right" margin={[56, 56]}>
              <GizmoViewport
                axisColors={["#FF4D6D", "#4CAF50", "#3A86FF"]}
                labelColor="#F5F5F7"
              />
            </GizmoHelper>
          </Canvas>
        )}

        {!dimensions && modelUrl && <LoadingFallback />}

        <AnimatePresence>
          {dimensions && <DimensionBadge dims={dimensions} />}
        </AnimatePresence>

        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border border-border rounded-xl px-3 py-2">
          <span className="text-xs text-text-muted font-mono truncate max-w-[180px] block">
            {file.name}
          </span>
        </div>

        <AnimatePresence>
          {hintsVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ControlHint />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex items-center justify-between mt-5 gap-4"
      >
        <Button
          variant="secondary"
          size="md"
          onClick={onReupload}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>

          Re-upload
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={() => onConfirm(file)}
          className="flex items-center gap-2 shadow-accent-glow px-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>

          Looks Good — Get Quote
        </Button>
      </motion.div>
    </div>
  );
}
