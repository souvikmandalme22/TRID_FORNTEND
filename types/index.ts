export type Maybe<T> = T | null | undefined;

export type Status =
  | "idle"
  | "loading"
  | "success"
  | "error";

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

/* ─── Domain Types ─────────────────────────────────── */

export type ManufacturingProcess =
  | "cnc"
  | "3d_printing"
  | "injection_molding"
  | "sheet_metal"
  | "casting";

export type OrderStatus =
  | "draft"
  | "quote_requested"
  | "quoted"
  | "confirmed"
  | "in_production"
  | "quality_check"
  | "shipped"
  | "delivered";

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatar?: string;
  createdAt: string;
}

export interface Quote {
  id: string;
  processType: ManufacturingProcess;
  quantity: number;
  material: string;
  leadTimeDays: number;
  priceUSD: number;
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
}

export interface Order {
  id: string;
  quoteId: string;
  status: OrderStatus;
  processType: ManufacturingProcess;
  quantity: number;
  material: string;
  priceUSD: number;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
}
