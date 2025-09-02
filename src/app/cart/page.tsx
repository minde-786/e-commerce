"use client"
import { useState, useEffect } from "react"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) setCart(JSON.parse(saved))
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = async () => {
    if (!name || !email || !phone) {
      setError("⚠️ Please fill all fields")
      return
    }
    if (cart.length === 0) {
      setError("⚠️ Your cart is empty")
      return
    }

    const order = { name, email, phone, items: cart, total }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
    const data = await res.json()
    alert("✅ Order placed! ID: " + data.orderId)

    localStorage.removeItem("cart")
    setCart([])
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10  text-gray-900">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-left text-amber-50">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          {/* Cart Items */}
          <ul className="flex-1 border rounded p-4 bg-white shadow-md space-y-3 max-h-[60vh] overflow-y-auto lg:mt-20">
            {cart.map((item, i) => (
              <li key={i} className="flex justify-between border-b pb-2 ">
                <span>{item.title}</span>
                <span className="font-semibold">Rs {item.price}</span>
              </li>
            ))}
          </ul>

          {/* Checkout Form */}
          <div className="flex-1 bg-white shadow-md rounded p-6">
            <p className="text-xl font-bold mb-4">Total: Rs {total}</p>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              {error && <p className="text-red-500">{error}</p>}

              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
