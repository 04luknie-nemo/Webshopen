import type { Customer } from "./customer.ts";

export interface Order {
  id: number;
  orderNumber: string;
  totalPrice: number;
  createdAt: Date;
  estimatedDelivery: Date;
  customer: Customer;
}
