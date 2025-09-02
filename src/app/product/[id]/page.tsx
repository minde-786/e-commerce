"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function ProductDetail() {
  const { id } = useParams()
  const [reviews, setReviews] = useState<any[]>([])
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  useEffect(() => {
    fetch(`/api/reviews?productId=${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [id])

  const submitReview = async () => {
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, name, rating, comment }),
    })
    alert("Review submitted")
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Product Detail</h1>

      {/* Review Form */}
      <input placeholder="Your Name" className="border p-2 block my-2" onChange={e => setName(e.target.value)} />
      <select className="border p-2 block my-2" onChange={e => setRating(Number(e.target.value))}>
        {[1,2,3,4,5].map(r => <option key={r}>{r}</option>)}
      </select>
      <textarea placeholder="Your Review" className="border p-2 block my-2" onChange={e => setComment(e.target.value)} />
      <button onClick={submitReview} className="bg-blue-500 text-white px-3 py-2 rounded">Submit</button>

      {/* Show Reviews */}
      <h2 className="mt-4 font-bold">Reviews:</h2>
      {reviews.length === 0 ? <p>No reviews</p> : reviews.map((r,i) => (
        <div key={i} className="border p-2 my-2 rounded">
          <p className="font-bold">{r.name} ({r.rating}⭐)</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  )
}
