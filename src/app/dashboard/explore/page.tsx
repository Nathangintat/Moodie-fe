'use client';

import { useEffect, useState } from 'react';
import MovieSearch from './components/searchMovie';
import MoodRecommendation from './components/moodRecomendation';
import MovieList from './components/movieList';
import axiosInstance from '@/../lib/axios';
import {Pagination} from "@/model/ApiResponse";
import {Movie, SearchMovie} from "@/model/Movie";
import {getCookie} from "cookies-next";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";


export default function ExplorePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchMovies = async ( page:number = 1) => {
        try {
            const token = getCookie("accessToken");

            const res = await axiosInstance.get(`/movie?limit=10&page=${page}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("MovieList received:", movies);
            setMovies(res.data.data);
            setPagination(res.data.pagination ?? null)
        } catch (err) {
            console.error('Failed to fetch movies', err);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);


    const handlePrevClick = () => {
        if (pagination && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if (pagination && currentPage < pagination.total_pages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleSearchResult = (results: SearchMovie[]) => {
        setMovies(results as Movie[]);
    };

    return (
        <div className="p-8">
            <MovieSearch onSelect={handleSearchResult} />
            <MoodRecommendation />
            <MovieList movies={movies} />
            {pagination && (
                <div className="mt-10 flex items-center justify-center">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <Button
                            onClick={handlePrevClick}
                            disabled={currentPage === 1}
                            className="relative inline-flex
                                    items-center gap-1 rounded-l-md border
                                    border-gray-300 bg-white px-3 py-2 pr-4
                                    text-sm font-medium text-gray-500
                                    hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40">
                            <ArrowLeft className="h3 w-3 stroke-1"/>
                            <span>Back</span>
                        </Button>

                        <Button
                            onClick={handleNextClick}
                            disabled={pagination.total_pages <= currentPage}
                            className="relative inline-flex
                                    items-center gap-1 rounded-l-md border
                                    border-gray-300 bg-white px-3 py-2 pr-4
                                    text-sm font-medium text-gray-500
                                    hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40">
                            <span>Next</span>
                            <ArrowRight className="h3 w-3 stroke-1"/>
                        </Button>
                    </nav>
                </div>
            )}
        </div>
    );
}
