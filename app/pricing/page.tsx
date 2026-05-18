"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { PricingResult } from "@/components/landing/PricingResult";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

import { getGeometryData } from "@/lib/geometry";

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
  const [printTime, setPrintTime] = useState<number | null>(null);

  useEffect(() => {
    if (!file) {
      router.replace("/upload");
      return;
    }

    async function run() {
      try {
        setLoading(true);

        const geo = await getGeometryData(file as File, {
          materialSlug:
            material?.gradeLabel?.toLowerCase().replace(/\s+/g, "-") || "pla",
          useCase: useCase || "showpiece",
          infillPercent: 20,
        });

        console.log("GEOMETRY:", geo);

        const res = await fetch(`${API}/pricing/quick-calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            material_slug:
              material?.gradeLabel?.toLowerCase().replace(/\s+/g, "-") || "pla",
            material_key:
              material?.gradeLabel?.toLowerCase().replace(/\s+/g, "-") || "pla",
            quantity: quantity || 1,
            delivery_type: "standard",
            model_volume_cc: geo.modelVolumeCc,
            support_volume_cc: geo.supportVolumeCc,
            final_effective_material_cc: geo.effectiveMaterialCc,
            infill_percent: 20,
            complexity_features: {},
            orientation_analysis: {},
          }),
        });

        if (!res.ok) throw new Error(await res.text());

        const result = await res.json();

        setData(result);
        setPrintTime(result.estimated_print_time_hrs ?? null);

        // STORE UPDATE
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

    run();
  }, [file]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div className="text-center mb-10">
            <h1 className="text-4xl font-bold">
              {loading ? "Calculating..." : "Your Price"}
            </h1>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </motion.div>

          {loading && (
            <div className="text-center py-20 text-gray-400">
              Calculating geometry + pricing...
            </div>
          )}

          {!loading && data && (
            <>
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
                modelVolumeCc={data.model_volume_cc}
                supportVolumeCc={data.support_volume_cc}
                effectiveVolumeCc={data.effective_volume_cc}
                estimatedPrintTimeHrs={printTime ?? undefined}
                valuePoints={[
                  "Real STL geometry parsed",
                  "Support volume included",
                  "Automatic hollowing for large parts",
                ]}
                warnings={[]}
                onChangeMaterial={() => router.push("/material")}
                onChangeQuantity={() => router.push("/environment")}
                onContinue={() => router.push("/checkout")}
                file={file}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
}
