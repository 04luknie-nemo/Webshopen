import { Hono } from "hono";

const computer = new Hono();

computer.get("/:id", (c) => c.json("GET_COMPUTERS"));
computer.get("/", (c) => c.json("GET_ALL_COMPUTERS"));
computer.post("/", (c) => c.json("POST_COMPUTERS"));
computer.put("/:id", (c) => c.json("PUT_COMPUTERS"));
computer.delete("/:id", (c) => c.json("DELETE_COMPUTERS"));

export default computer;