'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import StarRating from './../../../(home)/review/components/reviewForm/starRating';
import EmojiPickerComponent from './../../../(home)/review/components/reviewForm/emojiPickerComponent';
import ReviewFormFields from '../components/reviewFormFields';
import axiosInstance from "@/../lib/axios";
import { getCookie } from 'cookies-next';
import { Button } from "@/components/ui/button";
import { useParams } from 'next/navigation';

const reviewSchema = z.object({
    headline: z.string().min(5),
    description: z.string().min(10),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
    onSuccess?: () => void;
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
    });

    const [rating, setRating] = useState(0);
    const [emoji, setEmoji] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isRatingOpen, setRatingOpen] = useState(false);

    const { id } = useParams();
    const movieId = Number(id);

    const onSubmit = async (data: ReviewFormData) => {
        const token = getCookie('accessToken') as string;
        const userId = getCookie('user_id') as string;

        try {
            await axiosInstance.post('/review/create', {
                movie_id: movieId,
                user_id: Number(userId),
                headline: data.headline,
                content: data.description,
                rating,
                emoji,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Review created successfully!');
            reset();
            setShowForm(false);
            onSuccess?.();
        } catch (error) {
            console.error('Failed to create review', error);
        }
    };

    return (
        <div className="p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">💬 Movie Review</h3>

            {!showForm ? (
                <div
                    onClick={() => setShowForm(true)}
                    style={{background: 'linear-gradient(45deg, #F2EDFB 0%, #FFFFFF 50%, #E5DCF8 100%)'}}
                    className="w-full px-4 py-3 bg-white border border-purple-300 rounded-lg text-gray-500 shadow hover:cursor-text hover:bg-purple-50 transition"
                >
                    <h1>Share Your Opinion!</h1>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <ReviewFormFields register={register} errors={errors} />

                    <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
                        <div
                            onClick={() => {
                                setRatingOpen(!isRatingOpen);
                            }}
                            style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                            className="cursor-pointer flex items-center rounded-full px-6 py-2 text-white font-bold"
                        >
                            {rating > 0 && emoji
                                ? `${emoji} ${rating}/5`
                                : '⭐ Rate This Movie'}
                        </div>

                        <div className="flex gap-2 ml-auto">
                            <Button
                                type="button"
                                variant="outline"
                                className="text-gray-600 border-gray-300 rounded-full px-4 py-2 text-sm"
                                onClick={() => {
                                    setShowForm(false);
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                                className="text-white rounded-full px-4 py-2 text-sm"
                            >
                                Comment
                            </Button>
                        </div>
                    </div>

                    {/* Rating & Emoji */}
                    {isRatingOpen && (
                        <div className="border border-purple-300 rounded-xl p-4 bg-white shadow-md mt-4">
                            <h4 className="text-lg font-semibold mb-4 text-center">Rating</h4>
                            <div className="flex justify-center mb-4">
                                <StarRating rating={rating} onChange={setRating}/>
                            </div>

                            <p className="text-center text-gray-600 mb-2">React, Don’t Just Rate</p>
                            <div className="flex justify-center mb-4">
                                <EmojiPickerComponent onSelect={setEmoji}/>
                            </div>

                            {emoji && <div className="text-center mt-2 text-xl">{emoji}</div>}

                            <div className="flex justify-end mt-6">
                                <Button
                                    type="button"
                                    className="rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6"
                                    onClick={() => setRatingOpen(false)}
                                >
                                    Done
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
