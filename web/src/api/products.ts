import type { Product } from "../types";

// Hämtar alla produkter från API:t (GET)
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("/v1/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

// Skickar en ny produkt till API:t (POST)
// Omit<Product, "id"> = samma typ som Product, men utan id
// (id skapas av databasen, inte av frontend)
export async function addProduct(newProduct: Omit<Product, "id">) {
  const res = await fetch("/v1/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  if (!res.ok) {
    throw new Error("Failed to add product");
  }
  return res.json();
}

export async function removeProduct(productId: number) {
  const res = await fetch("/v1/products/" + productId, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to remove product");
  }
}

export async function editProduct({
  productId,
  data,
}: {
  productId: number;
  data: Omit<Product, "id">;
}) {
  const res = await fetch("/v1/products/" + productId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to edit product");
  }
  const result = await res.json();
  console.log(result);
  return result;
}
