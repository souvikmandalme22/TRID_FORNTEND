"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TRACK_STEPS = [
  {
    id: "received",
    label: "Order Received",
    sub: "Your order is confirmed and queued",
    time: "Today, 2:14 PM",
    done: true,
    active: false,
  },
  {
    id: "printing",
    label: "Printing",
    sub: "Your model is being 3D printed",
    time: "Today, 4:00 PM",
    done: false,
    active: true,
  },
  {
    id: "processing",
    label: "Post-Processing",
    sub: "Curing, cleaning, quality check",
    time: "Tomorrow",
    done: false,
    active: false,
  },
  {
    id: "shipped",
    label: "Shipped",
    sub: "Handed off to courier partner",
    time: "In 2–3 days",
    done: false,
    active: false,
  },
];

export function StepTracking() {
  return (
    <div className="space-y-6">
      {/* Order ID */}
      <div className="flex items-center justify-between bg-surface border border-border rounded-2xl px-4 py-3">
        <div>
          <p className="text-xs text-text-muted">Order ID</p>
          <p className="font-mono font-semibold text-accent text-sm">#TRID-20847</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-muted">Est. Delivery</p>
          <p className="text-sm font-semibold text-text-primary">3–5 Business Days</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical track */}
        <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-border" />

        {/* Active fill */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "28%" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="absolute left-[19px] top-5 w-0.5 bg-accent origin-top"
        />

        <div className="space-y-0">
          {TRACK_STEPS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.35 }}
              className="relative flex items-start gap-4 pb-8 last:pb-0"
            >
              {/* Node */}
              <div className={cn(
                "relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                s.done
                  ? "bg-accent border-accent"
                  : s.active
                  ? "bg-accent/15 border-accent"
                  : "bg-surface border-border"
              )}>
                {s.done ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.active ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    className="w-3 h-3 rounded-full bg-accent"
                  />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                )}
              </div>

              {/* Content */}
              <div className="pt-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <p className={cn(
                    "text-sm font-semibold",
                    s.done || s.active ? "text-text-primary" : "text-text-muted"
                  )}>
                    {s.label}
                    {s.active && (
                      <span className="ml-2 text-[10px] font-bold text-accent bg-accent/15 border border-accent/30 px-2 py-0.5 rounded-full align-middle">
                        In Progress
                      </span>
                    )}
                  </p>
                  <span className="text-xs text-text-muted">{s.time}</span>
                </div>
                <p className={cn(
                  "text-xs mt-0.5",
                  s.done || s.active ? "text-text-secondary" : "text-text-muted opacity-50"
                )}>
                  {s.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Support row */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <p className="text-xs text-text-muted">Need help with this order?</p>
        <button className="text-xs text-accent hover:underline underline-offset-2 font-medium transition-colors">
          Contact Support →
        </button>
      </div>
    </div>
  );
}
