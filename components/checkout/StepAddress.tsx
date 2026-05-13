"use client";

import { useState } from "react";
import { Field, SelectField, PrimaryCTA } from "./shared";

interface Props { onNext: () => void; }

export function StepAddress({ onNext }: Props) {
  const [form, setForm] = useState({
    name: "", line1: "", line2: "", city: "", state: "Maharashtra", pin: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const ready = form.name && form.line1 && form.city && form.pin.length === 6;

  const STATES = [
    "Andhra Pradesh","Delhi","Gujarat","Karnataka","Maharashtra",
    "Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal",
  ];

  return (
    <div className="space-y-4">
      <Field id="name"  label="Full Name"       placeholder="Arjun Mehta" value={form.name}  onChange={set("name")} autoFocus />
      <Field id="line1" label="Address Line 1"  placeholder="Flat / Building / Street" value={form.line1} onChange={set("line1")} />
      <Field id="line2" label="Address Line 2 (optional)" placeholder="Area / Landmark" value={form.line2} onChange={set("line2")} />
      <div className="grid grid-cols-2 gap-3">
        <Field id="city" label="City"    placeholder="Mumbai" value={form.city} onChange={set("city")} />
        <Field id="pin"  label="PIN"     placeholder="400001" value={form.pin}  onChange={set("pin")} maxLength={6} />
      </div>
      <SelectField id="state" label="State" options={STATES} value={form.state} onChange={set("state")} />
      <PrimaryCTA label="Save & Continue" onClick={onNext} disabled={!ready} />
    </div>
  );
}
