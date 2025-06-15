'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MovieSelector from './movieSelector';
import StarRating from './starRating';
import EmojiPickerComponent from './emojiPickerComponent';
import ReviewFormFields from './reviewFormFields';
import axiosInstance from "@/../lib/axios";
import { getCookie } from 'cookies-next';
import { Button } from "@/components/ui/button";
import { SearchMovie } from "@/model/Movie";

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
    const [selectedMovie, setSelectedMovie] = useState<SearchMovie | null>(null);
    const [isMovieSelectorOpen, setMovieSelectorOpen] = useState(false);
    const [isRatingOpen, setRatingOpen] = useState(false);

    const onSubmit = async (data: ReviewFormData) => {
        const token = getCookie('accessToken') as string;
        const userId = getCookie('user_id') as string;

        try {
            await axiosInstance.post('/review/create', {
                movie_id: selectedMovie?.id,
                user_id: Number(userId),
                headline: data.headline,
                content: data.description,
                rating: rating,
                emoji: emoji,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Review created successfully!');
            reset();
            onSuccess?.();
        } catch (error) {
            console.error('Failed to create review', error);
        }
    };

    return (
        <div className="p-8 rounded-2xl border border-purple-400 bg-gradient-to-b from-white to-purple-100 space-y-6">
            {/* Select Movie & Rate Summary */}
            <div className="flex gap-4 justify-center">
                <div
                    onClick={() => {
                        setMovieSelectorOpen(!isMovieSelectorOpen);
                        setRatingOpen(false);
                    }}
                    className="cursor-pointer min-w-[240px] flex items-center justify-center rounded-full border border-purple-500 text-purple-700 font-semibold px-6 py-2 bg-white shadow-inner"
                >
                    🎬 {selectedMovie?.name || 'Select Movie'}
                </div>

                <div
                    onClick={() => {
                        setRatingOpen(!isRatingOpen);
                        setMovieSelectorOpen(false);
                    }}
                    style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                    className="cursor-pointer flex items-center rounded-full px-6 py-2 text-white font-bold"
                >
                    {rating > 0 && emoji
                        ? `${emoji} ${rating}/5`
                        : '⭐ Rate This Movie'}
                </div>
            </div>

            {/* Movie Selector */}
            {isMovieSelectorOpen && (
                <div className="border border-purple-300 rounded-xl p-4 bg-white shadow-md mt-4">
                    <MovieSelector
                        onSelect={(movie) => {
                            setSelectedMovie(movie);
                            setMovieSelectorOpen(false);
                        }}
                    />
                </div>
            )}

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

            {/* Headline & Description */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <ReviewFormFields register={register} errors={errors}/>

                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full text-gray-600 border-gray-300"
                        onClick={() => onSuccess?.()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                        className="rounded-full text-white px-6"
                    >
                        Publish
                    </Button>
                </div>
            </form>
        </div>
    );
}
