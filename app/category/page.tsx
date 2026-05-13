"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CategorySelect } from "@/components/landing/CategorySelect";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

export default function CategoryPage() {
  const router = useRouter();
  const setSegment = useOrderStore((s) => s.setSegment);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              Back
            </button>
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Step 2 of 4</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">What are you building?</h1>
              <p className="text-text-secondary text-lg">We'll tailor materials and tolerances for your industry.</p>
            </div>
          </motion.div>
          <CategorySelect onSelect={(id) => { setSegment(id); router.push("/material"); }} />
        </Container>
      </main>
    </>
  );
}
