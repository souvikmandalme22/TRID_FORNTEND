"use client";

import { motion } from "framer-motion";
import { Button, Container } from "@/components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const stats = [
  { value: "48h", label: "Average turnaround" },
  { value: "12+", label: "Materials available" },
  { value: "99.2%", label: "Quality pass rate" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-steel-blue/5 blur-[100px]" />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container>
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-sm font-medium tracking-wide">
              Manufacturing as a Service
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-[1.05] tracking-tight mb-6 text-balance"
          >
            Upload your{" "}
            <span className="relative inline-block">
              <span className="text-accent">3D Model</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/40 origin-left"
              />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Instant pricing.{" "}
            <span className="text-text-primary font-medium">Smart manufacturing.</span>
            <br className="hidden md:block" />
            From file to finished part — faster than ever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-lg px-10 py-5 shadow-accent-glow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Model
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-10 py-5">
              See How It Works
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-border"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-text-primary">{value}</div>
                <div className="text-sm text-text-muted mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border border-border-strong rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
