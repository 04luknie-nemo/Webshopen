import { db } from "../prisma/db.ts";
import { seedProducts } from "./products.ts";

async function seed() {
  const existing = await db.product.count();

  if (existing > 0) {
    console.log("Produkter finns redan, hoppar över seed");
    return;
  }
  await db.product.createMany({ data: seedProducts });
  console.log(`${seedProducts.length} produkter tillagda.`);
}
seed();
