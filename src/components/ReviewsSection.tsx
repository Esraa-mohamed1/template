import React, { useState } from "react";
import { Star, Pencil } from "lucide-react";
import { Review } from "../types/api";
import { reviewService, AuthRequiredError } from "../services/productService";

const EMOJIS = ["😍", "😊", "😐", "😕", "😡"];

interface Props {
  productId: number;
  reviews: Review[];
  currentUserId?: number;
  onReviewSaved?: () => void;
  onLoginRequired?: () => void;
}

export const ReviewsSection = ({
  productId,
  reviews,
  currentUserId,
  onReviewSaved,
  onLoginRequired,
}: Props) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [emoji, setEmoji] = useState<string>("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const startEdit = (r: Review) => {
    setEditId(r.id);
    setRating(r.rating);
    setEmoji(r.emoji ?? "");
    setComment(r.comment);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!currentUserId) {
      setShowLoginAlert(true);
      return;
    }

    if (!rating || !comment.trim()) return;
    setLoading(true);
    try {
      if (editId) {
        await reviewService.update(editId, { rating, comment, emoji });
      } else {
        await reviewService.create(productId, { rating, comment, emoji });
      }
      setRating(0);
      setComment("");
      setEmoji("");
      setEditId(null);
      onReviewSaved?.();
    } catch (err) {
      if (err instanceof AuthRequiredError) {
        setShowLoginAlert(true);
        return;
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="mt-12 space-y-6">
      {/* Login Alert */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <Star size={28} className="text-brand-blue" fill="#378ADD" />
            </div>
            <h3 className="text-xl font-bold">Login Required</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              You need to be logged in to write a review.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLoginAlert(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginAlert(false);
                  onLoginRequired?.();
                }}
                className="flex-1 py-3 rounded-2xl bg-brand-blue text-white text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold">{avgRating.toFixed(1)}</span>
          <div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i <= Math.round(avgRating) ? "#F59E0B" : "none"}
                  className={
                    i <= Math.round(avgRating)
                      ? "text-amber-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">{reviews.length} reviews</p>
          </div>
        </div>
      </div>

      {/* List */}
      {reviews.map((r) => (
        <div
          key={r.id}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-sm">
                {r.user ? initials(r.user.name) : "G"}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {r.user?.name ?? r.guest_name ?? "Guest"}{" "}
                  {r.emoji && <span>{r.emoji}</span>}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i <= r.rating ? "#F59E0B" : "none"}
                      className={
                        i <= r.rating ? "text-amber-400" : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Edit button — يظهر بس لو صاحب التعليق */}
            {currentUserId && r.user_id === currentUserId && (
              <button
                onClick={() => startEdit(r)}
                className="p-2 rounded-xl text-gray-300 hover:text-brand-blue hover:bg-blue-50 transition-all"
                title="Edit review"
              >
                <Pencil size={15} />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            {r.comment}
          </p>
        </div>
      ))}

      {/* Add/Edit Form */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          {editId ? (
            <>
              <Pencil size={16} className="text-brand-blue" />
              Edit your review
            </>
          ) : (
            "Write a review"
          )}
        </h3>

        {/* Star picker */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={28}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              fill={i <= (hovered || rating) ? "#F59E0B" : "none"}
              className={`cursor-pointer transition-colors ${
                i <= (hovered || rating) ? "text-amber-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Emoji picker */}
        <div className="flex gap-2 flex-wrap">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(emoji === e ? "" : e)}
              className={`w-11 h-11 rounded-2xl border text-xl transition-all hover:scale-110 ${
                emoji === e
                  ? "border-brand-blue bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          maxLength={500}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none min-h-[90px] focus:outline-none focus:border-brand-blue bg-white"
        />
        <p className="text-xs text-gray-400 text-right">{comment.length}/500</p>

        <button
          onClick={handleSubmit}
          disabled={
            ((!rating || !comment.trim()) && !!currentUserId) || loading
          }
          className="w-full bg-brand-blue text-white font-bold py-3 rounded-2xl disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          {loading ? "Saving..." : editId ? "Update Review" : "Submit Review"}
        </button>

        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setRating(0);
              setComment("");
              setEmoji("");
            }}
            className="w-full text-sm text-gray-400 hover:text-gray-600"
          >
            Cancel edit
          </button>
        )}
      </div>
    </div>
  );
};
