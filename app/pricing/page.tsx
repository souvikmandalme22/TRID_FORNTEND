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

  const model = useOrderStore((s) => s.model);
  const material = useOrderStore((s) => s.material);
  const useCase = useOrderStore((s) => s.useCase);
  const quantity = useOrderStore((s) => s.quantity);
  const setPrice = useOrderStore((s) => s.setPrice);
  const file = useOrderStore((s) => s.file);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      router.replace("/upload");
      return;
    }

    async function fetchPrice() {
      try {
        setLoading(true);

        const materialSlug =
          material?.gradeLabel?.toLowerCase().replace(/\s+/g, "-") || "pla";

        const res = await fetch(`${API}/pricing/quick-calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            material_slug: materialSlug,
            material_key: materialSlug,

            quantity: quantity || 1,
            delivery_type: "standard",

            (model?.volumeCc && model.volumeCc > 0 ? model.volumeCc : 35)
            support_volume_cc: 0,
            final_effective_material_cc: (model?.volumeCc && model.volumeCc > 0 ? model.volumeCc : 35),

            infill_percent: 20,

            complexity_features: {},
            orientation_analysis: {},
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Pricing failed");
        }

        const result = await res.json();
        console.log("PRICE RESULT:", result);

        setData(result);

        setPrice({
          pricePerUnit: Math.round(result.final_price / (quantity || 1)),
          subtotal: result.base_display_price || 0,
          deliveryFee: result.delivery_charges || 0,
          total: result.final_price,
          currency: "₹",
          calculatedAt: new Date().toISOString(),
        });

      } catch (e: any) {
        console.error(e);
        setError("Price calculation failed");
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, [file, model, material, useCase, quantity, router, setPrice]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold">
              {loading ? "Calculating..." : "Your Price"}
            </h1>

            {error && (
              <p className="text-red-400 mt-2">{error}</p>
            )}
          </motion.div>

          {loading && (
            <div className="text-center py-20 text-gray-400">
              Fetching backend price...
            </div>
          )}

          {!loading && data && (
            <PricingResult
              modelName={model?.fileName || "model.stl"}
              material={material?.familyLabel || "Plastic"}
              materialGrade={material?.gradeLabel || "PLA"}
              useCase={useCase || "showpiece"}
              quantity={quantity || 1}
              currency="₹"

              pricePerUnit={Math.round(data.final_price / (quantity || 1))}
              totalPrice={data.final_price}
              basePrice={data.base_display_price || 0}
              platformFee={data.platform_fee || 0}
              packagingFee={data.packaging_fee || 0}
              gstAmount={data.gst_amount || 0}
              gstRate={0.18}
              deliveryCharges={data.delivery_charges || 0}

              modelVolumeCc={model?.volumeCc || 0}
              supportVolumeCc={0}
              effectiveVolumeCc={model?.volumeCc || 0}

              valuePoints={[
                "Backend pricing engine active",
                "No frontend estimation",
                "Single source of truth (API)",
              ]}
              warnings={error ? [error] : []}

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
