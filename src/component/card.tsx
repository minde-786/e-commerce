"use client"
import { useState } from "react"

type Product = {
  _id: string
  title: string
  price: number
  image: string
}

export default function Cart({ cart = [] }: { cart?: Product[] }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = async () => {
    if (!name || !email) {
      alert("Please enter name and email")
      return
    }

    const order = { name, email, items: cart, total }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })

    const data = await res.json()
    if (data.success) {
      alert("✅ Order placed! ID: " + data.orderId)
    } else {
      alert("❌ Error: " + data.error)
    }
  }

  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="mb-2">
            {cart.map((item, i) => (
              <li key={i}>
                {item.title} - Rs {item.price}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: Rs {total}</p>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Name"
              className="border p-1 flex-1"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-1 flex-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-3 py-1 rounded mt-3 w-full"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  )
}
