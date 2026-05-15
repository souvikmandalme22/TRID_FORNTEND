"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PricingResult } from "@/components/landing/PricingResult";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

const API = process.env.NEXT_PUBLIC_API_URL || "https://trid-bak.onrender.com/api/v1";

export default function PricingPage() {
  const router = useRouter();
  const { model, material, useCase, quantity, segment } = useOrderStore();
  const setPrice = useOrderStore((s) => s.setPrice);

  const [priceData, setPriceData] = useState<any>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(`${API}/pricing/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
           model_id: model?.fileName || "unknown",
            material_key:                material?.gradeLabel?.toUpperCase().replace(/ /g, "_") || "PLA",
            complexity:                  "mid_complex",
            machine_tier:                "desktop",
           final_effective_material_cc: 10,
            quantity:                    quantity || 1,
            delivery_type:               "standard",
          }),
        });
        if (!res.ok) throw new Error("Pricing failed");
        const data = await res.json();
        setPriceData(data);
        setPrice({ total: data.final_price, breakdown: data });
      } catch (e: any) {
        setError("Could not fetch price. Using estimate.");
        setPriceData({ final_price: 1240, base_display_price: 1050, gst_amount: 190, delivery_charges: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchPrice();
  }, []);

  const pricePerUnit = priceData ? Math.round(priceData.final_price / (quantity || 1)) : 1240;
  const totalPrice   = priceData?.final_price || 1240;

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="text-center mb-10">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Instant Quote</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
              {loading ? "Calculating..." : "Your Price"}
            </h1>
            <p className="text-text-secondary text-lg">No hidden fees. No surprises. Ready to order.</p>
            {error && <p className="text-yellow-400 text-sm mt-2">{error}</p>}
          </motion.div>
          {!loading && (
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
              warnings={[]}
              suggestions={[]}
              onChangeMaterial={() => router.push("/material")}
              onChangeQuantity={() => router.push("/environment")}
              onContinue={() => router.push("/checkout")}
            />
          )}
        </Container>
      </main>
    </>
  );
}
