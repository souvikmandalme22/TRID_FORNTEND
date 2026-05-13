"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PricingResult } from "@/components/landing/PricingResult";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";

export default function PricingPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Instant Quote
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
              Your Price
            </h1>
            <p className="text-text-secondary text-lg">
              No hidden fees. No surprises. Ready to order.
            </p>
          </motion.div>

          <PricingResult
            modelName="bracket_v3_final.stl"
            material="Resin"
            materialGrade="Standard Resin"
            useCase="Fit / Assembly"
            quantity={5}
            pricePerUnit={1240}
            totalPrice={6200}
            currency="₹"
            valuePoints={[
              "Material is suitable for your selected use case",
              "Tolerances meet standard assembly requirements",
              "Estimated delivery within 3–5 business days",
            ]}
            warnings={[
              "Standard Resin may show micro-cracking under repeated assembly stress.",
            ]}
            suggestions={[
              "Try Tough Resin for better snap-fit durability",
              "PA 12 Nylon for long-term use",
            ]}
            onChangeMaterial={() => router.push("/material")}
            onChangeQuantity={() => router.push("/environment")}
            onContinue={() => console.log("Proceeding to order")}
          />
        </Container>
      </main>
    </>
  );
}
