'use client';

import { useState } from "react";
import { Review } from "@/model/Review";
import { ArrowDown, ArrowUp } from "lucide-react";
import axiosInstance from "@/../lib/axios";
import { getCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_API_ASSET;

type ReviewCardProps = {
    review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
    const [upvoteCount, setUpvoteCount] = useState(review.vote_count || 0);
    const [downvoteCount, setDownvoteCount] = useState(review.downvote_count || 0);
    const [hasVoted, setHasVoted] = useState(review.has_voted || false);
    const [hasDownvoted, setHasDownvoted] = useState(review.has_downvoted || false);
    const [isVoting, setIsVoting] = useState(false); // Anti spam

    const handleUpvote = async () => {
        if (isVoting) return;

        setIsVoting(true);

        try {
            const token = getCookie('accessToken') as string;

            await axiosInstance.post(`/review/${review.review_id}/upvote`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });



            if (hasVoted) {
                setUpvoteCount((prev) => prev - 1);
                setHasVoted(false);
            } else {
                setUpvoteCount((prev) => prev + 1);
                if (hasDownvoted) {
                    setDownvoteCount((prev) => prev - 1);
                    setHasDownvoted(false);
                }
                setHasVoted(true);
            }
        } catch (err) {
            console.error('Failed to upvote', err);
        } finally {
            setIsVoting(false);
        }
    };

    const handleDownvote = async () => {
        if (isVoting) return;

        setIsVoting(true);

        try {
            const token = getCookie('accessToken') as string;

            await axiosInstance.post(`/review/${review.review_id}/downvote`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (hasDownvoted) {
                setDownvoteCount((prev) => prev - 1);
                setHasDownvoted(false);
            } else {
                setDownvoteCount((prev) => prev + 1);
                if (hasVoted) {
                    setUpvoteCount((prev) => prev - 1);
                    setHasVoted(false);
                }
                setHasDownvoted(true);
            }
        } catch (err) {
            console.error('Failed to downvote', err);
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <div className="flex bg-white rounded-xl shadow p-4 items-center w-200 justify-center">
            {/* Review Details */}
            <div className="ml-6 flex flex-col flex-1 space-y-3">
                <div className="flex items-center gap-3">
                    {/* Profile Picture */}
                    {review.profile_image ? (
                        <img
                            src={`${BASE_URL}/uploads/profiles/${review.profile_image}`}
                            alt="User Profile"
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => { e.currentTarget.src = '/profile.png'; }}
                        />
                    ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                            <span className="text-sm">?</span>
                        </div>
                    )}
                    {/* Username and Movie Name */}
                    <div>
                        <div className="text-gray-500 text-sm">
                            Review by <span className="font-semibold text-gray-700">{review.username}</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                            {review.movie_name}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="font-bold text-lg">
                    {review.headline}
                </div>
                <p className="text-gray-600">{review.content}</p>

                {/* Rating and Vote */}
                <div className="flex gap-4 mt-2 items-center">
                    {/* Rating */}
                    <span style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}} className="flex items-center gap-2 px-4 py-2 rounded-full text-white w-23 justify-center">
            {review.emoji} {review.rating}/5
          </span>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full
                    ${(hasVoted)
                        ? 'bg-green-600 text-white'
                        : 'bg-[#C8C2E2] text-white'}\`}>
                        
                    ${(hasDownvoted)
                        ? 'bg-red-600 text-white'
                        : 'bg-[#C8C2E2] text-white'}`}>

                        {/* Upvotes */}
                        <button
                            onClick={handleUpvote}
                            className="flex items-center gap-1 focus:outline-none"
                        >
                            <ArrowUp size={14}/>
                            <span>{upvoteCount}</span>
                        </button>

                        {/* Downvotes */}
                        <button
                            onClick={handleDownvote}
                            className="flex items-center gap-1 focus:outline-none"
                        >
                            <ArrowDown size={14}/>
                            <span>{downvoteCount}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
