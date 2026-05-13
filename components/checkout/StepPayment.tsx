"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OptionCard, PrimaryCTA } from "./shared";

interface Props { onNext: () => void; }

const METHODS = [
  { id: "upi",  label: "UPI",          sub: "PhonePe, GPay, Paytm, BHIM", icon: "⚡" },
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: "💳" },
  { id: "nb",   label: "Net Banking",  sub: "All major banks supported",   icon: "🏦" },
  { id: "cod",  label: "Cash on Delivery", sub: "Available for orders under ₹10,000", icon: "📦" },
];

export function StepPayment({ onNext }: Props) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");

  return (
    <div className="space-y-3">
      {METHODS.map((m) => (
        <OptionCard key={m.id} selected={method === m.id} onClick={() => setMethod(m.id)}>
          <div className="flex items-center justify-between w-full">
            <div>
              <div className="flex items-center gap-2">
                <span>{m.icon}</span>
                <span className="text-sm font-semibold text-text-primary">{m.label}</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">{m.sub}</p>
            </div>
          </div>
        </OptionCard>
      ))}

      {/* UPI input */}
      <AnimatePresence>
        {method === "upi" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <input
              type="text" placeholder="yourname@upi"
              value={upiId} onChange={(e) => setUpiId(e.target.value)}
              className="w-full bg-surface border border-border focus:border-accent rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted mt-1"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust row */}
      <div className="flex items-center justify-center gap-4 py-2">
        {["256-bit SSL", "PCI DSS", "Razorpay"].map((t) => (
          <span key={t} className="text-[11px] text-text-muted flex items-center gap-1">
            <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            {t}
          </span>
        ))}
      </div>

      <PrimaryCTA label="Pay ₹6,200" onClick={onNext} />
    </div>
  );
}
