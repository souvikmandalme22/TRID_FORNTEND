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

const DEFAULT_MODEL_VOLUME_CC   = 35;
const DEFAULT_SUPPORT_VOLUME_CC = 6.3;

export default function PricingPage() {
  const router = useRouter();

  const model         = useOrderStore((s) => s.model);
  const material      = useOrderStore((s) => s.material);
  const useCase       = useOrderStore((s) => s.useCase);
  const quantity      = useOrderStore((s) => s.quantity);
  const infillPercent = useOrderStore((s) => s.infillPercent);
  const setPrice      = useOrderStore((s) => s.setPrice);
  const file          = useOrderStore((s) => s.file);

  const [priceData, setPriceData] = useState<any>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  const modelVolumeCc   = DEFAULT_MODEL_VOLUME_CC;
  const supportVolumeCc = DEFAULT_SUPPORT_VOLUME_CC;
  const infillFactor    = (infillPercent || 20) / 100;
  const shellOverhead   = 0.15;
  const effectiveModel  = modelVolumeCc * (shellOverhead + (1 - shellOverhead) * infillFactor);
  const effectiveCc     = parseFloat((effectiveModel + supportVolumeCc).toFixed(2));

  useEffect(() => {
    async function fetchPrice() {
      try {
        const payload = {
          material_slug:
            material?.gradeLabel?.toLowerCase().replace(/ /g, "-") || "pla",
          quantity:                    quantity || 1,
          delivery_tier:               "standard",
          model_volume_cc:             modelVolumeCc,
          support_volume_cc:           supportVolumeCc,
          infill_percent:              infillPercent || 20,
          layer_height:                0.2,
          estimated_print_time_hours:  4.5,
          complexity_features: {
            thin_wall: false, internal_channels: false,
            text_or_logo: false, high_support: true,
            orientation_sensitive: false, tiny_features: false,
            tolerance_critical: false,
          },
          orientation_analysis: {
            stability_score: 0.82, failure_risk: 0.15,
            tall_geometry: false, warp_risk: false,
          },
        };

        const res = await fetch(`${API}/pricing/quick-calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setPriceData(data);

        setPrice({
          pricePerUnit: Math.round(data.final_price / (quantity || 1)),
          subtotal:     data.base_display_price || 0,
          deliveryFee:  data.delivery_charges   || 0,
          total:        data.final_price        || 0,
          currency:     "₹",
          calculatedAt: new Date().toISOString(),
        });

      } catch (e) {
        console.error(e);
        setError("Live price unavailable — showing estimate.");
        const base     = parseFloat((effectiveCc * 8 * (quantity || 1)).toFixed(2));
        const gst      = parseFloat((base * 0.18).toFixed(2));
        const delivery = base > 999 ? 0 : 79;
        setPriceData({
          final_price:        base + gst + delivery,
          base_display_price: base,
          gst_amount:         gst,
          delivery_charges:   delivery,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, []);

  const finalPrice      = priceData?.final_price        || 0;
  const basePrice       = priceData?.base_display_price || 0;
  const gstAmount       = priceData?.gst_amount         || 0;
  const deliveryCharges = priceData?.delivery_charges   || 0;
  const pricePerUnit    = quantity ? Math.round(finalPrice / quantity) : finalPrice;

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
              Includes material, infill, support &amp; GST
            </p>
            {error && (
              <p className="text-yellow-400 text-sm mt-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2 inline-block">
                ⚠ {error}
              </p>
            )}
          </motion.div>

          {loading && (
            <div className="flex flex-col items-center gap-4 py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full"
              />
              <p className="text-text-muted text-sm">
                Calculating price for {material?.gradeLabel || "your material"}...
              </p>
            </div>
          )}

          {!loading && priceData && (
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
              gstRate         = {0.18}
              deliveryCharges = {deliveryCharges}
              modelVolumeCc     = {modelVolumeCc}
              supportVolumeCc   = {supportVolumeCc}
              effectiveVolumeCc = {effectiveCc}
              valuePoints = {[
                `Infill: ${infillPercent || 20}% applied`,
                "Support volume included in calculation",
                "18% GST included in total",
                deliveryCharges === 0
                  ? "Free delivery on this order 🎉"
                  : `Delivery charge: ₹${deliveryCharges}`,
              ]}
              warnings          = {[]}
              onChangeMaterial  = {() => router.push("/material")}
              onChangeQuantity  = {() => router.push("/environment")}
              onContinue        = {() => router.push("/checkout")}
              file              = {file}
            />
          )}

        </Container>
      </main>
    </>
  );
}
