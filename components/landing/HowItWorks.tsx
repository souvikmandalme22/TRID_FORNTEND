"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Section } from "@/components/ui";

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    title: "Upload Your Model",
    description:
      "Drag & drop your STL, STEP, or OBJ file. Our system analyzes geometry, volume, and complexity in seconds.",
    detail: "Supports STL · STEP · OBJ · 3MF",
  },
  {
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Get Instant Pricing",
    description:
      "Receive a real-time quote — no RFQs, no waiting. Select material, finish, and quantity. Price updates live.",
    detail: "Real-time · No hidden fees",
  },
  {
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Receive Your Parts",
    description:
      "We manufacture, quality-check, and ship directly to your door. Track every step in real time.",
    detail: "48h turnaround · Tracked delivery",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="how-it-works" className="bg-surface/30">
      <Container>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-text-secondary text-xl max-w-xl mx-auto">
            From file to finished part in three steps. No complexity, no friction.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
                className="relative flex flex-col items-start md:items-center text-left md:text-center group"
              >
                {/* Icon + Number */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300 flex items-center justify-center text-accent">
                    {step.icon}
                  </div>
                  <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-background border border-border text-xs font-bold text-text-muted flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.description}</p>
                  <span className="inline-block text-xs font-medium text-accent/80 bg-accent/10 px-3 py-1 rounded-full">
                    {step.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
