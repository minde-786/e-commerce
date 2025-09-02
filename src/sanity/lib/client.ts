import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "koy1migf",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-08-30",
  useCdn: true, // sirf read ke liye fast cache
});

// Agar data write (order create) karna hai:
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "koy1migf",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-08-30",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, 
});
