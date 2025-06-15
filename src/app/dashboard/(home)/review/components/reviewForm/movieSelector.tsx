'use client';

import { useState } from 'react';
import axiosInstance from '@/../lib/axios';
import { SearchMovie } from "@/model/Movie";
import {getCookie} from "cookies-next";

interface MovieSelectorProps {
    onSelect: (movie: SearchMovie) => void;
}

export default function MovieSelector({ onSelect }: MovieSelectorProps) {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<SearchMovie[]>([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const token = getCookie('accessToken') as string;

            const response = await axiosInstance.get(`/movie/search?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMovies(response.data.data);
        } catch (error) {
            console.error('Failed to search movies', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Movie"
                    className="w-full px-4 py-2 rounded-full border border-purple-300 bg-gradient-to-r from-white to-purple-50 text-gray-700 placeholder-gray-400 shadow-inner"
                />
                <button
                    onClick={searchMovies}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                >
                    Search
                </button>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex items-center justify-between border border-purple-200 rounded-2xl p-4 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                                    alt={movie.name}
                                    className="w-16 h-24 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{movie.name}</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => onSelect(movie)}
                                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow"
                            >
                                Select
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
