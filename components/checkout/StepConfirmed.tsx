"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Props { onTrack: () => void; }

export function StepConfirmed({ onTrack }: Props) {
  return (
    <div className="text-center space-y-6">
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="mx-auto w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center"
      >
        <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <motion.path
            strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-bold text-text-primary mb-1">Order Placed!</h2>
        <p className="text-text-secondary text-sm">
          Order <span className="font-mono text-accent">#TRID-20847</span> is confirmed.
        </p>
      </motion.div>

      {/* Summary chip row */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="bg-surface border border-border rounded-2xl p-4 text-left space-y-2"
      >
        {[
          ["Model", "bracket_v3_final.stl"],
          ["Material", "Standard Resin"],
          ["Total Paid", "₹6,200"],
          ["Est. Delivery", "3–5 business days"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-text-muted">{k}</span>
            <span className="font-medium text-text-primary">{v}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <button
          onClick={onTrack}
          className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-4 rounded-xl shadow-accent-glow transition-all duration-200"
        >
          Track My Order
        </button>
        <Link href="/"
          className="block w-full text-center text-sm text-text-muted hover:text-text-secondary transition-colors py-2"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
