"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ModelScene } from "./ModelScene";

interface Props {
  file: File;
  data: any;
}

function InfoTooltip() {
  return (
    <div className="relative group ml-2 cursor-pointer">
      <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">
        i
      </div>

      <div className="absolute left-6 top-0 w-56 p-2 text-xs bg-black/90 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition">
        Total volume = model + support estimation. Different printers may vary.
      </div>
    </div>
  );
}

function VolumeBox({ value }: { value: number }) {
  return (
    <div className="bg-black/30 border border-white/10 rounded-xl p-3 flex justify-between items-center">
      <span className="text-white/60 text-sm flex items-center">
        Total Volume
        <InfoTooltip />
      </span>

      <span className="text-white font-semibold">
        {value} cc <span className="text-white/40">(approx)</span>
      </span>
    </div>
  );
}

export default function PricingResult({ file, data }: Props) {
  const [showViewer] = useState(true);

  const totalVolume = data?.effective_volume_cc || 0;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT PANEL */}
      <div className="md:col-span-2 bg-[#111315] border border-white/10 rounded-2xl p-5">

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Instant Quote</h2>
          <p className="text-xs text-white/50">
            AI-powered manufacturing pricing engine
          </p>
        </div>

        {/* FILE NAME */}
        <div className="text-sm text-white/70 mb-3">
          📦 {file.name}
        </div>

        {/* TOTAL VOLUME ONLY */}
        <VolumeBox value={totalVolume} />

        {/* PRICE */}
        <div className="text-3xl font-bold text-white mt-5">
          ₹{data?.final_price}
        </div>

        <div className="text-sm text-white/60 mb-6">
          ₹{Math.round(data?.base_display_price)} per unit · {data?.quantity || 1} unit
        </div>

        {/* DETAILS */}
        <div className="space-y-2 text-sm text-white/70">
          <div className="flex justify-between">
            <span>Material</span>
            <span>{data?.material_slug}</span>
          </div>

          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{data?.gst_amount}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{data?.delivery_charges === 0 ? "Free" : data?.delivery_charges}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: MINI 3D VIEWER */}
      <div className="bg-[#111315] border border-white/10 rounded-2xl p-3 h-[420px]">

        <div className="text-xs text-white/50 mb-2">
          3D Preview
        </div>

        {showViewer && file && (
          <Canvas camera={{ position: [80, 60, 120], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[50, 50, 50]} />

            <ModelScene url={URL.createObjectURL(file)} />

            <OrbitControls enableZoom={false} />
          </Canvas>
        )}
      </div>
    </div>
  );
}
