"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Layers,
  Package,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

// =====================================================
// TYPES
// =====================================================

interface PricingResultProps {
  modelName: string;
  material: string;
  materialGrade: string;
  useCase: string;
  quantity: number;
  currency: string;
  pricePerUnit: number;
  totalPrice: number;
  basePrice: number;
  platformFee: number;
  packagingFee: number;
  gstAmount: number;
  gstRate: number;
  deliveryCharges: number;
  modelVolumeCc: number;
  supportVolumeCc: number;
  effectiveVolumeCc: number;
  estimatedPrintTimeHrs?: number;
  valuePoints: string[];
  warnings: string[];
  onChangeMaterial: () => void;
  onChangeQuantity: () => void;
  onContinue: () => void;
  file: File | null;
}

// =====================================================
// HELPERS
// =====================================================

function fmt(n: number, currency = "₹") {
  return `${currency}${n.toLocaleString("en-IN")}`;
}

function fmtVol(cc: number) {
  return `${cc.toFixed(2)} cc`;
}

// =====================================================
// COMPONENT
// =====================================================

export default function PricingResult({
  modelName,
  material,
  materialGrade,
  useCase,
  quantity,
  currency,
  pricePerUnit,
  totalPrice,
  basePrice,
  platformFee,
  packagingFee,
  gstAmount,
  gstRate,
  deliveryCharges,
  modelVolumeCc,
  supportVolumeCc,
  effectiveVolumeCc,
  estimatedPrintTimeHrs,
  valuePoints,
  warnings,
  onChangeMaterial,
  onChangeQuantity,
  onContinue,
}: PricingResultProps) {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-4">

      {/* ── PRICE CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-blue-500/20 bg-[#0d1424] p-6"
      >
        {/* Model name */}
        <p className="text-xs text-gray-500 mb-1 font-mono truncate">{modelName}</p>

        {/* Total price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-5xl font-bold text-white tracking-tight">
              {fmt(totalPrice, currency)}
            </p>
            {quantity > 1 && (
              <p className="text-sm text-gray-400 mt-1">
                {fmt(pricePerUnit, currency)} × {quantity} units
              </p>
            )}
          </div>

          <div className="text-right text-sm text-gray-400 space-y-0.5">
            <p>{materialGrade} <span className="text-gray-600">·</span> {material}</p>
            <p className="capitalize">{useCase}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-white/5" />

        {/* Cost breakdown */}
        <div className="space-y-2 text-sm">
          <BreakdownRow label="Base material cost" value={fmt(basePrice, currency)} />
          <BreakdownRow label="Platform fee" value={fmt(platformFee, currency)} />
          <BreakdownRow label="Packaging" value={fmt(packagingFee, currency)} />
          <BreakdownRow
            label={`GST (${(gstRate * 100).toFixed(0)}%)`}
            value={fmt(gstAmount, currency)}
          />
          <BreakdownRow
            label="Delivery"
            value={deliveryCharges > 0 ? fmt(deliveryCharges, currency) : "Calculated at checkout"}
            dim={deliveryCharges === 0}
          />
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-white/5" />

        {/* Geometry */}
        <div className="grid grid-cols-3 gap-3">
          <GeoStat label="Model" value={fmtVol(modelVolumeCc)} icon={<Layers size={14} />} />
          <GeoStat label="Support" value={fmtVol(supportVolumeCc)} icon={<Package size={14} />} />
          <GeoStat label="Effective" value={fmtVol(effectiveVolumeCc)} icon={<Layers size={14} />} accent />
        </div>

        {estimatedPrintTimeHrs !== undefined && (
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <Clock size={12} />
            <span>Est. print time: <span className="text-gray-300">{estimatedPrintTimeHrs.toFixed(1)} hrs</span></span>
          </div>
        )}
      </motion.div>

      {/* ── WARNINGS ── */}
      {warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 space-y-1"
        >
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-yellow-300">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>{w}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── VALUE POINTS ── */}
      {valuePoints.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2"
        >
          {valuePoints.map((v, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle size={13} className="text-cyan-400 shrink-0" />
              <span>{v}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── ACTIONS ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <button
          onClick={onContinue}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all text-white font-semibold py-4 text-base"
        >
          Proceed to Checkout
          <ChevronRight size={18} />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onChangeMaterial}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-sm text-gray-400 hover:text-white py-3"
          >
            <RefreshCw size={13} />
            Change Material
          </button>
          <button
            onClick={onChangeQuantity}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-sm text-gray-400 hover:text-white py-3"
          >
            <RefreshCw size={13} />
            Change Quantity
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// =====================================================
// SUB-COMPONENTS
// =====================================================

function BreakdownRow({
  label,
  value,
  dim = false,
}: {
  label: string;
  value: string;
  dim?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={dim ? "text-gray-600 italic" : "text-gray-300"}>{value}</span>
    </div>
  );
}

function GeoStat({
  label,
  value,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-lg p-3 text-center ${accent ? "bg-blue-500/10 border border-blue-500/20" : "bg-white/[0.03] border border-white/5"}`}>
      <div className={`flex justify-center mb-1 ${accent ? "text-cyan-400" : "text-gray-600"}`}>{icon}</div>
      <p className={`text-xs font-mono font-medium ${accent ? "text-cyan-300" : "text-gray-300"}`}>{value}</p>
      <p className="text-[10px] text-gray-600 mt-0.5">{label}</p>
    </div>
  );
}
