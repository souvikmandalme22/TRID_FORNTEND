"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { ModelViewer } from "@/components/viewer/ModelViewer";
import { cn } from "@/lib/utils";

interface PricingResultProps {
  modelName       : string;
  material        : string;
  materialGrade   : string;
  useCase         : string;
  quantity        : number;
  pricePerUnit    : number;
  totalPrice      : number;
  currency?       : string;
  basePrice       : number;
  platformFee?    : number;
  packagingFee?   : number;
  gstAmount       : number;
  gstRate         : number;
  deliveryCharges : number;
  modelVolumeCc      : number;
  supportVolumeCc    : number;
  effectiveVolumeCc  : number;
  valuePoints?    : string[];
  warnings?       : string[];
  onChangeMaterial?  : () => void;
  onChangeQuantity?  : () => void;
  onContinue?        : () => void;
  file?              : File | null;
}

function fmt(n: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Row({
  label, value, sub, accent, big, green,
}: {
  label: string; value: string; sub?: string;
  accent?: boolean; big?: boolean; green?: boolean;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div>
        <span className={cn("text-sm", big ? "font-semibold text-text-primary" : "text-text-muted")}>
          {label}
        </span>
        {sub && <p className="text-xs text-text-muted/60 mt-0.5">{sub}</p>}
      </div>
      <span className={cn(
        "font-semibold text-right ml-4",
        big    ? "text-base text-text-primary" : "text-sm",
        accent ? "text-accent" : "",
        green  ? "text-emerald-400" : !accent ? "text-text-primary" : ""
      )}>
        {value}
      </span>
    </div>
  );
}

// ── Valid coupon codes ──
const COUPONS: Record<string, number> = {
  TRID10  : 0.10,
  TRID20  : 0.20,
  FIRST15 : 0.15,
  LAUNCH5 : 0.05,
};

function CouponBox({ baseAmount, onDiscount }: {
  baseAmount: number;
  onDiscount: (amount: number, code: string) => void;
}) {
  const [code, setCode]       = useState("");
  const [applied, setApplied] = useState(false);
  const [saving, setSaving]   = useState(0);
  const [error, setError]     = useState("");

  const apply = () => {
    const upper = code.trim().toUpperCase();
    if (!upper) { setError("Coupon code daalo."); return; }
    const rate = COUPONS[upper];
    if (!rate) { setError("Invalid coupon code."); onDiscount(0, ""); return; }
    const disc = parseFloat((baseAmount * rate).toFixed(2));
    setSaving(disc);
    setApplied(true);
    setError("");
    onDiscount(disc, upper);
  };

  const remove = () => {
    setCode(""); setApplied(false); setSaving(0); setError("");
    onDiscount(0, "");
  };

  return (
    <div className="mt-5 pt-4 border-t border-border">
      <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-2">
        Coupon Code
      </p>
      {!applied ? (
        <div className="flex gap-2">
          <input
            type="text" value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
            placeholder="e.g. TRID10"
            className="flex-1 bg-surface-2 border border-border focus:border-accent rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted font-mono tracking-widest"
          />
          <button onClick={apply}
            className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
            Apply
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-emerald-400 font-mono">{code}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-emerald-400">−₹{fmt(saving)}</span>
            <button onClick={remove} className="text-xs text-text-muted hover:text-red-400 transition-colors">
              Remove
            </button>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-xs text-red-400 mt-1.5">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingResult({
  modelName, material, materialGrade, useCase, quantity,
  pricePerUnit, totalPrice, currency = "₹",
  basePrice, platformFee = 0, packagingFee = 0, gstAmount, gstRate, deliveryCharges,
  modelVolumeCc, supportVolumeCc, effectiveVolumeCc,
  valuePoints = [], warnings = [],
  onChangeMaterial, onChangeQuantity, onContinue,
  file,
}: PricingResultProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  const [discount, setDiscount]     = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const finalAfterDiscount = parseFloat(Math.max(0, totalPrice - discount).toFixed(2));
  const modelMaterialCc    = parseFloat(Math.max(0, effectiveVolumeCc - supportVolumeCc).toFixed(2));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ── LEFT: Breakdown ── */}
        <div className="bg-surface border border-border rounded-3xl px-6 py-6">

          {/* Hero price */}
          <div className="text-center mb-5 pb-5 border-b border-border">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Total Price</p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start justify-center gap-1"
            >
              <span className="text-2xl font-bold text-text-secondary mt-2">{currency}</span>
              <span className="text-6xl font-extrabold text-text-primary tracking-tight leading-none">
                {fmt(finalAfterDiscount)}
              </span>
            </motion.div>

            {discount > 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-emerald-400 mt-1.5">
                {currency}{fmt(totalPrice)} se {currency}{fmt(discount)} bachaye!
              </motion.p>
            )}
            <p className="text-xs text-text-muted mt-1">
              {currency}{fmt(pricePerUnit)} / unit · {quantity} unit{quantity > 1 ? "s" : ""}
            </p>
          </div>

          {/* Detail rows */}
          <Row label="Material"  value={`${material} — ${materialGrade}`} />
          <Row label="Use Case"  value={useCase} />
          <Row label="Quantity"  value={`${quantity} unit${quantity > 1 ? "s" : ""}`} />
          <Row
            label="Solid Model Volume"
            value={`${modelVolumeCc.toFixed(2)} cc`}
            sub="Raw mesh volume before infill"
          />
          <Row
            label="Estimated Material"
            value={`${effectiveVolumeCc.toFixed(2)} cc`}
            sub={`Model ${modelMaterialCc.toFixed(2)} cc + Support ${supportVolumeCc.toFixed(2)} cc`}
          />

          <div className="my-1" />

          <Row label="Print Cost"                       value={`${currency}${fmt(basePrice)}`} />
          {platformFee > 0 && (
            <Row label="Service Fee" value={`${currency}${fmt(platformFee)}`} />
          )}
          {packagingFee > 0 && (
            <Row label="Packaging" value={`${currency}${fmt(packagingFee)}`} />
          )}
          <Row label={`GST (${Math.round(gstRate * 100)}%)`} value={`${currency}${fmt(gstAmount)}`} />


          {discount > 0 && (
            <Row label={`Coupon (${couponCode})`} value={`−${currency}${fmt(discount)}`} green />
          )}

          <Row label="Total" value={`${currency}${fmt(finalAfterDiscount)}`} accent big />

          {/* Coupon */}
          <CouponBox
            baseAmount={totalPrice}
            onDiscount={(amt, code) => { setDiscount(amt); setCouponCode(code); }}
          />
        </div>

        {/* ── RIGHT: 3D Viewer ── */}
        <div className="bg-surface border border-border rounded-3xl overflow-hidden min-h-[420px] flex flex-col">
          {file ? (
            <ModelViewer file={file} onConfirm={() => {}} onReupload={() => {}} className="flex-1" />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-muted p-8">
              <svg className="w-14 h-14 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
              <p className="text-sm font-medium opacity-40 text-center">{modelName}</p>
              <p className="text-xs opacity-25 text-center">3D preview available in active session</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Warnings ── */}
      {warnings.length > 0 && (
        <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl px-5 py-4 space-y-2">
          {warnings.map((w) => (
            <div key={w} className="flex items-start gap-3">
              <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <span className="text-sm text-amber-200/80">{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Value points ── */}
      {valuePoints.length > 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl px-5 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {valuePoints.map((vp) => (
              <div key={vp} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-emerald-200/80">{vp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="secondary" size="md" onClick={onChangeMaterial} className="flex-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Change Material
        </Button>
        <Button variant="secondary" size="md" onClick={onChangeQuantity} className="flex-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          Change Quantity
        </Button>
        <Button variant="primary" size="md" onClick={onContinue} className="flex-[2] shadow-accent-glow">
          Continue to Order
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </motion.div>
  );
}
