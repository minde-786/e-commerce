import { NextResponse } from "next/server"
import { client } from "./../../../sanity/lib/client"

export async function GET() {
  try {
    const products = await client.fetch(`*[_type == "product"]{
      _id,
      title,
      description,
      price,
      "imageUrl": image.asset->url
    }`)

    return NextResponse.json(products)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
