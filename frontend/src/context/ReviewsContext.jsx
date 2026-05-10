import { createContext, useState } from "react";

import {
    createReview,
    getAgentReviews,
    updateReview,
    deleteReview,
} from "../api/review";

export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {

    // Reviews Data
    const [reviews, setReviews] = useState([]);

    // Ratings
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    // Loading States
    const [loading, setLoading] = useState(false);
    const [reviewSubmitting, setReviewSubmitting] = useState(false);

    // Error State
    const [reviewError, setReviewError] = useState("");

    // Edit Review States
    const [isEdit, setIsEdit] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);

    // ----------------------------------------
    // FETCH REVIEWS
    // ----------------------------------------
    const fetchReviews = async (agentId) => {

        try {
            setLoading(true);

            const res = await getAgentReviews(agentId);

            setReviews(res.reviews || []);

            setAverageRating(
                res.average_rating
                    ? parseFloat(res.average_rating)
                    : 0
            );

            setReviewCount(res.review_count || 0);

        } catch (err) {

            console.error(err);

            setReviewError("Failed to load reviews");

        } finally {

            setLoading(false);

        }
    };

    // ----------------------------------------
    // CREATE / UPDATE REVIEW
    // ----------------------------------------
    const submitReview = async (
        agentId,
        rating,
        comment
    ) => {

        try {

            setReviewSubmitting(true);

            setReviewError("");

            // UPDATE REVIEW
            if (isEdit && editReviewId) {

                await updateReview(
                    editReviewId,
                    rating,
                    comment
                );

            }

            // CREATE REVIEW
            else {

                await createReview(
                    agentId,
                    rating,
                    comment
                );

            }

            // Refresh reviews
            await fetchReviews(agentId);

            // Reset Edit States
            setIsEdit(false);
            setEditReviewId(null);

            return true;

        } catch (err) {

            setReviewError(
                err.error ||
                err.message ||
                "Failed to submit review"
            );

            return false;

        } finally {

            setReviewSubmitting(false);

        }
    };

    // ----------------------------------------
    // DELETE REVIEW
    // ----------------------------------------
    const removeReview = async (
        reviewId,
        agentId
    ) => {

        try {

            await deleteReview(reviewId);

            await fetchReviews(agentId);

        } catch (err) {

            setReviewError(
                err.error ||
                err.message ||
                "Failed to delete review"
            );

        }
    };

    // ----------------------------------------
    // START EDITING REVIEW
    // ----------------------------------------
    const startEditReview = (review) => {

        setIsEdit(true);

        setEditReviewId(review.id);

    };

    // ----------------------------------------
    // RESET EDIT MODE
    // ----------------------------------------
    const cancelEdit = () => {

        setIsEdit(false);

        setEditReviewId(null);

    };

    return (
        <ReviewsContext.Provider
            value={{

                // States
                reviews,
                averageRating,
                reviewCount,
                loading,
                reviewSubmitting,
                reviewError,

                // Edit states
                isEdit,
                editReviewId,

                // Functions
                fetchReviews,
                submitReview,
                removeReview,
                startEditReview,
                cancelEdit,
            }}
        >
            {children}
        </ReviewsContext.Provider>
    );
};