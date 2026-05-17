"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingTransparency } from "@/components/landing/PricingTransparency";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <PricingTransparency />
      </main>
    </>
  );
}
