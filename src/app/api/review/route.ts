import { client, writeClient } from "@/sanity/lib/client"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get("productId")
  const reviews = await client.fetch(
    `*[_type == "review" && product._ref == $productId] | order(createdAt desc)`,
    { productId }
  )
  return Response.json(reviews)
}

export async function POST(req: Request) {
  const { productId, name, rating, comment } = await req.json()
  const review = await writeClient.create({
    _type: "review",
    product: { _type: "reference", _ref: productId },
    name, rating, comment,
    createdAt: new Date().toISOString(),
  })
  return Response.json(review)
}
