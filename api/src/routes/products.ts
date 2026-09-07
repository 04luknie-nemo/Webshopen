import { Hono } from "hono";
import { db } from "../../prisma/db.ts";

const products = new Hono();

products.get("/", async (c) => {
  const products = await db.product.findMany();
  return c.json(products);
});

products.get("/:id", async (c) => {
  const id = Number(c.req.param().id);

  const existingProduct = await db.product.findUnique({ where: { id } });
  if (!existingProduct) return c.json("Resource does not exist", 404);

  return c.json(existingProduct);
});

products.post("/", async (c) => {
  const data = await c.req.json();
  const product = await db.product.create({ data: data });
  return c.json(product);
});

products.put("/:id", (c) => {
  return c.json("UPDATE ONE");
});

products.delete("/:id", async (c) => {
  const id = Number(c.req.param().id);

  const exists = await db.product.findUnique({ where: { id } });
  if (!exists) return c.json("Resource does not exist", 404);

  await db.product.delete({ where: { id: id } });
  return c.json("Deleted");
});

export default products;
