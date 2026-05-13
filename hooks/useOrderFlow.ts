"use client";

import { useRouter } from "next/navigation";
import {
  useOrderStore,
  selectIsReadyForPricing,
  selectIsReadyForCheckout,
} from "@/store";
import type { MaterialSelection, PriceBreakdown } from "@/store";

export function useOrderFlow() {
  const router = useRouter();
  const store = useOrderStore();
  const readyForPricing = useOrderStore(selectIsReadyForPricing);
  const readyForCheckout = useOrderStore(selectIsReadyForCheckout);

  const goToUpload   = () => router.push("/upload");
  const goToCategory = () => router.push("/category");
  const goToMaterial = () => router.push("/material");
  const goToUseCase  = () => router.push("/use-case");
  const goToEnv      = () => router.push("/environment");
  const goToPricing  = () => router.push("/pricing");
  const goToCheckout = () => router.push("/checkout");

  const handleUploadComplete = (file: File) => { store.setFile(file); goToCategory(); };
  const handleReupload       = () => { store.clearFile(); goToUpload(); };
  const handleModelConfirmed = (dims: { x: number; y: number; z: number }) => {
    store.setModelData({ dimensions: dims }); goToCategory();
  };
  const handleSegmentSelect  = (id: string) => { store.setSegment(id); goToMaterial(); };
  const handleMaterialSelect = (m: MaterialSelection) => { store.setMaterial(m); goToUseCase(); };
  const handleUseCaseSelect  = (id: string) => { store.setUseCase(id); goToEnv(); };
  const handleEnvQtySelect   = (envs: string[], qty: string) => {
    store.setEnvironments(envs);
    store.setQuantity(parseInt(qty.split("-")[0]) || 1);
    goToPricing();
  };
  const handlePriceCalculated = (price: PriceBreakdown) => { store.setPrice(price); };
  const handleOrderPlaced     = (orderId: string) => { store.setOrderId(orderId); };
  const restartFlow           = () => { store.reset(); goToUpload(); };

  return {
    ...store,
    readyForPricing,
    readyForCheckout,
    handleUploadComplete,
    handleReupload,
    handleModelConfirmed,
    handleSegmentSelect,
    handleMaterialSelect,
    handleUseCaseSelect,
    handleEnvQtySelect,
    handlePriceCalculated,
    handleOrderPlaced,
    restartFlow,
    goToUpload, goToCategory, goToMaterial,
    goToUseCase, goToEnv, goToPricing, goToCheckout,
  };
}
