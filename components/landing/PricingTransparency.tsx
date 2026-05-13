"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { Container, Section, Button } from "@/components/ui";

const features = [
  { icon: "⚡", title: "Instant Quote", description: "Price calculated in under 3 seconds. No sales calls." },
  { icon: "🔒", title: "Fixed Pricing", description: "The price you see is the price you pay. Zero surprises." },
  { icon: "📦", title: "Volume Discounts", description: "Automatic savings as your quantity grows. Transparent tiers." },
  { icon: "🔄", title: "No Setup Fees", description: "First print or thousandth — no tooling or setup charges." },
];

const tiers = [
  { qty: "1–9 pcs", label: "Prototype", price: "Market rate", highlight: false },
  { qty: "10–49 pcs", label: "Small Batch", price: "Up to 15% off", highlight: false },
  { qty: "50–199 pcs", label: "Production", price: "Up to 30% off", highlight: true },
  { qty: "200+ pcs", label: "Enterprise", price: "Custom pricing", highlight: false },
];

export function PricingTransparency() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();

  return (
    <Section id="pricing">
      <Container>
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">Radical Transparency</h2>
          <p className="text-text-secondary text-xl max-w-xl mx-auto">No RFQs, no negotiations. Real prices, instantly.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface border border-border hover:border-accent/30 rounded-2xl p-6 transition-all duration-300">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h4 className="text-text-primary font-semibold mb-1">{f.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-surface border border-border rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {tiers.map((tier) => (
              <div key={tier.qty} className={`relative p-8 flex flex-col gap-3 transition-colors duration-300 ${tier.highlight ? "bg-accent/8" : "hover:bg-surface-2"}`}>
                {tier.highlight && <span className="absolute top-4 right-4 text-xs font-semibold text-accent bg-accent/15 px-2.5 py-1 rounded-full">Most Popular</span>}
                <span className="text-sm text-text-muted font-medium">{tier.qty}</span>
                <span className="text-lg font-semibold text-text-primary">{tier.label}</span>
                <span className={`text-base font-bold ${tier.highlight ? "text-accent" : "text-text-secondary"}`}>{tier.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }} className="text-center mt-14">
          <p className="text-text-muted mb-6 text-base">Get an exact quote in seconds — no account required.</p>
          <Button variant="primary" size="lg" onClick={() => router.push("/upload")}
            className="shadow-accent-glow px-12">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Your Model Free
          </Button>
          <p className="text-text-muted text-sm mt-4">No signup needed · Supports STL, STEP, OBJ</p>
        </motion.div>
      </Container>
    </Section>
  );
}
