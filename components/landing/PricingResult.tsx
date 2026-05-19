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

  // Hidden AI suggestion state
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);

  // =====================================================
  // AI SUGGESTION FETCHER
  // =====================================================

  const getAISuggestion = async (payload: any) => {
    try {
      const res = await fetch(`${API}/pricing/ai-suggest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) return null;

      return res.json();
    } catch {
      return null;
    }
  };

  // =====================================================
  // EXTRACT AI RANGE
  // =====================================================

  const extractAiPrice = (text: string) => {
    const match = text?.match(
      /(\d+[.,]?\d*)\s*-\s*(\d+[.,]?\d*)/
    );

    if (!match) return null;

    const min = parseFloat(
      match[1].replace(/,/g, "")
    );

    const max = parseFloat(
      match[2].replace(/,/g, "")
    );

    const mid = (min + max) / 2;

    return {
      min,
      max,
      mid,
    };
  };

  // =====================================================
  // MAIN PRICING FLOW
  // =====================================================

  useEffect(() => {
    if (!file) {
      router.replace("/upload");
      return;
    }

    async function run() {
      try {
        setLoading(true);

        const materialSlug =
          material?.gradeLabel
            ?.toLowerCase()
            .replace(/\s+/g, "-") || "pla";

        // ================================================
        // GEOMETRY
        // ================================================

        const geo = await getGeometryData(file as File, {
          materialSlug,
          useCase: useCase || "showpiece",
          infillPercent: 20,
        });

        console.log("GEOMETRY:", geo);

        // ================================================
        // PRICE API
        // ================================================

        const res = await fetch(
          `${API}/pricing/quick-calculate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              material_slug: materialSlug,

              material_key: materialSlug,

              quantity: quantity || 1,

              delivery_type: "standard",

              model_volume_cc:
                geo.modelVolumeCc,

              support_volume_cc:
                geo.supportVolumeCc,

              final_effective_material_cc:
                geo.effectiveMaterialCc,

              infill_percent: 20,

              complexity_features: {},

              orientation_analysis: {},
            }),
          }
        );

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const result = await res.json();

        console.log(
          "PRICING API RESULT:",
          result
        );

        setData(result);

        setPrintTime(
          result.estimated_print_time_hrs ??
            null
        );

        // ================================================
        // AI SUGGESTION (HIDDEN)
        // ================================================

        const ai = await getAISuggestion({
          volume:
            result.effective_volume_cc,

          material: materialSlug,

          infill: 20,

          complexity:
            result.complexity_level,

          machine_tier: "desktop",
        });

        setAiSuggestion(ai);

        const aiParsed = extractAiPrice(
          ai?.ai_suggestion || ""
        );

        const enginePrice =
          result.final_price || 0;

        let selectedPrice = enginePrice;

        if (aiParsed?.mid) {
          selectedPrice = Math.min(
            enginePrice,
            Math.round(aiParsed.mid)
          );
        }

        // ================================================
        // STORE PRICE
        // ================================================

        setPrice({
          pricePerUnit: Math.round(
            selectedPrice /
              (quantity || 1)
          ),

          subtotal:
            result.subtotal || 0,

          // DELIVERY WILL BE SELECTED
          // DURING CHECKOUT
          deliveryFee: 0,

          total: selectedPrice,

          currency: "₹",

          calculatedAt:
            new Date().toISOString(),
        });

      } catch (e: any) {
        console.error(e);

        setError(
          "Price calculation failed"
        );
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [file]);

  // =====================================================
  // FINAL DISPLAY PRICES
  // =====================================================

  const finalPrice =
    aiSuggestion?.ai_suggestion
      ? Math.round(
          Math.min(
            data?.final_price || 0,

            extractAiPrice(
              aiSuggestion.ai_suggestion
            )?.mid ||
              data?.final_price ||
              0
          )
        )
      : data?.final_price || 0;

  const pricePerUnit = Math.round(
    finalPrice / (quantity || 1)
  );

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div className="text-center mb-10">
            <h1 className="text-4xl font-bold">
              {loading
                ? "Calculating..."
                : "Your Price"}
            </h1>

            {error && (
              <p className="text-red-400 mt-2">
                {error}
              </p>
            )}
          </motion.div>

          {loading && (
            <div className="text-center py-20 text-gray-400">
              Calculating geometry + pricing...
            </div>
          )}

          {!loading && data && (
            <PricingResult
              modelName={
                model?.fileName ||
                "model.stl"
              }

              material={
                material?.familyLabel ||
                "Plastic"
              }

              materialGrade={
                material?.gradeLabel ||
                "PLA"
              }

              useCase={
                useCase || "showpiece"
              }

              quantity={quantity || 1}

              currency="₹"

              // =========================================
              // FINAL PRICE
              // =========================================

              pricePerUnit={
                pricePerUnit
              }

              totalPrice={
                finalPrice
              }

              // =========================================
              // COST BREAKDOWN
              // =========================================

              basePrice={
                data.market_adjusted_cost ||
                0
              }

              platformFee={
                data.platform_fee || 0
              }

              packagingFee={
                data.packaging_fee || 0
              }

              gstAmount={
                data.gst_amount || 0
              }

              gstRate={0.18}

              // DELIVERY NOT INCLUDED YET
              deliveryCharges={0}

              // =========================================
              // GEOMETRY
              // =========================================

              modelVolumeCc={
                data.model_volume_cc
              }

              supportVolumeCc={
                data.support_volume_cc
              }

              effectiveVolumeCc={
                data.effective_volume_cc
              }

              estimatedPrintTimeHrs={
                printTime ?? undefined
              }

              // =========================================
              // VALUE POINTS
              // =========================================

              valuePoints={[
                "Real STL geometry parsed",
                "Support volume included",
                "Automatic hollowing for large parts",
              ]}

              warnings={[]}

              onChangeMaterial={() =>
                router.push("/material")
              }

              onChangeQuantity={() =>
                router.push("/environment")
              }

              onContinue={() =>
                router.push("/checkout")
              }

              file={file}
            />
          )}
        </Container>
      </main>
    </>
  );
}
