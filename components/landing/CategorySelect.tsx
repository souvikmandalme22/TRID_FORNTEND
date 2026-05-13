"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "engineering",
    label: "Engineering",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    id: "automotive",
    label: "Automotive",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M5 17H3a2 2 0 01-2-2v-4a2 2 0 012-2h11l4 4v4h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 11V7l3-1 3 4"/>
      </svg>
    ),
  },
  {
    id: "medical",
    label: "Medical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    id: "jewelry",
    label: "Jewelry",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3L8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>
      </svg>
    ),
  },
  {
    id: "industrial",
    label: "Industrial",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    id: "consumer",
    label: "Consumer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    id: "robotics",
    label: "Robotics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/><path d="M8 21v-1a2 2 0 012-2h4a2 2 0 012 2v1"/>
      </svg>
    ),
  },
  {
    id: "architecture",
    label: "Architecture",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/>
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

interface CategorySelectProps {
  onSelect?: (id: string) => void;
}

export function CategorySelect({ onSelect }: CategorySelectProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleContinue = () => {
    if (selected) onSelect?.(selected);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {categories.map((cat) => {
          const isSelected = selected === cat.id;
          return (
            <motion.button
              key={cat.id}
              variants={item}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(cat.id)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-3.5",
                "rounded-2xl border p-6 cursor-pointer select-none",
                "transition-colors duration-150",
                isSelected
                  ? "bg-accent/12 border-accent text-accent"
                  : "bg-surface border-border text-text-secondary hover:border-border-strong hover:text-text-primary hover:bg-surface-2"
              )}
            >
              {/* Selected ring */}
              {isSelected && (
                <motion.span
                  layoutId="selected-ring"
                  className="absolute inset-0 rounded-2xl ring-2 ring-accent/60"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Selected dot */}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent"
                />
              )}

              <span className={cn("transition-colors duration-150", isSelected ? "text-accent" : "")}>
                {cat.icon}
              </span>

              <span className={cn(
                "text-sm font-semibold tracking-tight",
                isSelected ? "text-accent" : "text-text-primary"
              )}>
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0.35 }}
        transition={{ duration: 0.3 }}
        className="mt-8 flex justify-end"
      >
        <Button
          variant="primary"
          size="lg"
          disabled={!selected}
          onClick={handleContinue}
          className={cn("px-10", selected && "shadow-accent-glow")}
        >
          Continue
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </motion.div>
    </div>
  );
}
