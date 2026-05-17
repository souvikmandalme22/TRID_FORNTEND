"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { PricingResult } from "@/components/landing/PricingResult";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui";
import { useOrderStore } from "@/store";
import {
  calculateFileVolume,
  calcSupportVolume,
  calcEffectiveVolume,
} from "@/lib/geometry";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://trid-bak.onrender.com/api/v1";

const GST_RATE        = 0.18;
const FALLBACK_VOL_CC = 35; // jab file null ho (refresh ke baad)

export default function PricingPage() {
  const router = useRouter();

  const model         = useOrderStore((s) => s.model);
  const material      = useOrderStore((s) => s.material);
  const useCase       = useOrderStore((s) => s.useCase);
  const quantity      = useOrderStore((s) => s.quantity);
  const infillPercent = useOrderStore((s) => s.infillPercent);
  const setPrice      = useOrderStore((s) => s.setPrice);
  const setModelData  = useOrderStore((s) => s.setModelData);
  const file          = useOrderStore((s) => s.file); // real File object
  const storedVolumeCc = model?.volumeCc ?? null;

  const [priceData,   setPriceData]   = useState<any>(null);
  const [volumes,     setVolumes]     = useState<{
    model: number; support: number; effective: number;
  } | null>(null);
  const [parsing,  setParsing]  = useState(true);  // STL parse ho raha hai
  const [loading,  setLoading]  = useState(false);  // API call
  const [error,    setError]    = useState("");

  // ── Step 1: File se real volume nikalo ──
  useEffect(() => {
    async function parseVolume() {
      setParsing(true);
      setError("");
      let modelVol =
        storedVolumeCc && storedVolumeCc > 0
          ? storedVolumeCc
          : FALLBACK_VOL_CC;

      if (!storedVolumeCc && !file) {
        setParsing(false);
        router.replace("/upload");
        return;
      }

      if (!storedVolumeCc && file) {
        try {
          const vol = await calculateFileVolume(file);
          // vol > 0 means successfully parsed
          if (vol > 0.1) {
            modelVol = parseFloat(vol.toFixed(2));
            setModelData({ volumeCc: modelVol });
          } else {
            setError("Exact model volume parse nahi hua — estimate use ho raha hai.");
          }
        } catch (e) {
          console.warn("Volume parse failed, using fallback:", e);
          setError("Exact model volume parse nahi hua — estimate use ho raha hai.");
        }
      }

      const supportVol   = calcSupportVolume(modelVol);
      const effectiveVol = calcEffectiveVolume(modelVol, supportVol, infillPercent || 20);

      setVolumes({ model: modelVol, support: supportVol, effective: effectiveVol });
      setParsing(false);
    }

    parseVolume();
  }, [file, infillPercent, router, setModelData, storedVolumeCc]);

  // ── Step 2: Volume ready hone ke baad price fetch karo ──
  useEffect(() => {
    if (!volumes) return;
    const currentVolumes = volumes;

    async function fetchPrice() {
      setLoading(true);
      try {
        const materialSlug =
          material?.gradeLabel?.toLowerCase().replace(/ /g, "-") || "pla";

        const payload = {
          material_slug:                 materialSlug,
          material_key:                  materialSlug,
          quantity:                    quantity || 1,
          delivery_tier:               "standard",
          delivery_type:               "standard",
          model_volume_cc:             currentVolumes.model,
          support_volume_cc:           currentVolumes.support,
          final_effective_material_cc:  currentVolumes.effective,
          infill_percent:              infillPercent || 20,
          layer_height:                0.2,
          estimated_print_time_hours:
            parseFloat((currentVolumes.model * 0.12).toFixed(1)), // rough estimate
          complexity_features: {
            thin_wall: false, internal_channels: false, text_or_logo: false,
            high_support: true, orientation_sensitive: false,
            tiny_features: false, tolerance_critical: false,
          },
          orientation_analysis: {
            stability_score: 0.82, failure_risk: 0.15,
            tall_geometry: false, warp_risk: false,
          },
        };

        const res = await fetch(`${API}/pricing/quick-calculate`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        console.log("📦 API response:", JSON.stringify(data, null, 2));

        const finalPrice = data.final_price || 0;
        const delivery   = data.delivery_fee ?? data.delivery_charges ?? 0;
        const withGst    = finalPrice - delivery;
        const base       = parseFloat((withGst / (1 + GST_RATE)).toFixed(2));
        const gst        = parseFloat((withGst - base).toFixed(2));

        setPriceData({ final_price: finalPrice, base_price: base, gst_amount: gst, delivery_charges: delivery });

        setPrice({
          pricePerUnit: Math.round(finalPrice / (quantity || 1)),
          subtotal:     base,
          deliveryFee:  delivery,
          total:        finalPrice,
          currency:     "₹",
          calculatedAt: new Date().toISOString(),
        });

      } catch (e: any) {
        console.error("Pricing error:", e);
        setError("Live price unavailable — estimate dikha raha hai.");

        const base     = parseFloat((currentVolumes.effective * 8 * (quantity || 1)).toFixed(2));
        const gst      = parseFloat((base * GST_RATE).toFixed(2));
        const delivery = base > 999 ? 0 : 79;
        setPriceData({
          final_price:      parseFloat((base + gst + delivery).toFixed(2)),
          base_price:       base,
          gst_amount:       gst,
          delivery_charges: delivery,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, [volumes, material?.gradeLabel, quantity, infillPercent, setPrice]);

  const isCalculating  = parsing || loading;
  const finalPrice      = priceData?.final_price      ?? 0;
  const basePrice       = priceData?.base_price       ?? 0;
  const gstAmount       = priceData?.gst_amount       ?? 0;
  const deliveryCharges = priceData?.delivery_charges ?? 0;
  const pricePerUnit    = (quantity > 1)
    ? Math.round(finalPrice / quantity)
    : finalPrice;

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="text-center mb-10"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Instant Quote
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
              {isCalculating ? "Calculating..." : "Your Price"}
            </h1>
            <p className="text-text-secondary text-lg">
              Includes material, infill, support &amp; GST
            </p>
            {error && (
              <p className="text-yellow-400 text-sm mt-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2 inline-block">
                ⚠ {error}
              </p>
            )}
          </motion.div>

          {/* Loading state */}
          {isCalculating && (
            <div className="flex flex-col items-center gap-4 py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full"
              />
              <p className="text-text-muted text-sm">
                {parsing
                  ? "3D model ka volume calculate ho raha hai..."
                  : `${material?.gradeLabel || "material"} ka price fetch ho raha hai...`}
              </p>
            </div>
          )}

          {/* Result */}
          {!isCalculating && priceData && volumes && (
            <PricingResult
              modelName     = {model?.fileName || "your-model.stl"}
              material      = {material?.familyLabel || "Plastic"}
              materialGrade = {material?.gradeLabel   || "PLA"}
              useCase       = {useCase || "General Use"}
              quantity      = {quantity || 1}
              currency      = "₹"

              pricePerUnit    = {pricePerUnit}
              totalPrice      = {finalPrice}
              basePrice       = {basePrice}
              gstAmount       = {gstAmount}
              gstRate         = {GST_RATE}
              deliveryCharges = {deliveryCharges}

              modelVolumeCc     = {volumes.model}
              supportVolumeCc   = {volumes.support}
              effectiveVolumeCc = {volumes.effective}

              valuePoints = {[
                `Model volume: ${volumes.model.toFixed(2)} cc`,
                `Infill: ${infillPercent || 20}% density applied`,
                "Support volume calculated (18%)",
                deliveryCharges === 0
                  ? "🎉 Free delivery!"
                  : `Delivery: ₹${deliveryCharges}`,
              ]}
              warnings = {
                volumes.model === FALLBACK_VOL_CC && !storedVolumeCc
                  ? ["File session mein nahi hai — volume estimate use kiya. Re-upload karo for exact price."]
                  : []
              }

              onChangeMaterial = {() => router.push("/material")}
              onChangeQuantity = {() => router.push("/environment")}
              onContinue       = {() => router.push("/checkout")}
              file             = {file}
            />
          )}

        </Container>
      </main>
    </>
  );
}
