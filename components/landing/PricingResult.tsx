"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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
}

/* ─── Helpers ─── */

function formatPrice(n: number) {
  return n.toLocaleString("en-IN");
}

/* ─── Animated price counter ─── */

function AnimatedPrice({ value, currency }: { value: number; currency: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="flex items-start justify-center gap-2"
    >
      <span className="text-4xl font-bold text-text-secondary mt-3">{currency}</span>
      <span className="text-7xl md:text-8xl font-extrabold text-text-primary tracking-tighter leading-none">
        {formatPrice(value)}
      </span>
    </motion.div>
  );
}

/* ─── Summary row ─── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

/* ─── Value point ─── */

function ValuePoint({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3"
    >
      <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-sm text-text-secondary">{text}</span>
    </motion.div>
  );
}

/* ─── Warning item ─── */

function WarningItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </span>
      <span className="text-sm text-amber-200/80">{text}</span>
    </div>
  );
}

/* ─── Suggestion pill ─── */

function SuggestionPill({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent border border-accent/30 bg-accent/8 hover:bg-accent/15 px-3.5 py-2 rounded-full transition-colors duration-150"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      {text}
    </motion.button>
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
  valuePoints = [],
  warnings = [],
  suggestions = [],
  onChangeMaterial,
  onChangeQuantity,
  onContinue,
}: PricingResultProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto space-y-4"
    >

      {/* ── Top: config summary ── */}
      <div className="bg-surface border border-border rounded-3xl px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          {/* Model info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-text-primary font-semibold text-sm truncate">{modelName}</p>
              <p className="text-text-muted text-xs mt-0.5">3D Model</p>
            </div>
          </div>

          {/* Config chips */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {[material, materialGrade, useCase, `×${quantity}`].map((tag) => (
              <span key={tag} className="text-xs font-medium text-text-secondary bg-surface-2 border border-border px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Center: price ── */}
      <div className="bg-surface border border-border rounded-3xl px-6 py-10 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-32 bg-accent/8 blur-[60px] rounded-full" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4"
        >
          Total Price
        </motion.p>

        <AnimatedPrice value={totalPrice} currency={currency} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-text-muted text-sm mt-3"
        >
          {currency}{formatPrice(pricePerUnit)} per unit · {quantity} {quantity === 1 ? "unit" : "units"}
        </motion.p>

        {/* Horizontal rule */}
        <div className="my-6 h-px bg-border" />

{/* Summary rows */}
        <div className="text-left">
          <SummaryRow label="Material" value={`${material} — ${materialGrade}`} />
          <SummaryRow label="Use Case" value={useCase} />
          <SummaryRow label="Quantity" value={`${quantity} units`} />
          <SummaryRow label="Base Price" value={`${currency}${formatPrice(Math.round(totalPrice * 0.72))}`} />
          <SummaryRow label="GST (18%)" value={`${currency}${formatPrice(Math.round(totalPrice * 0.18))}`} />
          <SummaryRow label="Delivery" value="Free" />
          <SummaryRow label="Est. Delivery" value="3–5 business days" />
        </div>
      </div>

      {/* ── Value points ── */}
      {valuePoints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl px-5 py-4 space-y-2.5"
        >
          {valuePoints.map((vp, i) => (
            <motion.div
              key={vp}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <ValuePoint text={vp} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── Warnings ── */}
      {warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-[#1C1A10] border border-amber-500/30 rounded-2xl px-5 py-4 space-y-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v6m0 2v2"/>
            </svg>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Heads up</span>
          </div>
          {warnings.map((w) => <WarningItem key={w} text={w} />)}
        </motion.div>
      )}

      {/* ── Suggestions ── */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {suggestions.map((s) => (
            <SuggestionPill key={s} text={s} onClick={onChangeMaterial} />
          ))}
        </motion.div>
      )}

      {/* ── Action bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
      >
        <Button variant="secondary" size="md" onClick={onChangeMaterial} className="flex-1 sm:flex-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Change Material
        </Button>

        <Button variant="secondary" size="md" onClick={onChangeQuantity} className="flex-1 sm:flex-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          Change Quantity
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={onContinue}
          className="flex-1 sm:flex-[2] shadow-accent-glow"
        >
          Continue to Order
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </motion.div>
    </motion.div>
  );
}
