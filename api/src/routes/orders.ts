import { Hono } from "hono";
import { db } from "../../prisma/db.ts";

const orders = new Hono();

orders.get("/:id", async (c) => {
  const orderId = Number(c.req.param().id);
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      customer: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order) {
    return c.json("Not found", 404);
  }
  return c.json(order, 200);
});

export default orders;
