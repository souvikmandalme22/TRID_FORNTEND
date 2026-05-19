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

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

// Backend expects uppercase: "PLA", "ABS", "PETG" etc.
function normalizeMaterialKey(label?: string): string {
  const raw = label?.toUpperCase().replace(/\s+/g, "_") || "PLA";

  // Map common frontend labels → backend keys
  const MAP: Record<string, string> = {
    "PLA":        "PLA",
    "ABS":        "ABS",
    "PETG":       "PETG",
    "TPU":        "TPU",
    "NYLON":      "NYLON_PA12",
    "NYLON_PA12": "NYLON_PA12",
    "RESIN":      "RESIN",
  };
  return MAP[raw] || "PLA";
}

// Slug for endpoints that still need lowercase
function normalizeMaterialSlug(label?: string): string {
  return label?.toLowerCase().replace(/\s+/g, "-") || "pla";
}

// Derive machine tier from material — resin/nylon → mid_industry, rest → desktop
function getMachineTier(materialKey: string): string {
  if (["RESIN", "NYLON_PA12"].includes(materialKey)) return "mid_industry";
  return "desktop";
}

export default function PricingPage() {
  const router = useRouter();

  const model    = useOrderStore((s) => s.model);
  const material = useOrderStore((s) => s.material);
  const useCase  = useOrderStore((s) => s.useCase);
  const quantity = useOrderStore((s) => s.quantity);
  const setPrice = useOrderStore((s) => s.setPrice);
  const file     = useOrderStore((s) => s.file);

  const [data, setData]       = useState<PricingApiResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [printTime, setPrintTime] = useState<number | null>(null);

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

        const materialKey  = normalizeMaterialKey(material?.gradeLabel);
        const materialSlug = normalizeMaterialSlug(material?.gradeLabel);
        const machineTier  = getMachineTier(materialKey);
        const currentQty   = quantity || 1;

        // ── Step 1: Client-side geometry ──────────────────────────────
        const geo = await getGeometryData(currentFile, {
          materialSlug,
          useCase:       useCase || "showpiece",
          infillPercent: 20,
        });

        // ── Step 2: Pricing API call ───────────────────────────────────
        const res = await fetch(`${API}/pricing/quick-calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Material — both formats for compatibility
            material_slug: materialSlug,
            material_key:  materialKey,       // ← FIXED: now uppercase "PLA" not "pla"

            // Complexity — always simple (mid_complex/complex removed)
            complexity:    "simple",          // ← FIXED: was missing

            // Machine tier — derived from material
            machine_tier:  machineTier,       // ← FIXED: was missing

            // Quality — standard for all orders
            quality:       "standard",        // ← FIXED: was missing

            // Geometry from client-side STL parser
            model_volume_cc:             geo.modelVolumeCc,
            support_volume_cc:           geo.supportVolumeCc,
            final_effective_material_cc: geo.effectiveMaterialCc,

            // Order params
            infill_percent:  20,
            quantity:        currentQty,
            delivery_type:   "standard",

            // Pass-through (keep for backward compat)
            complexity_features:  {},
            orientation_analysis: {},
          }),
        });

        if (!res.ok) throw new Error(await res.text());

        const result = (await res.json()) as PricingApiResult;
        if (cancelled) return;

        setData(result);
        setPrintTime(result.estimated_print_time_hrs ?? null);

        // ── Step 3: Store price ────────────────────────────────────────
        const enginePrice = result.final_price || 0;

        setPrice({
          pricePerUnit: Math.round(enginePrice / currentQty),
          subtotal:     result.subtotal || 0,
          deliveryFee:  result.delivery_fee ?? result.delivery_charges ?? 0,
          total:        enginePrice,
          currency:     "₹",
          calculatedAt: new Date().toISOString(),
        });

      } catch (e) {
        if (cancelled) return;
        console.error(e);
        setError("Price calculation failed");
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    run();
    return () => { cancelled = true; };
  }, [file, material?.gradeLabel, quantity, router, setPrice, useCase]);

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  const finalPrice   = data?.final_price || 0;
  const pricePerUnit = Math.round(finalPrice / (quantity || 1));

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>
          <motion.div className="text-center mb-10">
            <h1 className="text-4xl font-bold">
              {loading ? "Calculating..." : "Your Price"}
            </h1>
            {error && (
              <p className="text-red-400 mt-2">{error}</p>
            )}
          </motion.div>

          {loading && (
            <div className="text-center py-20 text-gray-400">
              Calculating geometry + pricing...
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

              pricePerUnit={pricePerUnit}
              totalPrice={finalPrice}

              basePrice={
                data.adjusted_manufacturing_cost ??
                data.market_adjusted_cost ??
                data.base_manufacturing_cost ??
                0
              }
              platformFee={data.platform_fee || 0}
              packagingFee={data.packaging_fee || 0}
              gstAmount={data.gst_amount || 0}
              gstRate={0.18}
              deliveryCharges={
                data.delivery_fee ?? data.delivery_charges ?? 0
              }

              modelVolumeCc={data.model_volume_cc ?? 0}
              supportVolumeCc={data.support_volume_cc ?? 0}
              effectiveVolumeCc={data.effective_volume_cc ?? 0}
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
          )}
        </Container>
      </main>
    </>
  );
}
