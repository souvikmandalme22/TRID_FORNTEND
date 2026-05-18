"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Container } from "@/components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const stats = [
  { value: "500+", label: "Orders Delivered" },
  { value: "200+", label: "Verified Suppliers" },
  { value: "48hr", label: "Avg. Turnaround" },
  { value: "₹0", label: "Platform Fee" },
];

const useCases = [
  "🏆 Miniatures & Figurines",
  "💍 Jewellery Patterns",
  "🚀 Startup Prototypes",
  "⚙️ Functional Parts",
  "🏥 Medical Models",
  "🎓 Student Projects",
  "🏭 Industrial Tooling",
  "🚗 Automotive Parts",
];

const certBadges = [
  "GST Registered",
  "NDA Protected",
  "Secure Payments",
  "Pan-India Delivery",
];

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-steel-blue/5 blur-[100px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      <Container>
        <div className="text-center max-w-5xl mx-auto">

          {/* Announcement bar */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-8 cursor-pointer hover:bg-accent/15 transition-colors"
            onClick={() => router.push("/upload")}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-sm font-medium tracking-wide">
              🎉 India's First Automated Manufacturing Quote Platform — Try it Free
            </span>
            <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>

          {/* Headline */}
          <motion.h1 custom={0.1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-text-primary leading-[1.05] tracking-tight mb-6 text-balance">
            Custom Manufacturing{" "}
            <span className="relative inline-block">
              <span className="text-accent">On Demand</span>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/40 origin-left" />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p custom={0.2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed mb-4 max-w-2xl mx-auto">
            The platform for{" "}
            <span className="text-text-primary font-semibold">everyone</span>
            {" "}— from hobbyists printing miniatures to enterprises sourcing 10,000 parts.
          </motion.p>

          <motion.p custom={0.25} variants={fadeUp} initial="hidden" animate="visible"
            className="text-base text-text-muted mb-10 max-w-xl mx-auto">
            Upload your 3D file → Get an instant price → We manufacture & deliver.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div custom={0.3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button variant="primary" size="lg" onClick={() => router.push("/upload")}
              className="w-full sm:w-auto text-lg px-10 py-5 shadow-accent-glow">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Get an Instant Quote
            </Button>
            <Button variant="secondary" size="lg" onClick={() => router.push("/#how-it-works")}
              className="w-full sm:w-auto text-lg px-10 py-5">
              See How It Works
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div custom={0.35} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {certBadges.map((badge) => (
              <span key={badge}
                className="flex items-center gap-1.5 text-xs text-text-muted border border-border rounded-full px-3 py-1.5">
                <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Use case scroll */}
          <motion.div custom={0.4} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-16 overflow-hidden">
            <p className="text-xs text-text-muted/60 uppercase tracking-widest mb-4">
              Made for every use case
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {useCases.map((uc) => (
                <span key={uc}
                  className="text-sm text-text-muted bg-surface border border-border rounded-full px-4 py-2 hover:border-accent/40 hover:text-text-primary transition-colors cursor-default">
                  {uc}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center py-4">
                <div className="text-3xl font-extrabold text-text-primary">{value}</div>
                <div className="text-sm text-text-muted mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border border-border-strong rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>

    </section>
  );
}
