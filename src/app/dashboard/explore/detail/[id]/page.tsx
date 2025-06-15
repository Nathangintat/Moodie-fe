'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/../lib/axios';
import { MovieDetail } from '@/model/Movie';
import {getCookie} from "cookies-next";
import AddToWatchlist from '../components/addToWatchlist';
import MovieReviewSection from '../components/ movieReviewSection';
import MovieReviewList from "@/app/dashboard/explore/detail/components/movieReviewList";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const token = getCookie("accessToken");

                const response = await axiosInstance.get(`/movie/${id}`,{
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovie(response.data.data);
            } catch (error) {
                console.error('Failed to fetch movie details', error);
            }
        };

        if (id) fetchMovieDetail();
    }, [id]);

    if (!movie) {
        return <div className="p-8"></div>;
    }

    return (
        <div className="p-8 -mt-10">
            <div
                style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)'}}
                className="relative flex gap-8 p-6 rounded-xl text-white">

                <div className="absolute top-[-160px] right-[-130px] w-[600px] h-[650px] bg-white/10 rounded-full rotate-45"/>
                <div className="absolute bottom-[-100px] left-[-120px] w-[500px] h-[400px] bg-white/10 rounded-full"/>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    alt={movie.name}
                    className="w-60 h-auto rounded-xl shadow-lg"
                />
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">{movie.name}</h1>
                    <AddToWatchlist/>
                    <div className="text-sm space-y-3 mt-2">
                        <p><strong>Voters:</strong> 1.000.000 users</p>
                        <p><strong>Genre:</strong>{' '}
                            {movie.genres && movie.genres.length > 0
                                ? movie.genres.map((item, index) => (
                                    <span key={index}>
                                        {item}
                                        {index < movie.genres.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                                : 'Unknown'}</p>
                        <p><strong>Release Year:</strong> {movie.release_date}</p>
                        <p><strong>Overview:</strong> {movie.overview || 'n/a'}</p>
                    </div>
                </div>
            </div>
            <MovieReviewSection/>
            <MovieReviewList/>
        </div>
    );
}
