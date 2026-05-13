"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Input field ── */
export function Field({
  label, id, type = "text", placeholder, value, onChange, autoFocus, maxLength,
}: {
  label: string; id: string; type?: string; placeholder?: string;
  value?: string; onChange?: (v: string) => void; autoFocus?: boolean; maxLength?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-text-muted uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        autoFocus={autoFocus} maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-surface border border-border hover:border-border-strong focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors placeholder:text-text-muted"
      />
    </div>
  );
}

/* ── Select ── */
export function SelectField({
  label, id, options, value, onChange,
}: {
  label: string; id: string; options: string[];
  value?: string; onChange?: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-text-muted uppercase tracking-wider">
        {label}
      </label>
      <select
        id={id} value={value} onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-surface border border-border hover:border-border-strong focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors appearance-none cursor-pointer"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ── Primary CTA ── */
export function PrimaryCTA({
  label, onClick, disabled, loading,
}: {
  label: string; onClick?: () => void; disabled?: boolean; loading?: boolean;
}) {
  return (
    <motion.button
      whileHover={!disabled ? { y: -1 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-accent hover:bg-accent-hover disabled:opacity-40 text-white font-semibold py-4 rounded-xl shadow-accent-glow transition-all duration-200 flex items-center justify-center gap-2 mt-6"
    >
      {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {label}
      {!loading && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </motion.button>
  );
}

/* ── Option card (radio-style) ── */
export function OptionCard({
  selected, onClick, children,
}: {
  selected: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-2xl border transition-colors duration-150 cursor-pointer",
        selected
          ? "bg-accent/10 border-accent"
          : "bg-surface border-border hover:border-border-strong"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
          selected ? "border-accent" : "border-border-strong"
        )}>
          {selected && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-accent" />
          )}
        </div>
        <div>{children}</div>
      </div>
    </motion.button>
  );
}
