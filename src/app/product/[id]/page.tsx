"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"


interface Review {
  name: string
  rating: number
  comment: string
  id?: string 
}

export default function ProductDetail() {
  const { id } = useParams()
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  useEffect(() => {
    fetch(`/api/reviews?productId=${id}`)
      .then(res => res.json())
      .then((data: Review[]) => setReviews(data))
  }, [id])

  const submitReview = async () => {
    if (!name || !comment) {
      alert("Please fill in your name and comment")
      return
    }

    const newReview: Review = { name, rating, comment }

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, ...newReview }),
    })

    alert("Review submitted")

    // Optionally, update UI immediately
    setReviews(prev => [...prev, newReview])
    setName("")
    setRating(5)
    setComment("")
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Product Detail</h1>

      {/* Review Form */}
      <input
        placeholder="Your Name"
        className="border p-2 block my-2"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <select
        className="border p-2 block my-2"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map(r => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Your Review"
        className="border p-2 block my-2"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button
        onClick={submitReview}
        className="bg-blue-500 text-white px-3 py-2 rounded"
      >
        Submit
      </button>

      {/* Show Reviews */}
      <h2 className="mt-4 font-bold">Reviews:</h2>
      {reviews.length === 0 ? (
        <p>No reviews</p>
      ) : (
        reviews.map((r, i) => (
          <div key={i} className="border p-2 my-2 rounded">
            <p className="font-bold">
              {r.name} ({r.rating}⭐)
            </p>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  )
}
