"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type TagType = "best" | "strong" | "flexible" | "precise" | "heat" | "rigid" | "smooth" | "durable" | "lightweight";

interface Material {
  id: string; name: string; description: string; tag: TagType; recommended?: boolean;
}
interface Family {
  id: string; label: string; description: string; icon: React.ReactNode; materials: Material[];
}

const TAG_STYLES: Record<TagType, { label: string; className: string }> = {
  best:        { label: "Best",        className: "bg-accent/15 text-accent border-accent/30" },
  strong:      { label: "Strong",      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  flexible:    { label: "Flexible",    className: "bg-violet-500/15 text-violet-400 border-violet-500/30" },
  precise:     { label: "Precise",     className: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
  heat:        { label: "Heat-Res.",   className: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  rigid:       { label: "Rigid",       className: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  smooth:      { label: "Smooth",      className: "bg-pink-500/15 text-pink-400 border-pink-500/30" },
  durable:     { label: "Durable",     className: "bg-teal-500/15 text-teal-400 border-teal-500/30" },
  lightweight: { label: "Lightweight", className: "bg-lime-500/15 text-lime-400 border-lime-500/30" },
};

const FAMILIES: Family[] = [
  {
    id: "plastic", label: "Plastic", description: "Fast, affordable FDM parts",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
    materials: [
      { id: "pla",  name: "PLA",  description: "Easy to print, great surface finish. Ideal for visual prototypes.", tag: "best", recommended: true },
      { id: "abs",  name: "ABS",  description: "Impact-resistant, machinable. Good for functional parts and enclosures.", tag: "strong" },
      { id: "petg", name: "PETG", description: "Durable, slightly flexible. Food-safe options available.", tag: "durable" },
      { id: "tpu",  name: "TPU",  description: "Rubber-like, impact-absorbing. Perfect for grips and gaskets.", tag: "flexible" },
      { id: "asa",  name: "ASA",  description: "UV-resistant, outdoor-rated. Replaces ABS in harsh environments.", tag: "heat" },
    ],
  },
  {
    id: "engineering", label: "Eng. Plastic", description: "High-performance thermoplastics",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    materials: [
      { id: "pa12",  name: "PA 12 Nylon",   description: "Excellent fatigue resistance. Ideal for functional end-use parts.", tag: "strong", recommended: true },
      { id: "pa-cf", name: "PA + Carbon",   description: "Carbon-reinforced nylon. Extreme stiffness-to-weight ratio.", tag: "lightweight" },
      { id: "peek",  name: "PEEK",          description: "Aerospace-grade thermoplastic. Withstands 250°C+.", tag: "heat" },
      { id: "pc",    name: "Polycarbonate", description: "Transparent, impact-resistant. For housings and lenses.", tag: "rigid" },
    ],
  },
  {
    id: "resin", label: "Resin", description: "Ultra-fine detail SLA/MSLA",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 8v8M8 12h8"/></svg>,
    materials: [
      { id: "std-resin",   name: "Standard Resin", description: "Smooth surface, fine detail. Best for display models.", tag: "best", recommended: true },
      { id: "tough-resin", name: "Tough Resin",    description: "ABS-like toughness. Handles mechanical stress and snap fits.", tag: "strong" },
      { id: "flex-resin",  name: "Flexible Resin", description: "Shore 50A rubber-like. For wearables and soft-touch parts.", tag: "flexible" },
      { id: "dental",      name: "Dental Resin",   description: "Biocompatible, sterilizable. ISO 10993 certified.", tag: "precise" },
    ],
  },
  {
    id: "industrial", label: "Industrial", description: "SLS, MJF & composite printing",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    materials: [
      { id: "pa11-mjf", name: "PA 11 MJF",      description: "HP Multi Jet Fusion. Isotropic strength, fast production.", tag: "durable", recommended: true },
      { id: "pa12-sls", name: "PA 12 SLS",      description: "Laser sintering. No support material, complex geometries.", tag: "precise" },
      { id: "glass-cf", name: "Glass-Filled CF", description: "40% glass fibre reinforcement. High rigidity under load.", tag: "rigid" },
      { id: "tpu-sls",  name: "TPU SLS",        description: "Lattice and mesh structures. Cushioning and filtration.", tag: "flexible" },
    ],
  },
  {
    id: "metal", label: "Metal", description: "DMLS / SLM metal printing",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/></svg>,
    materials: [
      { id: "316l",   name: "Stainless 316L", description: "Corrosion-resistant, medical-grade. For brackets and housings.", tag: "durable", recommended: true },
      { id: "ti64",   name: "Titanium Ti64",  description: "Highest strength-to-weight. Aerospace and implant-grade.", tag: "lightweight" },
      { id: "alsi10", name: "AlSi10Mg",       description: "Lightweight aluminium alloy. Thermal and structural parts.", tag: "heat" },
      { id: "17-4ph", name: "17-4 PH Steel",  description: "Precipitation-hardened steel. Gears, shafts, tooling.", tag: "strong" },
    ],
  },
];

function Tag({ type }: { type: TagType }) {
  const { label, className } = TAG_STYLES[type];
  return <span className={cn("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border", className)}>{label}</span>;
}

function FamilyCard({ family, selected, onClick }: { family: Family; selected: boolean; onClick: () => void }) {
  return (
    <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      className={cn("relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border cursor-pointer select-none text-center transition-colors duration-150",
        selected ? "bg-accent/10 border-accent text-accent" : "bg-surface border-border text-text-secondary hover:border-border-strong hover:text-text-primary hover:bg-surface-2"
      )}>
      {selected && <motion.span layoutId="family-ring" className="absolute inset-0 rounded-2xl ring-2 ring-accent/50" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
      <span className={selected ? "text-accent" : ""}>{family.icon}</span>
      <div>
        <p className={cn("text-sm font-semibold", selected ? "text-accent" : "text-text-primary")}>{family.label}</p>
        <p className="text-xs text-text-muted mt-0.5 leading-tight">{family.description}</p>
      </div>
    </motion.button>
  );
}

function MaterialCard({ material, selected, onClick }: { material: Material; selected: boolean; onClick: () => void }) {
  return (
    <motion.button whileHover={{ scale: 1.015, y: -1 }} whileTap={{ scale: 0.985 }} onClick={onClick}
      className={cn("relative w-full text-left flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-colors duration-150",
        selected ? "bg-accent/10 border-accent" : material.recommended
          ? "bg-surface border-border-strong hover:border-accent/40 hover:bg-surface-2"
          : "bg-surface border-border hover:border-border-strong hover:bg-surface-2"
      )}>
      {material.recommended && !selected && (
        <span className="absolute top-3 right-3 text-[10px] font-semibold text-accent/70 uppercase tracking-widest">Recommended</span>
      )}
      <div className={cn("mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors", selected ? "border-accent" : "border-border-strong")}>
        {selected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-accent" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={cn("font-semibold text-sm", selected ? "text-accent" : "text-text-primary")}>{material.name}</span>
          <Tag type={material.tag} />
        </div>
        <p className="text-text-secondary text-xs leading-relaxed">{material.description}</p>
      </div>
    </motion.button>
  );
}

interface MaterialSelectProps {
  onSelect?: (familyId: string, materialId: string) => void;
  onBack?: () => void;
}

export function MaterialSelect({ onSelect, onBack }: MaterialSelectProps) {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const family = FAMILIES.find((f) => f.id === selectedFamily);

  const handleFamilySelect = (id: string) => { setSelectedFamily(id); setSelectedMaterial(null); };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className={cn("w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors",
            selectedFamily ? "bg-accent text-white" : "bg-surface-2 text-text-muted border border-border")}>
            {selectedFamily ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg> : "1"}
          </span>
          <span className={cn("text-sm font-medium", selectedFamily ? "text-text-primary" : "text-text-muted")}>Material Family</span>
        </div>
        <div className={cn("flex-1 h-px transition-colors", selectedFamily ? "bg-accent/40" : "bg-border")} />
        <div className="flex items-center gap-2">
          <span className={cn("w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors",
            selectedMaterial ? "bg-accent text-white" : selectedFamily ? "bg-surface-2 text-accent border border-accent" : "bg-surface-2 text-text-muted border border-border")}>
            {selectedMaterial ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg> : "2"}
          </span>
          <span className={cn("text-sm font-medium", selectedFamily ? "text-text-primary" : "text-text-muted")}>Material Grade</span>
        </div>
      </div>

      {/* Family grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
        {FAMILIES.map((f) => <FamilyCard key={f.id} family={f} selected={selectedFamily === f.id} onClick={() => handleFamilySelect(f.id)} />)}
      </div>

      {/* Material list */}
      <AnimatePresence mode="wait">
        {selectedFamily && family && (
          <motion.div key={selectedFamily} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-text-primary">{family.label} grades</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {family.materials.map((mat, i) => (
                <motion.div key={mat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <MaterialCard material={mat} selected={selectedMaterial === mat.id} onClick={() => setSelectedMaterial(mat.id)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <AnimatePresence>
          {selectedMaterial && family && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
              <p className="text-sm text-text-muted hidden sm:block">
                <span className="text-text-primary font-medium">{family.materials.find((m) => m.id === selectedMaterial)?.name}</span> selected
              </p>
              <Button variant="primary" size="lg" onClick={() => onSelect?.(selectedFamily!, selectedMaterial)}
                className="px-10 shadow-accent-glow">
                Confirm Material
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
