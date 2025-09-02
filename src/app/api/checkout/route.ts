import { writeClient } from "@/sanity/lib/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, items, total } = await req.json()

    const order = await writeClient.create({
      _type: "order",
      name, email, phone, address,
      items,
      total,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, orderId: order._id })
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 })
  }
}

