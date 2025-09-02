import { NextResponse } from "next/server"
import { client } from ".//../../../sanity/lib/client"

export async function POST(req: Request) {
  const data = await req.json()
  
  const order = await client.create({
    _type: "order",
    customerName: data.name,
    customerEmail: data.email,
    total: data.total,
    items: data.items.map((item: any) => ({
      _type: "reference",
      _ref: item.id
    }))
  })

  return NextResponse.json({ success: true, order })
}
