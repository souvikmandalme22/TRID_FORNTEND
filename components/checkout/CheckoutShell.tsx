"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store";

const STEPS = ["Login", "Address", "Delivery", "Review", "Payment", "Confirmed"];

interface CheckoutShellProps {
  step: number;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

function PrinterCartIcon() {
  const { quantity } = useOrderStore();
  return (
    <div className="relative">
      <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"/>
          <circle cx="18" cy="11.5" r="0.75" fill="currentColor"/>
        </svg>
      </div>
      {quantity > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center">
          {quantity}
        </span>
      )}
    </div>
  );
}

export function CheckoutShell({ step, children, title, subtitle, onBack }: CheckoutShellProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={onBack ? onBack : () => router.back()}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <span className="text-sm font-bold text-text-primary tracking-tight">TRID</span>
        <PrinterCartIcon />
      </div>
      <div className="w-full h-0.5 bg-surface-2">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-center gap-0 border-b border-border">
        {STEPS.map((s, i) => (
          <div key={s} className={cn(
            "hidden sm:flex items-center text-xs font-medium px-4 py-3 border-b-2 -mb-px transition-colors",
            i === step ? "text-accent border-accent"
              : i < step ? "text-text-muted border-transparent"
              : "text-text-muted border-transparent opacity-40"
          )}>
            {i < step && (
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
              </svg>
            )}
            {s}
          </div>
        ))}
        <div className="sm:hidden flex items-center px-4 py-3 text-xs text-text-muted">
          Step {step + 1} of {STEPS.length} — <span className="text-accent ml-1 font-semibold">{STEPS[step]}</span>
        </div>
      </div>
      <div className="flex-1 flex items-start justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-1">{title}</h1>
            {subtitle && <p className="text-text-secondary text-sm mb-8">{subtitle}</p>}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
