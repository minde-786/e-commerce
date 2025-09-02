import { defineType } from "sanity";

export default defineType({
  name: "orderItem",
  title: "Order Item",
  type: "document",
  fields: [
    { name: "order", type: "reference", to: [{ type: "order" }] },
    { name: "product", type: "reference", to: [{ type: "product" }] },
    { name: "quantity", type: "number" },
    { name: "price", type: "number" },
  ],
});
