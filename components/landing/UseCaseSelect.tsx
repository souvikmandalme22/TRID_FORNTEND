"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

/* ─── Data ─── */

interface UseCase {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  warning: {
    message: string;
    suggestion: string;
  } | null;
}

const USE_CASES: UseCase[] = [
  {
    id: "showpiece",
    label: "Showpiece",
    description: "Display models, prototypes, demos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    warning: null,
  },
  {
    id: "fit",
    label: "Fit / Assembly",
    description: "Snap fits, joints, mechanical test",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    warning: {
      message: "Standard resins may crack under repeated assembly stress.",
      suggestion: "Tough Resin or PA 12 Nylon",
    },
  },
  {
    id: "daily",
    label: "Daily Use",
    description: "Handles, enclosures, everyday parts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    warning: {
      message: "PLA degrades with prolonged UV or heat exposure.",
      suggestion: "PETG or ASA for better longevity",
    },
  },
  {
    id: "heavy",
    label: "Heavy-Duty",
    description: "Load-bearing, structural, industrial",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22V12M2 7l10-5 10 5M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    warning: {
      message: "Most plastics won't handle sustained mechanical loads.",
      suggestion: "PA 12 MJF, PEEK, or Metal (Ti64 / SS316L)",
    },
  },
];

/* ─── Warning Banner ─── */

interface WarningBannerProps {
  message: string;
  suggestion: string;
  onChangeMaterial: () => void;
  onContinue: () => void;
}

function WarningBanner({ message, suggestion, onChangeMaterial, onContinue }: WarningBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "top" }}
      className="overflow-hidden"
    >
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#1C1A10] border border-amber-500/30 rounded-2xl px-5 py-4 mt-6">
        {/* Left accent bar */}
        <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-amber-400 rounded-r" />

        {/* Icon */}
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center ml-2">
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 ml-1">
          <p className="text-amber-100 text-sm font-medium leading-snug">{message}</p>
          <p className="text-amber-400/80 text-xs mt-0.5">
            For better durability, consider{" "}
            <span className="text-amber-400 font-semibold">{suggestion}</span>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={onChangeMaterial}
            className="flex-1 sm:flex-none text-xs font-semibold text-amber-400 border border-amber-500/40 hover:border-amber-400/70 hover:bg-amber-500/10 px-3.5 py-2 rounded-xl transition-all duration-150"
          >
            Change Material
          </button>
          <button
            onClick={onContinue}
            className="flex-1 sm:flex-none text-xs font-semibold text-text-muted hover:text-text-secondary px-3.5 py-2 rounded-xl hover:bg-white/5 transition-all duration-150"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─── */

interface UseCaseSelectProps {
  onSelect?: (id: string) => void;
  onChangeMaterial?: () => void;
}

export function UseCaseSelect({ onSelect, onChangeMaterial }: UseCaseSelectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const useCase = USE_CASES.find((u) => u.id === selected);
  const showWarning = !!(selected && useCase?.warning && !dismissed);

  const handleSelect = (id: string) => {
    setSelected(id);
    setDismissed(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {USE_CASES.map((uc, i) => {
          const isSelected = selected === uc.id;
          return (
            <motion.button
              key={uc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(uc.id)}
              className={cn(
                "relative flex flex-col items-center gap-4 px-4 py-7 rounded-2xl border cursor-pointer select-none text-center transition-colors duration-150",
                isSelected
                  ? "bg-accent/10 border-accent"
                  : "bg-surface border-border hover:border-border-strong hover:bg-surface-2"
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="usecase-ring"
                  className="absolute inset-0 rounded-2xl ring-2 ring-accent/50"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Warn dot */}
              {uc.warning && isSelected && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400" />
              )}

              <span className={cn("transition-colors", isSelected ? "text-accent" : "text-text-secondary")}>
                {uc.icon}
              </span>

              <div>
                <p className={cn("text-sm font-semibold", isSelected ? "text-accent" : "text-text-primary")}>
                  {uc.label}
                </p>
                <p className="text-[11px] text-text-muted mt-1 leading-tight">{uc.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Warning banner */}
      <AnimatePresence>
        {showWarning && useCase?.warning && (
          <WarningBanner
            message={useCase.warning.message}
            suggestion={useCase.warning.suggestion}
            onChangeMaterial={() => { setDismissed(true); onChangeMaterial?.(); }}
            onContinue={() => { setDismissed(true); onSelect?.(selected!); }}
          />
        )}
      </AnimatePresence>

      {/* CTA — only when no warning or dismissed */}
      <AnimatePresence>
        {selected && (!useCase?.warning || dismissed) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex justify-end"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => onSelect?.(selected)}
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
