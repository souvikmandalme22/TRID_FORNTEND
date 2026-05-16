"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui";
import ModelViewer from "@/components/viewer/ModelViewer";

/* ─── Types ─── */

interface PricingResultProps {
  modelName: string;
  material: string;
  materialGrade: string;
  useCase: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  currency?: string;
  valuePoints?: string[];
  warnings?: string[];
  suggestions?: string[];
  onChangeMaterial?: () => void;
  onChangeQuantity?: () => void;
  onContinue?: () => void;

  // ✅ NEW FIELDS (volume system)
  modelVolumeCc?: number;
  supportVolumeCc?: number;
  effectiveVolumeCc?: number;
}

/* ─── Helpers ─── */

function formatPrice(n: number) {
  return n.toLocaleString("en-IN");
}

/* ─── Animated Price ─── */

function AnimatedPrice({ value, currency }: { value: number; currency: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55 }}
      className="flex items-start justify-center gap-2"
    >
      <span className="text-4xl font-bold text-text-secondary mt-3">{currency}</span>
      <span className="text-7xl font-extrabold text-text-primary">
        {formatPrice(value)}
      </span>
    </motion.div>
  );
}

/* ─── Summary Row ─── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

/* ─── Main ─── */

export function PricingResult({
  modelName,
  material,
  materialGrade,
  useCase,
  quantity,
  pricePerUnit,
  totalPrice,
  currency = "₹",
  modelVolumeCc = 0,
  supportVolumeCc = 0,
  effectiveVolumeCc = 0,
  onChangeMaterial,
  onChangeQuantity,
  onContinue,
}: PricingResultProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const totalVolume = modelVolumeCc + supportVolumeCc;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="w-full max-w-5xl mx-auto space-y-4"
    >

      {/* ── TOP SECTION (GRID: PRICE + VIEWER) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT: PRICE CARD */}
        <div className="bg-surface border border-border rounded-3xl px-6 py-10 text-center relative overflow-hidden">

          <p className="text-text-muted text-sm uppercase tracking-widest mb-3">
            Total Price
          </p>

          <AnimatedPrice value={totalPrice} currency={currency} />

          <p className="text-text-muted text-sm mt-3">
            {currency}{formatPrice(pricePerUnit)} per unit · {quantity} unit(s)
          </p>

          <div className="my-6 h-px bg-border" />

          {/* SUMMARY */}
          <div className="text-left">

            <SummaryRow label="Material" value={`${material} — ${materialGrade}`} />
            <SummaryRow label="Use Case" value={useCase} />
            <SummaryRow label="Quantity" value={`${quantity}`} />

            {/* ✅ NEW: VOLUME (IMPORTANT) */}
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-text-muted flex items-center gap-1">
                Total Volume
                <span
                  title="Model + Support volume combined. Different printers calculate support differently."
                  className="cursor-help text-xs text-accent"
                >
                  ⓘ
                </span>
              </span>
              <span className="text-sm font-semibold text-text-primary">
                {totalVolume.toFixed(2)} cc
              </span>
            </div>

            <SummaryRow
              label="Effective Volume"
              value={`${effectiveVolumeCc.toFixed(2)} cc`}
            />

          </div>
        </div>

        {/* RIGHT: SMALL 3D VIEWER */}
        <div className="bg-surface border border-border rounded-3xl overflow-hidden h-[360px]">
          <ModelViewer fileName={modelName} compact />
        </div>

      </div>

      {/* ── ACTION BUTTONS ── */}
      <div className="flex gap-3">
        <Button onClick={onChangeMaterial} variant="secondary" className="flex-1">
          Change Material
        </Button>

        <Button onClick={onChangeQuantity} variant="secondary" className="flex-1">
          Change Quantity
        </Button>

        <Button onClick={onContinue} variant="primary" className="flex-[2]">
          Continue to Order
        </Button>
      </div>

    </motion.div>
  );
}
