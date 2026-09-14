import { z } from "zod";

export const CheckoutSchema = z.object({
  fullName: z
    .string({ error: "Full name is required" })
    .min(2, { error: "Full name must be at least 2 characters" })
    .max(50, { error: "Full name must be at most 50 characters" }),
  email: z
    .string({ error: "Email is required" })
    .email({ error: "Please enter a valid email address" }),
  phoneNumber: z
    .string({ error: "Phone number is required" })
    .min(7, { error: "Phone number must be at least 7 digits" })
    .regex(/^[0-9+\s-]+$/, {
      error: "Phone number can only contain numbers, spaces, and +",
    }),
  address: z
    .string({ error: "Address is required" })
    .min(4, { error: "Address must be at least 4 characters" })
    .max(100, { error: "Address must be at most 100 characters" }),
  zipCode: z
    .string({ error: "Zip code is required" })
    .min(5, { error: "Zip code must be at least 5 characters" })
    .max(10, { error: "Zip code must be at most 10 characters" }),
  city: z
    .string({ error: "City is required" })
    .min(2, { error: "City must be at least 2 characters" })
    .max(50, { error: "City must be at most 50 characters" }),
  country: z
    .string({ error: "Country is required" })
    .min(2, { error: "Country must be at least 2 characters" })
    .max(50, { error: "Country must be at most 50 characters" }),
});

export type CheckoutInput = z.input<typeof CheckoutSchema>;
export type CheckoutOutput = z.output<typeof CheckoutSchema>;
