"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EnvironmentQuantity } from "@/components/landing/EnvironmentQuantity";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";
import { useState } from "react";

const FDM_MATERIALS = [
  "pla", "abs", "petg", "tpu", "nylon", "pc", "asa", "pp",
  "pla cf", "petg cf", "pc-abs", "pcabs", "peek", "pekk",
  "carbon fibre", "carbon fiber", "pa12", "pa6",
];

const INFILL_OPTIONS = [
  { label: "Normal",   range: "10–20%", pct: 15,  desc: "Display / Prototype" },
  { label: "Standard", range: "25–40%", pct: 32,  desc: "General Use" },
  { label: "Strong",   range: "40–60%", pct: 50,  desc: "Functional Parts" },
  { label: "Heavy",    range: "60–80%", pct: 70,  desc: "Load Bearing" },
  { label: "Solid",    range: "80–100%",pct: 90,  desc: "Max Strength" },
];

function isFDM(material: any) {
  if (!material) return false;
  const label = (material.gradeLabel + " " + material.familyLabel).toLowerCase();
  return FDM_MATERIALS.some((m) => label.includes(m));
}

export default function EnvironmentPage() {
  const router = useRouter();
  const setEnvironments  = useOrderStore((s) => s.setEnvironments);
  const setQuantity      = useOrderStore((s) => s.setQuantity);
  const setInfillPercent = useOrderStore((s) => s.setInfillPercent);
  const material         = useOrderStore((s) => s.material);
  const [selectedInfill, setSelectedInfill] = useState<number>(32);
  const fdm = isFDM(material);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Almost There</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">Environment & Quantity</h1>
              <p className="text-text-secondary text-lg">Helps us calculate your exact price.</p>
            </div>
          </motion.div>

          {/* Infill selector — only for FDM */}
          {fdm && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }} className="mb-10">
              <h2 className="text-lg font-semibold text-text-primary mb-4 text-center">Infill Density</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {INFILL_OPTIONS.map((opt) => (
                  <button
                    key={opt.pct}
                    onClick={() => setSelectedInfill(opt.pct)}
                    className={`rounded-2xl border p-4 text-center transition-all ${
                      selectedInfill === opt.pct
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-surface text-text-secondary hover:border-accent/50"
                    }`}
                  >
                    <div className="text-base font-bold">{opt.label}</div>
                    <div className="text-xs mt-1 opacity-70">{opt.range}</div>
                    <div className="text-xs mt-1 opacity-50">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <EnvironmentQuantity
            onSelect={(envs, qty) => {
              setEnvironments(envs);
              setQuantity(parseInt(qty) || 1);
              setInfillPercent(fdm ? selectedInfill : null);
              router.push("/pricing");
            }}
            onBack={() => router.back()}
          />
        </Container>
      </main>
    </>
  );
}
