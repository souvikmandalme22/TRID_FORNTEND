"use client";

import { PrimaryCTA } from "./shared";

interface Props { onNext: () => void; }

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-muted">{label}</span>
      <span className={`text-sm font-semibold ${accent ? "text-accent" : "text-text-primary"}`}>{value}</span>
    </div>
  );
}

export function StepReview({ onNext }: Props) {
  return (
    <div className="space-y-4">
      {/* Model */}
      <div className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">bracket_v3_final.stl</p>
          <p className="text-xs text-text-muted">Resin · Standard Resin</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-surface border border-border rounded-2xl px-4 py-1">
        <Row label="Material" value="Standard Resin" />
        <Row label="Use Case" value="Fit / Assembly" />
        <Row label="Quantity" value="5 units" />
        <Row label="Delivery" value="Standard (3–5 days)" />
        <Row label="Delivery to" value="Mumbai, 400001" />
        <Row label="Subtotal" value="₹6,200" />
        <Row label="Delivery" value="Free" />
        <Row label="Total" value="₹6,200" accent />
      </div>

      <p className="text-xs text-text-muted text-center">
        By placing the order, you agree to TRID's manufacturing & return policy.
      </p>

      <PrimaryCTA label="Proceed to Payment" onClick={onNext} />
    </div>
  );
}
