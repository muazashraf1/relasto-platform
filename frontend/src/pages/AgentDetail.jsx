import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import ReviewForm from "../components/ReviewForm";
import { AuthContext } from "../context/AuthContext";
import { ReviewsContext } from "../context/ReviewsContext";
import { SingleAgentContext } from "../context/SingleAgentContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_HOST = API_BASE.replace(/\/api\/?$/, "");

function resolveImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return `${API_HOST}${url}`;
  return `${API_HOST}/${url}`;
}

const AgentDetail = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();


  const {
    reviews,
    averageRating,
    reviewCount,
    loading,
    reviewSubmitting,
    reviewError,

    fetchReviews,
    submitReview,
    removeReview,
    startEditReview,

    isEdit,
    editReviewId,

  } = useContext(ReviewsContext);

  console.log(reviews);
  

  const {
    agent,
    agentLoading,
    agentError,
    fetchSingleAgent,
  } = useContext(SingleAgentContext);


  const [properties, setProperties] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const initialReview = null
  const [rating, setRating] = useState(initialReview?.rating || 5);
  const [comment, setComment] = useState(initialReview?.comment || "");
  const { user } = useContext(AuthContext);



  const fetchProperties = async () => {
    try {
      const res = await api.get(`/properties/search/?agent_id=${id}`);
      setProperties(res.data.results || []);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchSingleAgent(id);
    fetchProperties();
    fetchReviews(id);
  }, [id]);


  const handleReviewSubmit = async () => {

    const success = await submitReview(
      id,
      rating,
      comment
    );

    if (success) {

      setShowReviewForm(false);

      setComment("");
      setRating(5);

    }
  };


  const handleDeleteReview = async (reviewId) => {
    await removeReview(
      reviewId,
      id
    );
  };

  const handleEditReview = (review) => {
    startEditReview(review);
    setComment(review.comment);
    setRating(review.rating);
    setShowReviewForm(true);
  };



  // if (loading || !agent)
  if (agentLoading || !agent)
    return (
      <div className="flex h-screen items-center justify-center">
        {/* {error ? ( */}
        {agentError ? (
          <div className="rounded-lg bg-red-50 p-6 text-center border border-red-200">
            <h3 className="text-lg font-semibold text-red-900">{error}</h3>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-red-600 px-6 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="text-slate-500">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            <p className="mt-4">Loading profile...</p>
          </div>
        )}
      </div>
    );

  const agentImage = resolveImageUrl(agent.profile_image);
  const userHasReviewed = reviews.some((r) => r.user === user?.username);
  const isOwnProfile = user?.id === agent?.id

  console.log(agent);
  console.log(rating);



  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION WITH AGENT INFO */}
      <div className="relative h-96 bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60" />

        <div className="relative mx-auto max-w-7xl px-4 h-full flex items-end pb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-2xl">
              {agentImage ? (
                <img
                  src={agentImage}
                  alt={agent.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center  bg-slate-300 text-slate-600">
                  <img src="/Relasto design (1)/sad.jpg" alt="" />
                </div>
              )}
            </div>

            <div className="space-y-4 text-white pb-2">
              <div>
                <h1 className="text-4xl font-bold">{agent.username}</h1>
                <p className="mt-2 text-slate-200">Real Estate Agent</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-2xl">★</span>
                  <span className="text-2xl font-bold">
                    {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
                  </span>
                </div>
                <span className="text-slate-300">
                  {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* MAIN CONTENT */}
          <div>
            {/* PROPERTIES SECTION */}
            {properties.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold text-slate-900">Properties</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {properties.map((property) => {
                    const imageUrl = resolveImageUrl(property.primary_image);
                    return (
                      <div
                        key={property.id}
                        className="overflow-hidden rounded-4xl bg-white shadow-xl border border-slate-200 transition hover:shadow-2xl"
                      >
                        <div className="relative h-64 bg-slate-100">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="space-y-4 p-6">
                          <div>
                            <h3 className="font-bold text-slate-900">{property.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {property.city || property.address}
                            </p>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-3 text-sm">
                            <div className="rounded-2xl bg-slate-50 px-3 py-2">
                              <p className="font-semibold text-slate-900">Bedrooms</p>
                              <p className="text-slate-600">
                                {property.bedrooms || "—"}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-3 py-2">
                              <p className="font-semibold text-slate-900">Bathrooms</p>
                              <p className="text-slate-600">
                                {property.bathrooms || "—"}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-3 py-2">
                              <p className="font-semibold text-slate-900">Area</p>
                              <p className="text-slate-600">
                                {property.area ? `${property.area} sqft` : "—"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                            <div>
                              <p className="text-sm text-slate-500">Price</p>
                              <p className="text-xl font-bold text-slate-900">
                                Rs {property.price?.toLocaleString?.() || property.price}
                              </p>
                            </div>
                            <button
                              onClick={() => navigate(`/property/${property.slug}`)}
                              className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Book Visit
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* REVIEWS SECTION */}
            <div>
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">Client Reviews</h2>

                <div>
                  {user ? (
                    isOwnProfile ? (
                      <p className="text-sm font-medium text-red-500">
                        You cannot review yourself.
                      </p>
                    ) : (
                      !userHasReviewed && (
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                          Write Review
                        </button>
                      )
                    )
                  ) : (
                    <p className="text-sm font-medium text-red-500">
                      Please login first to write a review.
                    </p>
                  )}
                </div>

              </div>

              {/* REVIEW FORM */}
              {showReviewForm && user && (
                <div className="mb-10">
                  <ReviewForm
                    comment={comment}
                    setComment={setComment}
                    rating={rating}
                    setRating={setRating}
                    agentId={id}
                    onSubmit={handleReviewSubmit}
                    isLoading={reviewSubmitting}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              )}

              {/* NO REVIEWS MESSAGE */}
              {reviews.length === 0 && (
                <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-slate-600">No reviews yet. Be the first to review this agent!</p>
                </div>
              )}

              {/* REVIEWS LIST */}
              {reviews.length > 0 && (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                          {review.user?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {review.user}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={i < review.rating ? "text-orange-500" : "text-slate-300"}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              {user && user.username === review.user && (
                                <button
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="text-sm text-red-600 hover:text-red-800 font-semibold"
                                >
                                  Delete
                                </button>
                              )}
                              {user && user.username === review.user && (
                                <button
                                  // onClick={() => handleEditReview(review.id)}
                                  onClick={() => handleEditReview(review)}
                                  className="text-sm text-red-600 hover:text-red-800 font-semibold"
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="mt-3 text-slate-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="rounded-4xl bg-white p-6 shadow-lg border border-slate-200  top-20">
              <h3 className="mb-6 text-lg font-bold text-slate-900">Agent Additional Information</h3>

              <div className="mb-3">
                {agent.username && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Name</p>
                    <p className="mt-2 text-sm text-slate-800 font-bold">{agent.username}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Email</p>
                  <h3

                    className="mt-1 text-sm font-semibold text-slate-900"
                  >
                    {agent.email}
                  </h3>
                </div>



                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Phone</p>
                  {agent.phone ? (
                    <a
                      href={`tel:${agent.phone}`}
                      className="mt-1 text-sm font-semibold text-slate-900 hover:text-blue-600"
                    >
                      {agent.phone}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-slate-900">Not provided</p>
                  )}
                </div>


                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Location</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {agent.location || "Not provided"}
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-4xl bg-gradient-to-br from-orange-50 to-orange-100 p-6 border border-orange-200">
              <p className="text-xs uppercase tracking-widest text-orange-700 font-semibold mb-2">Rating</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-orange-600">{averageRating || "N/A"}</span>
                <span className="text-orange-600 text-xl mb-1">★</span>
              </div>
              <p className="mt-3 text-sm text-orange-700">
                Based on {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </p>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-lg border border-slate-200">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Active Listings</p>
              <p className="text-3xl font-bold text-slate-900">{properties.length}</p>
              <p className="mt-3 text-sm text-slate-600">Properties managed by this agent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
