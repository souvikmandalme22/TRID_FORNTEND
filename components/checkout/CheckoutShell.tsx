"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STEPS = [
  "Login", "Address", "Delivery", "Review", "Payment", "Confirmed",
];

interface CheckoutShellProps {
  step: number; // 0-indexed
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function CheckoutShell({ step, children, title, subtitle }: CheckoutShellProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-0.5 bg-surface-2">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step labels */}
      <div className="flex justify-center gap-0 border-b border-border">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={cn(
              "hidden sm:flex items-center text-xs font-medium px-4 py-3 border-b-2 -mb-px transition-colors",
              i === step
                ? "text-accent border-accent"
                : i < step
                ? "text-text-muted border-transparent"
                : "text-text-muted border-transparent opacity-40"
            )}
          >
            {i < step && (
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {s}
          </div>
        ))}
        {/* Mobile: "Step X of Y" */}
        <div className="sm:hidden flex items-center px-4 py-3 text-xs text-text-muted">
          Step {step + 1} of {STEPS.length} — <span className="text-accent ml-1 font-semibold">{STEPS[step]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-1">{title}</h1>
            {subtitle && <p className="text-text-secondary text-sm mb-8">{subtitle}</p>}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
