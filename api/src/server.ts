import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import products from "./routes/products.ts";

const app = new Hono();
let count: number = 0;

// MIDDLEWARES
app.use(logger());
app.use((_, next) => {
  count++;
  return next();
});

// ENDPOINTS
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/countReq", (c) => {
  return c.json(`Du är besökare: ${count}`);
});

// ROUTES
app.route("/v1/products", products);
// app.route("/v1/customers", customers);

// -- SIMPELT ATT UPPDATERA APIET --
// app.route("/v2/posts", postsV2);

// BOOT SERVER
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
