import { TService, TServiceProvider } from "./service";

export type TOrder = {
  id: string;
  serviceId: string;
  userId: string;
  fullName: string;
  phone: string;
  providerId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | string;
  price: number;
  quantity: number;
  scheduledDate: string;
  scheduledTime: string;
  createdAt: string;
  updatedAt: string;
  service: TService;
  provider: TServiceProvider;
};
