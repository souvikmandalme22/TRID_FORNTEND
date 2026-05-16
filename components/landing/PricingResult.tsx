"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui";
import ModelPreview from "@/components/viewer/ModelPreview";

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

  modelVolumeCc?: number;
  supportVolumeCc?: number;
  effectiveVolumeCc?: number;

  onChangeMaterial?: () => void;
  onChangeQuantity?: () => void;
  onContinue?: () => void;
}

/* ─── Utils ─── */

function formatPrice(n: number) {
  return n.toLocaleString("en-IN");
}

/* ─── Animated Price ─── */

function AnimatedPrice({ value, currency }: { value: number; currency: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-start justify-center gap-2"
    >
      <span className="text-3xl font-bold text-text-secondary mt-3">{currency}</span>
      <span className="text-6xl font-extrabold text-text-primary">
        {formatPrice(value)}
      </span>
    </motion.div>
  );
}

/* ─── Row ─── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

/* ─── MAIN ─── */

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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="w-full max-w-5xl mx-auto space-y-4"
    >

      {/* ─── TOP GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT PRICE PANEL */}
        <div className="bg-surface border border-border rounded-3xl px-6 py-10 text-center">

          <p className="text-xs tracking-widest text-text-muted uppercase mb-4">
            Total Price
          </p>

          <AnimatedPrice value={totalPrice} currency={currency} />

          <p className="text-sm text-text-muted mt-3">
            {currency}{formatPrice(pricePerUnit)} / unit · {quantity} unit(s)
          </p>

          <div className="my-6 border-t border-border" />

          {/* DETAILS */}
          <div className="text-left">
            <Row label="Material" value={`${material} — ${materialGrade}`} />
            <Row label="Use Case" value={useCase} />
            <Row label="Quantity" value={`${quantity}`} />

            {/* TOTAL VOLUME */}
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-text-muted flex items-center gap-1">
                Total Volume
                <span className="text-xs text-accent cursor-help" title="Model + Support volume">
                  ⓘ
                </span>
              </span>
              <span className="text-sm font-semibold text-text-primary">
                {totalVolume.toFixed(2)} cc
              </span>
            </div>

            {/* EFFECTIVE VOLUME */}
            <Row label="Effective Volume" value={`${effectiveVolumeCc.toFixed(2)} cc`} />
          </div>
        </div>

        {/* RIGHT 3D PREVIEW */}
        <div className="bg-surface border border-border rounded-3xl overflow-hidden h-[360px]">
          <ModelPreview className="w-full h-full" />
        </div>

      </div>

      {/* ─── ACTIONS ─── */}
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onChangeMaterial}>
          Change Material
        </Button>

        <Button variant="secondary" className="flex-1" onClick={onChangeQuantity}>
          Change Quantity
        </Button>

        <Button variant="primary" className="flex-[2]" onClick={onContinue}>
          Continue to Order
        </Button>
      </div>

    </motion.div>
  );
}
