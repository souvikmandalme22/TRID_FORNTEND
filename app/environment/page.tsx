"use client";

import { motion } from "framer-motion";
import { EnvironmentQuantity } from "@/components/landing/EnvironmentQuantity";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";

export default function EnvironmentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Almost There
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
              Environment & Quantity
            </h1>
            <p className="text-text-secondary text-lg">
              Helps us recommend the right process and calculate your price.
            </p>
          </motion.div>

          <EnvironmentQuantity
            onSelect={(envs, qty) => console.log({ envs, qty })}
          />
        </Container>
      </main>
    </>
  );
}
