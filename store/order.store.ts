import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ModelData {
  fileName: string;
  fileSize: number;
  fileType: "stl" | "obj" | "step";
  dimensions: { x: number; y: number; z: number } | null;
  volumeCc: number | null;
  objectUrl: string | null;
  uploadedAt: string;
}

export interface MaterialSelection {
  familyId: string;
  familyLabel: string;
  gradeId: string;
  gradeLabel: string;
}

/**
 * 🔥 UPDATED: Backend-aligned pricing model
 */
export interface PriceBreakdown {
  pricePerUnit: number;

  subtotal: number;
  deliveryFee: number;
  total: number;

  currency: string;
  calculatedAt: string;

  // ✅ BACKEND V2 FIELDS
  final_price?: number;

  material_cc?: number;
  material_grams?: number;

  price_range_min?: number;
  price_range_max?: number;

  is_estimated?: boolean;
  confidence_level?: "approximate";
  tooltip?: string;
}

export interface OrderState {
  currentStep: number;

  file: File | null;
  model: ModelData | null;

  segment: string | null;
  material: MaterialSelection | null;
  useCase: string | null;

  environments: string[];

  quantity: number;
  infillPercent: number | null;

  price: PriceBreakdown | null;

  orderId: string | null;
  orderPlacedAt: string | null;
}

interface OrderActions {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setFile: (file: File) => void;
  setModelData: (data: Partial<ModelData>) => void;
  clearFile: () => void;

  setSegment: (segment: string) => void;
  setMaterial: (material: MaterialSelection) => void;
  setUseCase: (useCase: string) => void;

  setEnvironments: (envs: string[]) => void;
  setQuantity: (qty: number) => void;
  setInfillPercent: (pct: number | null) => void;

  setPrice: (price: PriceBreakdown) => void;

  setOrderId: (id: string) => void;

  reset: () => void;

  toOrderPayload: () => OrderPayload | null;
}

export interface OrderPayload {
  model: ModelData;
  segment: string;
  material: MaterialSelection;
  useCase: string;
  environments: string[];
  quantity: number;
  infillPercent: number | null;
  price: PriceBreakdown;
}

const INITIAL: OrderState = {
  currentStep: 0,

  file: null,
  model: null,

  segment: null,
  material: null,
  useCase: null,

  environments: [],

  quantity: 1,
  infillPercent: null,

  price: null,

  orderId: null,
  orderPlacedAt: null,
};

export const useOrderStore = create<OrderState & OrderActions>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...INITIAL,

        setStep: (step) =>
          set((s) => {
            s.currentStep = step;
          }, false, "setStep"),

        nextStep: () =>
          set((s) => {
            s.currentStep += 1;
          }, false, "nextStep"),

        prevStep: () =>
          set((s) => {
            if (s.currentStep > 0) s.currentStep -= 1;
          }, false, "prevStep"),

        setFile: (file) =>
          set((s) => {
            s.file = file;
            s.model = {
              fileName: file.name,
              fileSize: file.size,
              fileType: getFileType(file.name),
              dimensions: null,
              volumeCc: null,
              objectUrl: URL.createObjectURL(file),
              uploadedAt: new Date().toISOString(),
            };
          }, false, "setFile"),

        setModelData: (data) =>
          set((s) => {
            if (!s.model) return;
            Object.assign(s.model, data);
          }, false, "setModelData"),

        clearFile: () =>
          set((s) => {
            if (s.model?.objectUrl) URL.revokeObjectURL(s.model.objectUrl);
            s.file = null;
            s.model = null;
          }, false, "clearFile"),

        setSegment: (segment) =>
          set((s) => {
            s.segment = segment;
          }, false, "setSegment"),

        setMaterial: (material) =>
          set((s) => {
            s.material = material;
          }, false, "setMaterial"),

        setUseCase: (useCase) =>
          set((s) => {
            s.useCase = useCase;
          }, false, "setUseCase"),

        setEnvironments: (envs) =>
          set((s) => {
            s.environments = envs;
          }, false, "setEnvironments"),

        setQuantity: (qty) =>
          set((s) => {
            s.quantity = qty;
          }, false, "setQuantity"),

        setInfillPercent: (pct) =>
          set((s) => {
            s.infillPercent = pct;
          }, false, "setInfillPercent"),

        /**
         * 🔥 KEY FIX:
         * backend is now single source of truth
         */
        setPrice: (price) =>
          set((s) => {
            s.price = {
              ...price,
              total: price.final_price ?? price.total,
            };
          }, false, "setPrice"),

        setOrderId: (id) =>
          set((s) => {
            s.orderId = id;
            s.orderPlacedAt = new Date().toISOString();
          }, false, "setOrderId"),

        reset: () =>
          set((s) => {
            if (s.model?.objectUrl) URL.revokeObjectURL(s.model.objectUrl);
            return { ...INITIAL };
          }, false, "reset"),

        toOrderPayload: () => {
          const {
            model,
            segment,
            material,
            useCase,
            environments,
            quantity,
            infillPercent,
            price,
          } = get();

          if (!model || !segment || !material || !useCase || !price)
            return null;

          return {
            model,
            segment,
            material,
            useCase,
            environments,
            quantity,
            infillPercent,
            price: {
              ...price,
              total: price.final_price ?? price.total,
            },
          };
        },
      })),
      {
        name: "trid-order",
        partialize: (s) => ({
          currentStep: s.currentStep,
          model: s.model
            ? { ...s.model, objectUrl: null }
            : null,
          segment: s.segment,
          material: s.material,
          useCase: s.useCase,
          environments: s.environments,
          quantity: s.quantity,
          infillPercent: s.infillPercent,
          price: s.price,
          orderId: s.orderId,
          orderPlacedAt: s.orderPlacedAt,
        }),
      }
    ),
    { name: "TRID Order Store" }
  )
);

/* ───────────────────────── helpers ───────────────────────── */

export const selectIsReadyForPricing = (s: OrderState) =>
  !!(s.model && s.segment && s.material && s.useCase && s.quantity > 0);

export const selectIsReadyForCheckout = (s: OrderState) =>
  selectIsReadyForPricing(s) && !!s.price;

export const selectProgress = (s: OrderState) => {
  const steps = [
    !!s.model,
    !!s.segment,
    !!s.material,
    !!s.useCase,
    s.environments.length > 0,
    !!s.price,
  ];
  return Math.round(
    (steps.filter(Boolean).length / steps.length) * 100
  );
};

function getFileType(name: string): ModelData["fileType"] {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "obj") return "obj";
  if (ext === "step" || ext === "stp") return "step";
  return "stl";
}
