"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PricingResult } from "@/components/landing/PricingResult";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

export default function PricingPage() {
  const router = useRouter();
  const { model, material, useCase, quantity } = useOrderStore();

  const pricePerUnit = 1240;
  const totalPrice = pricePerUnit * (quantity || 1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="text-center mb-10">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Instant Quote</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">Your Price</h1>
            <p className="text-text-secondary text-lg">No hidden fees. No surprises. Ready to order.</p>
          </motion.div>
          <PricingResult
            modelName={model?.fileName || "your-model.stl"}
            material={material?.familyLabel || "Resin"}
            materialGrade={material?.gradeLabel || "Standard Resin"}
            useCase={useCase || "General Use"}
            quantity={quantity || 1}
            pricePerUnit={pricePerUnit}
            totalPrice={totalPrice}
            currency="₹"
            valuePoints={[
              "Material is suitable for your selected use case",
              "Tolerances meet standard assembly requirements",
              "Estimated delivery within 3–5 business days",
            ]}
            warnings={useCase === "fit" ? ["Standard Resin may show micro-cracking under repeated assembly stress."] : []}
            suggestions={["Try Tough Resin for better durability", "PA 12 Nylon for long-term use"]}
            onChangeMaterial={() => router.push("/material")}
            onChangeQuantity={() => router.push("/environment")}
            onContinue={() => router.push("/checkout")}
          />
        </Container>
      </main>
    </>
  );
}
