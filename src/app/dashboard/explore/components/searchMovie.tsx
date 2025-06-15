'use client';

import { useState } from 'react';
import { SearchMovie } from "@/model/Movie";
import { getCookie } from "cookies-next";
import axiosInstance from "../../../../../lib/axios";

interface MovieSearchBarProps {
    onSelect: (results: SearchMovie[]) => void;
}

export default function MovieSearch({ onSelect }: MovieSearchBarProps) {
    const [query, setQuery] = useState('');
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

            const results: SearchMovie[] = response.data.data;
            onSelect(results);
        } catch (error) {
            console.error('Failed to search movies', error);
            onSelect([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-4 mb-6">
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full bg-white shadow-md border border-gray-300"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') searchMovies();
                }}
            />
            <button
                onClick={searchMovies}
                disabled={loading}
                style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                className="text-white px-4 py-2 rounded-full font-semibold disabled:opacity-50"
            >
                🔍 {loading ? 'Searching...' : 'Search'}
            </button>
        </div>
    );
}
