"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import PricingResult from "@/components/landing/PricingResult";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";

import { getGeometryData } from "@/lib/geometry";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://trid-bak.onrender.com/api/v1";

interface PricingApiResult {
  material_slug?: string;
  model_volume_cc?: number;
  support_volume_cc?: number;
  effective_volume_cc?: number;
  base_manufacturing_cost?: number;
  adjusted_manufacturing_cost?: number;
  market_adjusted_cost?: number;
  platform_fee?: number;
  packaging_fee?: number;
  subtotal?: number;
  gst_amount?: number;
  delivery_fee?: number;
  delivery_charges?: number;
  final_price?: number;
  estimated_print_time_hrs?: number;
  complexity_level?: string;
}

interface AiSuggestion {
  ai_suggestion?: string;
}

interface AiPriceRange {
  min: number;
  max: number;
  mid: number;
}

function normalizeMaterialSlug(label?: string) {
  return label?.toLowerCase().replace(/\s+/g, "-") || "pla";
}

async function getAISuggestion(payload: {
  volume: number;
  material: string;
  infill: number;
  complexity?: string;
  machine_tier: string;
}): Promise<AiSuggestion | null> {
  try {
    const res = await fetch(`${API}/pricing/ai-suggest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;

    return (await res.json()) as AiSuggestion;
  } catch {
    return null;
  }
}

function extractAiPrice(text?: string): AiPriceRange | null {
  const match = text?.match(/(\d+[.,]?\d*)\s*-\s*(\d+[.,]?\d*)/);

  if (!match) return null;

  const min = parseFloat(match[1].replace(/,/g, ""));
  const max = parseFloat(match[2].replace(/,/g, ""));

  return {
    min,
    max,
    mid: (min + max) / 2,
  };
}

export default function PricingPage() {
  const router = useRouter();

  const model = useOrderStore((s) => s.model);
  const material = useOrderStore((s) => s.material);
  const useCase = useOrderStore((s) => s.useCase);
  const quantity = useOrderStore((s) => s.quantity);
  const setPrice = useOrderStore((s) => s.setPrice);
  const file = useOrderStore((s) => s.file);

  const [data, setData] = useState<PricingApiResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [printTime, setPrintTime] = useState<number | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<AiSuggestion | null>(null);

  useEffect(() => {
    if (!file) {
      setLoading(false);
      router.replace("/upload");
      return;
    }

    const currentFile = file;
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError("");
        setData(null);
        setAiSuggestion(null);

        const materialSlug = normalizeMaterialSlug(material?.gradeLabel);
        const currentQuantity = quantity || 1;

        const geo = await getGeometryData(currentFile, {
          materialSlug,
          useCase: useCase || "showpiece",
          infillPercent: 20,
        });

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
              quantity: currentQuantity,
              delivery_type: "standard",
              model_volume_cc: geo.modelVolumeCc,
              support_volume_cc: geo.supportVolumeCc,
              final_effective_material_cc: geo.effectiveMaterialCc,
              infill_percent: 20,
              complexity_features: {},
              orientation_analysis: {},
            }),
          }
        );

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const result = (await res.json()) as PricingApiResult;

        if (cancelled) return;
        setData(result);

        setPrintTime(
          result.estimated_print_time_hrs ?? null
        );

        // =====================================================
        // AI SUGGESTION (HIDDEN)
        // =====================================================

        const ai = await getAISuggestion({
          volume: result.effective_volume_cc || 0,
          material: materialSlug,
          infill: 20,
          complexity: result.complexity_level,
          machine_tier: "desktop",
        });

        if (cancelled) return;
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

        // =====================================================
        // STORE PRICE
        // =====================================================

        setPrice({
          pricePerUnit: Math.round(
            selectedPrice / currentQuantity
          ),

          subtotal: result.subtotal || 0,

          deliveryFee: result.delivery_fee ?? result.delivery_charges ?? 0,

          total: selectedPrice,

          currency: "\u20b9",

          calculatedAt:
            new Date().toISOString(),
        });

      } catch (e) {
        if (cancelled) return;
        console.error(e);

        setError(
          "Price calculation failed"
        );
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [file, material?.gradeLabel, quantity, router, setPrice, useCase]);

  // =====================================================
  // PRICE DISPLAY
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
                model?.fileName || "model.stl"
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

              currency={"\u20b9"}

              pricePerUnit={pricePerUnit}

              totalPrice={finalPrice}

              // =================================================
              // FIXED FIELD MAPPING
              // =================================================

              basePrice={
                data.adjusted_manufacturing_cost ??
                data.market_adjusted_cost ??
                data.base_manufacturing_cost ??
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

              deliveryCharges={
                data.delivery_fee ??
                data.delivery_charges ??
                0
              }

              // =================================================
              // GEOMETRY
              // =================================================

              modelVolumeCc={
                data.model_volume_cc ?? 0
              }

              supportVolumeCc={
                data.support_volume_cc ?? 0
              }

              effectiveVolumeCc={
                data.effective_volume_cc ?? 0
              }

              estimatedPrintTimeHrs={
                printTime ?? undefined
              }

              // =================================================
              // UX
              // =================================================

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
