"use client";

import { motion } from "framer-motion";
import { MaterialSelect } from "@/components/landing/MaterialSelect";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";

export default function MaterialPage() {
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
              Step 3 of 4
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
              Choose Your Material
            </h1>
            <p className="text-text-secondary text-lg">
              Select a family, then pick the grade that fits your requirements.
            </p>
          </motion.div>

          <MaterialSelect
            onSelect={(family, material) =>
              console.log("Material selected:", { family, material })
            }
          />
        </Container>
      </main>
    </>
  );
}
