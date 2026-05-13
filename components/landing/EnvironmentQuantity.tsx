"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

/* ─── Data ─── */

const ENVIRONMENTS = [
  {
    id: "indoor",
    label: "Indoor",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "outdoor",
    label: "Outdoor",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    id: "heat",
    label: "Near Heat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>
      </svg>
    ),
  },
] as const;

type EnvId = typeof ENVIRONMENTS[number]["id"];

const QUANTITIES = [
  { id: "1-2",  label: "1–2",  sublabel: "Prototype" },
  { id: "3-20", label: "3–20", sublabel: "Small Batch" },
  { id: "50+",  label: "50+",  sublabel: "Production" },
] as const;

type QtyId = typeof QUANTITIES[number]["id"];

/* ─── Chip ─── */

function Chip({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium cursor-pointer select-none transition-colors duration-150",
        selected
          ? "bg-accent/15 border-accent text-accent"
          : "bg-surface border-border text-text-secondary hover:border-border-strong hover:text-text-primary hover:bg-surface-2"
      )}
    >
      {selected && (
        <motion.span
          layoutId={`chip-bg-${label}`}
          className="absolute inset-0 rounded-full ring-1 ring-accent/40"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      {icon && <span className={selected ? "text-accent" : "text-text-muted"}>{icon}</span>}
      {label}
      {selected && (
        <motion.svg
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="w-3.5 h-3.5 ml-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </motion.svg>
      )}
    </motion.button>
  );
}

/* ─── Quantity Card ─── */

function QtyCard({
  qty,
  selected,
  onClick,
}: {
  qty: typeof QUANTITIES[number];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center gap-1 py-5 px-4 rounded-2xl border cursor-pointer select-none transition-colors duration-150",
        selected
          ? "bg-accent/10 border-accent"
          : "bg-surface border-border hover:border-border-strong hover:bg-surface-2"
      )}
    >
      {selected && (
        <motion.span
          layoutId="qty-ring"
          className="absolute inset-0 rounded-2xl ring-2 ring-accent/50"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className={cn("text-2xl font-bold tracking-tight", selected ? "text-accent" : "text-text-primary")}>
        {qty.label}
      </span>
      <span className="text-xs text-text-muted font-medium">{qty.sublabel}</span>
    </motion.button>
  );
}

/* ─── Summary pill ─── */

function SummaryPill({ envs, qty }: { envs: EnvId[]; qty: QtyId | null }) {
  const envLabels = ENVIRONMENTS.filter((e) => envs.includes(e.id)).map((e) => e.label);
  const qtyLabel = QUANTITIES.find((q) => q.id === qty)?.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 text-sm text-text-muted"
    >
      {envLabels.length > 0 && (
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {envLabels.join(", ")}
        </span>
      )}
      {envLabels.length > 0 && qtyLabel && <span className="text-border-strong">·</span>}
      {qtyLabel && (
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {qtyLabel} units
        </span>
      )}
    </motion.div>
  );
}

/* ─── Main ─── */

interface EnvironmentQuantityProps {
  onSelect?: (envs: string[], qty: string) => void;
}

export function EnvironmentQuantity({ onSelect }: EnvironmentQuantityProps) {
  const [selectedEnvs, setSelectedEnvs] = useState<EnvId[]>([]);
  const [selectedQty, setSelectedQty] = useState<QtyId | null>(null);

  const toggleEnv = (id: EnvId) => {
    setSelectedEnvs((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const isReady = selectedEnvs.length > 0 && selectedQty !== null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10">

      {/* ── Environment ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-text-primary">Environment</h3>
          <span className="text-xs text-text-muted">Select all that apply</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {ENVIRONMENTS.map((env) => (
            <Chip
              key={env.id}
              label={env.label}
              icon={env.icon}
              selected={selectedEnvs.includes(env.id)}
              onClick={() => toggleEnv(env.id)}
            />
          ))}
        </div>

        {/* Near Heat inline tip */}
        <AnimatePresence>
          {selectedEnvs.includes("heat") && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="text-xs text-orange-400/80 flex items-center gap-1.5 overflow-hidden"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
              </svg>
              Heat environments require materials rated above 80°C. We'll filter options accordingly.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* ── Quantity ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-text-primary">Quantity</h3>
          <span className="text-xs text-text-muted">Choose one</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {QUANTITIES.map((qty) => (
            <QtyCard
              key={qty.id}
              qty={qty}
              selected={selectedQty === qty.id}
              onClick={() => setSelectedQty(qty.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Summary + CTA ── */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between pt-2"
          >
            <SummaryPill envs={selectedEnvs} qty={selectedQty} />

            <Button
              variant="primary"
              size="lg"
              onClick={() => onSelect?.(selectedEnvs, selectedQty!)}
              className="px-10 shadow-accent-glow"
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
