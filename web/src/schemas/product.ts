import { z } from "zod";

export const ProductSchema = z.object({
  title: z
    .string({ error: "Titeln måste vara en sträng" })
    .min(4, { error: "Titeln får inte vara kortare än 4 tecken" })
    .max(15, { error: "Titeln får inte vara längre än 30 tecken" }),
  description: z
    .string({ error: "Beskrivningen måste vara en sträng" })
    .min(10, { error: "Beskrivningen får inte vara kortare än 10 tecken" })
    .max(100, { error: "Beskrivningen får inte vara längre än 100 tecken" }),
  price: z.coerce
    .number({ error: "Priset måste vara ett tal" })
    .positive({ error: "Priset måste vara ett positivt tal" }),
  imageUrl: z
    .string({ error: "Bild url:en måste vara en sträng" })
    .startsWith("http://", { error: "Bild url:en måste starta med: http://" }),
  stock: z.coerce
    .number({ error: "Stock måste vara ett tal" })
    .positive({ error: "Stock måste vara ett positivt tal" }),
});

export type ProductInput = z.input<typeof ProductSchema>;
export type ProductOutput = z.output<typeof ProductSchema>;
