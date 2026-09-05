import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import computer from "./routes/computers.ts";
import items from "./routes/items.ts";

const backendApp = new Hono();

backendApp.use(logger())
backendApp.get("/api", (c) => c.json("Hello World"));

backendApp.route("/api/v1/computers", computer);
backendApp.route("/api/v1/items", items);

serve(backendApp);