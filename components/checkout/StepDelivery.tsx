"use client";

import { useState } from "react";
import { OptionCard, PrimaryCTA } from "./shared";

interface Props { onNext: () => void; }

const OPTIONS = [
  {
    id: "standard",
    title: "Standard",
    subtitle: "3–5 business days",
    price: "Free",
    badge: null,
  },
  {
    id: "express",
    title: "Express",
    subtitle: "1–2 business days",
    price: "₹299",
    badge: "Fast",
  },
  {
    id: "same-day",
    title: "Same Day",
    subtitle: "Order by 12 PM",
    price: "₹599",
    badge: "Fastest",
  },
];

export function StepDelivery({ onNext }: Props) {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="space-y-3">
      {OPTIONS.map((opt) => (
        <OptionCard key={opt.id} selected={selected === opt.id} onClick={() => setSelected(opt.id)}>
          <div className="flex items-start justify-between w-full gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">{opt.title}</span>
                {opt.badge && (
                  <span className="text-[10px] font-bold text-accent bg-accent/15 border border-accent/30 px-2 py-0.5 rounded-full">
                    {opt.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted mt-0.5">{opt.subtitle}</p>
            </div>
            <span className={`text-sm font-bold ${opt.price === "Free" ? "text-emerald-400" : "text-text-primary"}`}>
              {opt.price}
            </span>
          </div>
        </OptionCard>
      ))}
      <PrimaryCTA label="Continue" onClick={onNext} />
    </div>
  );
}
