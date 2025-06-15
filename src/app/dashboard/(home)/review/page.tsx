'use client';

import { useEffect, useState } from "react";
import { Review } from "@/model/Review";
import axiosInstance from "@/../lib/axios";
import { ReviewCard } from "@/../src/app/dashboard/(home)/review/components/review-card";
import { ApiResponse } from "@/model/ApiResponse";
import { getCookie } from "cookies-next";
import ReviewForm from '@/../src/app/dashboard/(home)/review/components/reviewForm';

export default function ReviewListPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [, setLoading] = useState<boolean>(true);
    const [, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false); // <-- ini

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = getCookie("accessToken");
                const response = await axiosInstance.get<ApiResponse<Review[]>>(`/review/home`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReviews(response.data.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="fflex-1 p-8 overflow-y-auto -mt-10">
            <div className="p-8 pt-0 w-[864px] mx-auto rounded-xl">
                {/* Top bar */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-4">
                        <button style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}} className="text-white px-6 py-2 rounded-full">
                            For You
                        </button>
                        <button className="bg-white text-purple-600 px-6 py-2 rounded-full border border-purple-600">
                            🔥 Trending
                        </button>
                    </div>

                    {/* Add Review Button */}
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                        className="text-white px-6 py-2 rounded-full"
                    >
                        + Add Review
                    </button>
                </div>

                {/* Inline Review Form */}
                {showForm && (
                    <div className="mb-8">
                        <ReviewForm
                            onSuccess={() => setShowForm(false)} // Close form after success
                        />
                    </div>
                )}

                {/* Review list */}
                <div className="flex flex-col space-y-6">
                    {reviews.map((review) => (
                        <ReviewCard key={review.review_id} review={review}/>
                    ))}
                </div>
            </div>
        </main>
    );
}
