import type { Customer } from "./customer.ts";

export interface Order {
  id: number;
  totalPrice: number;
  createdAt: Date;
  estimatedDelivery: Date;
  customer: Customer;
}
