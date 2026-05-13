"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UseCaseSelect } from "@/components/landing/UseCaseSelect";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

export default function UseCasePage() {
  const router = useRouter();
  const setUseCase = useOrderStore((s) => s.setUseCase);

  const handleSelect = (id: string) => {
    setUseCase(id);
    router.push("/environment");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Step 4 of 4</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">How will you use it?</h1>
            <p className="text-text-secondary text-lg">We'll validate your material choice against real-world conditions.</p>
          </motion.div>
          <UseCaseSelect
            onSelect={handleSelect}
            onChangeMaterial={() => router.push("/material")}
          />
        </Container>
      </main>
    </>
  );
}
