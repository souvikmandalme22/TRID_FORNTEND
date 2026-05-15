"use client";
import { PrimaryCTA } from "./shared";
import { useOrderStore } from "@/store";

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
  const { model, material, useCase, quantity, price } = useOrderStore();

  const totalPrice  = price?.total || 0;
  const deliveryFee = price?.deliveryFee || 0;
  const subtotal    = price?.subtotal || 0;

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
          <p className="text-sm font-semibold text-text-primary">{model?.fileName || "model.stl"}</p>
          <p className="text-xs text-text-muted">{material?.familyLabel} · {material?.gradeLabel}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-surface border border-border rounded-2xl px-4 py-1">
        <Row label="Material"  value={material?.gradeLabel || "—"} />
        <Row label="Use Case"  value={useCase || "—"} />
        <Row label="Quantity"  value={`${quantity || 1} units`} />
        <Row label="Delivery"  value="Standard (3–5 days)" />
        <Row label="Subtotal"  value={`₹${subtotal.toLocaleString("en-IN")}`} />
        <Row label="Delivery"  value={deliveryFee === 0 ? "Free" : `₹${deliveryFee}`} />
        <Row label="Total"     value={`₹${totalPrice.toLocaleString("en-IN")}`} accent />
      </div>

      <p className="text-xs text-text-muted text-center">
        By placing the order, you agree to TRID&apos;s manufacturing & return policy.
      </p>
      <PrimaryCTA label="Proceed to Payment" onClick={onNext} />
    </div>
  );
}
