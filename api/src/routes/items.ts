import { Hono } from "hono";
import { db } from "../../prisma/db.ts";

const items = new Hono();

items.get("/", async(c) => {
    const items = await db.item.findMany();
    return c.json(items, 200);
})

items.post("/", async (c) => {
    const item = await c.req.json();
    await db.item.create({data: item});
    return c.json("Thanks for adding " + item.name, 200);
});

export default items;