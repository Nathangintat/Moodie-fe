'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import axiosInstance from "@/../lib/axios";
import { Review } from "@/model/Review";
import { ReviewCard } from "./../components/reviewCard";

export default function MovieReviewList() {
    const { id } = useParams();
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = getCookie("accessToken");
                const res = await axiosInstance.get(`/movie/review/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const reviewData = res.data.data.review || [];
                if (Array.isArray(reviewData)) {
                    setReviews(reviewData);
                }
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            }
        };

        if (id) fetchReviews();
    }, [id]);

    return (
        <div className="space-y-4 mt-6">

            {reviews.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">No reviews yet.</p>
            ) : (
                reviews.map((review) => <ReviewCard key={review.review_id } review={review} />)

            )}

        </div>
    );
}
