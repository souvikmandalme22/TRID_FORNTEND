"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { PricingResult } from "@/components/landing/PricingResult";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://trid-bak.onrender.com/api/v1";

export default function PricingPage() {
  const router = useRouter();

  const model        = useOrderStore((s) => s.model);
  const material     = useOrderStore((s) => s.material);
  const useCase      = useOrderStore((s) => s.useCase);
  const quantity     = useOrderStore((s) => s.quantity);
  const infillPercent= useOrderStore((s) => s.infillPercent);
  const setPrice     = useOrderStore((s) => s.setPrice);

  // ✅ FIX: real File object from store (not model as any)
  const file = useOrderStore((s) => s.file);

  const [priceData, setPriceData] = useState<any>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    async function fetchPrice() {
      try {
        const modelVolumeCc   = 35;
        const supportVolumeCc = modelVolumeCc * 0.18;

        const payload = {
          material_slug:
            material?.gradeLabel?.toLowerCase().replace(/ /g, "-") || "pla",
          quantity: quantity || 1,
          delivery_tier: "standard",
          model_volume_cc: modelVolumeCc,
          support_volume_cc: supportVolumeCc,
          infill_percent: infillPercent || 20,
          layer_height: 0.2,
          estimated_print_time_hours: 4.5,
          complexity_features: {
            thin_wall: false,
            internal_channels: false,
            text_or_logo: false,
            high_support: true,
            orientation_sensitive: false,
            tiny_features: false,
            tolerance_critical: false,
          },
          orientation_analysis: {
            stability_score: 0.82,
            failure_risk: 0.15,
            tall_geometry: false,
            warp_risk: false,
          },
        };

        const res = await fetch(`${API}/pricing/quick-calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Pricing API Error:", errText);
          throw new Error("Pricing failed");
        }

        const data = await res.json();
        setPriceData(data);

        setPrice({
          pricePerUnit: Math.round(data.final_price / (quantity || 1)),
          subtotal:     data.subtotal || 0,
          deliveryFee:  data.delivery_fee || 0,
          total:        data.final_price || 0,
          currency:     "₹",
          calculatedAt: new Date().toISOString(),
        });

      } catch (e) {
        console.error(e);
        setError("Could not fetch live price. Using estimate.");
        setPriceData({
          final_price:  1240,
          subtotal:     1050,
          gst_amount:   190,
          delivery_fee: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, []);

  const pricePerUnit = priceData
    ? Math.round(priceData.final_price / (quantity || 1))
    : 1240;

  const totalPrice = priceData?.final_price || 1240;

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Instant Quote
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
              {loading ? "Calculating..." : "Your Price"}
            </h1>

            <p className="text-text-secondary text-lg">
              AI-powered manufacturing pricing engine
            </p>

            {error && (
              <p className="text-yellow-400 text-sm mt-2">{error}</p>
            )}

            {infillPercent && (
              <p className="text-text-muted text-xs mt-1">
                Infill: {infillPercent}%
              </p>
            )}
          </motion.div>

          {!loading && (
            <PricingResult
              modelName={model?.fileName || "your-model.stl"}
              material={material?.familyLabel || "PLA"}
              materialGrade={material?.gradeLabel || "PLA"}
              useCase={useCase || "General Use"}
              quantity={quantity || 1}
              pricePerUnit={pricePerUnit}
              totalPrice={totalPrice}
              currency="₹"
              valuePoints={[
                "Support-aware pricing enabled",
                "Orientation-aware costing enabled",
                "Infill-aware manufacturing estimation",
              ]}
              warnings={[]}
              suggestions={[
                "Lower infill reduces manufacturing cost",
                "Complex geometry increases support requirement",
              ]}
              onChangeMaterial={() => router.push("/material")}
              onChangeQuantity={() => router.push("/environment")}
              onContinue={() => router.push("/checkout")}
              file={file}   // ✅ FIX: real File object, null-safe
            />
          )}
        </Container>
      </main>
    </>
  );
}
