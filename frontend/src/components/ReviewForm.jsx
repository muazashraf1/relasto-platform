import React, { useState } from "react";

export default function ReviewForm({ agentId, onSubmit, isLoading, onCancel, initialReview = null }) {
  const [rating, setRating] = useState(initialReview?.rating || 5);
  const [comment, setComment] = useState(initialReview?.comment || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    try {
      await onSubmit({ rating, comment });
      setRating(5);
      setComment("");
    } catch (err) {
      setError(err.error || err.message || "Failed to submit review");
    }
  };

  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        {initialReview ? "Edit Your Review" : "Write a Review"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Stars */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-4xl transition ${
                  star <= rating ? "text-orange-500" : "text-slate-300"
                } hover:text-orange-400`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {rating} out of 5 stars
          </p>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-semibold text-slate-900 mb-3">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this agent..."
            rows="5"
            className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
          <p className="mt-2 text-xs text-slate-500">
            {comment.length} / 500 characters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : initialReview ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
