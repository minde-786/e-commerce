"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

// Define a Product type
interface Product {
  _id: string
  title: string
  description?: string
  price: number
  imageUrl?: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
  }, [])

  const addToCart = (p: Product) => {
    const newCart = [...cart, p]
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  return (
    <div className="p-6 text-amber-50 ">
      <h1 className="text-2xl font-bold mb-4 px-4 shadow-2xl">Foodiya</h1>

      <div className="grid grid-cols-2 gap-8 mt-6 bg-slate-900 m-2 shadow-2xl p-4 rounded border border-slate-950 ">
        {products.length === 0 ? (
          <p className="text-center text-2xl">Loading.....</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="border-slate-950 bg-slate-800 p-4 rounded shadow-lg hover:shadow-slate-400 hover:animate-none ">
              <h2 className="font-bold">{p.title}</h2>
              <p>{p.description}</p>
              <p>Rs. {p.price}</p>
              {p.imageUrl && (
                <img src={p.imageUrl} alt={p.title} className="w-100 rounded items-center mx-4 h-32 object-cover" />
              )}
              <button
                onClick={() => addToCart(p)}
                className="bg-green-500 text-white px-2 py-1 mt-4 rounded "
              >
                Add to Cart
              </button>
              <Link href={`/product/${p._id}`} className="lg:ml-14 text-blue-600 underline mt-4">
                View
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="mt-8 text-center py-4">
        <Link href="/cart" className="bg-blue-500 text-white px-3 py-2 rounded">
          Cart ({cart.length})
        </Link>
      </div>
    </div>
  )
}
