import { defineType } from "sanity"

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "items", title: "Items", type: "array", of: [{ type: "string" }] },
    { name: "total", title: "Total", type: "number" },
    { name: "createdAt", title: "Created At", type: "datetime" },
  ],
})
