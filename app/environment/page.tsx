"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EnvironmentQuantity } from "@/components/landing/EnvironmentQuantity";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

export default function EnvironmentPage() {
  const router = useRouter();
  const setEnvironments = useOrderStore((s) => s.setEnvironments);
  const setQuantity = useOrderStore((s) => s.setQuantity);

  const handleSelect = (envs: string[], qty: string) => {
    setEnvironments(envs);
    const qtyNum = qty === "50+" ? 50 : parseInt(qty.split("-")[0]) || 1;
    setQuantity(qtyNum);
    router.push("/pricing");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Almost There</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">Environment & Quantity</h1>
            <p className="text-text-secondary text-lg">Helps us recommend the right process and calculate your price.</p>
          </motion.div>
          <EnvironmentQuantity onSelect={handleSelect} />
        </Container>
      </main>
    </>
  );
}
