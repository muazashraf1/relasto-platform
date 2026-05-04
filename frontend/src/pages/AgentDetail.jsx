import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { createReview, getAgentReviews, updateReview } from "../api/review";
import ReviewForm from "../components/ReviewForm";

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
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [user, setUser] = useState(null);

  // Get current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchAgent = async () => {
    try {
      const res = await api.get(`/accounts/profile/${id}/`);
      setAgent(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await api.get(`/properties/search/?agent_id=${id}`);
      setProperties(res.data.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getAgentReviews(id);
      setReviews(res.reviews || []);
      setAverageRating(res.average_rating ? Math.round(res.average_rating * 10) / 10 : 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgent();
    fetchProperties();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    setReviewSubmitting(true);
    setReviewError("");
    try {
      await createReview(parseInt(id), reviewData.rating, reviewData.comment);
      setShowReviewForm(false);
      await fetchReviews(); // Refresh reviews
    } catch (err) {
      setReviewError(err.error || err.message || "Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading || !agent)
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Loading profile...
      </div>
    );

  const agentImage = resolveImageUrl(agent.profile_image);
  const userHasReviewed = reviews.some((r) => r.user === user?.username);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION WITH AGENT INFO */}
      <div className="relative h-96 bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900/60" />

        <div className="relative mx-auto max-w-7xl px-4 h-full flex items-end pb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            <div className="relative h-40 w-40 overflow-hidden rounded-4xl border-4 border-white shadow-2xl">
              {agentImage ? (
                <img
                  src={agentImage}
                  alt={agent.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-300 text-slate-600">
                  No image
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
                  <span className="text-2xl font-bold">{averageRating || "N/A"}</span>
                </div>
                <span className="text-slate-300">{reviews.length} reviews</span>
              </div>

              <p className="text-slate-200">📍 {agent.location || "Not specified"}</p>
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
                              <p className="font-semibold text-slate-900">Beds</p>
                              <p className="text-slate-500">
                                {property.features?.find((f) =>
                                  f.key.toLowerCase().includes("bed")
                                )?.value || "3"}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-3 py-2">
                              <p className="font-semibold text-slate-900">Baths</p>
                              <p className="text-slate-500">
                                {property.features?.find((f) =>
                                  f.key.toLowerCase().includes("bath")
                                )?.value || "2"}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-3 py-2">
                              <p className="font-semibold text-slate-900">Area</p>
                              <p className="text-slate-500">2,500 sqft</p>
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
                {user && !userHasReviewed && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Write Review
                  </button>
                )}
              </div>

              {/* REVIEW FORM */}
              {showReviewForm && user && (
                <div className="mb-10">
                  <ReviewForm
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
                        <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-orange-400 to-orange-600" />
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
            <div className="rounded-4xl bg-white p-6 shadow-lg border border-slate-200 sticky top-20">
              <h3 className="mb-6 text-lg font-bold text-slate-900">Agent Info</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Email</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{agent.email}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Phone</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {agent.phone || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Address</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {agent.address || "Not provided"}
                  </p>
                </div>

                {agent.bio && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500">Bio</p>
                    <p className="mt-2 text-sm text-slate-600">{agent.bio}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3 border-t border-slate-200 pt-6">
                <button className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Send Message
                </button>
                <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                  Call Agent
                </button>
              </div>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-lg border border-slate-200">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Experience</p>
              <p className="text-2xl font-bold text-slate-900">15+ Years</p>
              <p className="mt-3 text-sm text-slate-600">In real estate property management and sales.</p>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-lg border border-slate-200">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Listings</p>
              <p className="text-2xl font-bold text-slate-900">{properties.length}</p>
              <p className="mt-3 text-sm text-slate-600">Active properties managed by this agent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
