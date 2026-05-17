"use client";

import { PrimaryCTA } from "./shared";
import { useOrderStore } from "@/store";

interface Props {
  onNext: () => void;
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-muted">{label}</span>
      <span
        className={`text-sm font-semibold ${
          accent ? "text-accent" : "text-text-primary"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function StepReview({ onNext }: Props) {
  const { model, material, useCase, quantity, price } = useOrderStore();

  const totalPrice = price?.total || 0;
  const deliveryFee = price?.deliveryFee || 0;
  const subtotal = price?.subtotal || 0;

  return (
    <div className="space-y-4">

      {/* MODEL CARD */}
      <div className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center">
          <svg
            className="w-5 h-5 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
            />
          </svg>
        </div>

        <div>
          <p className="text-sm font-semibold text-text-primary">
            {model?.fileName || "model.stl"}
          </p>
          <p className="text-xs text-text-muted">
            {material?.familyLabel} · {material?.gradeLabel}
          </p>
        </div>
      </div>

      {/* 💰 HERO PRICE CARD */}
      <div className="bg-surface border border-border rounded-2xl p-5 text-center">
        <p className="text-xs text-text-muted">Total Price</p>

        <h2 className="text-3xl font-bold text-accent mt-1">
          ₹{totalPrice.toLocaleString("en-IN")}
        </h2>

        <p className="text-xs text-text-muted mt-1">
          All Inclusive Price (Approx)
        </p>
      </div>

      {/* MATERIAL (NEW UX FIX) */}
      <div className="bg-surface border border-border rounded-2xl px-4 py-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-text-muted">Material (Approx)</p>

            <p className="text-sm font-semibold text-text-primary">
              {material?.gradeLabel || "—"}
            </p>

            <p className="text-xs text-text-muted mt-1">
              {price?.material_cc && price?.material_grams
                ? `${price.material_cc} cc (≈ ${price.material_grams} g PLA)`
                : "—"}
            </p>
          </div>

          <span className="text-xs text-text-muted">ℹ</span>
        </div>
      </div>

      {/* TRUST MESSAGE */}
      <p className="text-xs text-text-muted text-center">
        ℹ Pricing and material estimates are approximate and may vary based on machine settings.
      </p>

      {/* BREAKDOWN (COLLAPSED) */}
      <details className="bg-surface border border-border rounded-2xl px-4 py-2">
        <summary className="cursor-pointer text-sm text-text-primary py-2">
          View breakdown
        </summary>

        <div className="mt-2">
          <Row label="Use Case" value={useCase || "—"} />
          <Row label="Quantity" value={`${quantity || 1} units`} />
          <Row label="Delivery" value="Standard (3–5 days)" />
          <Row
            label="Delivery Fee"
            value={deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
          />
          <Row
            label="Processing Cost"
            value={`₹${subtotal.toLocaleString("en-IN")}`}
          />
          <Row
            label="Total"
            value={`₹${totalPrice.toLocaleString("en-IN")}`}
            accent
          />
        </div>
      </details>

      {/* CTA */}
      <PrimaryCTA label="Proceed to Payment" onClick={onNext} />
    </div>
  );
}
