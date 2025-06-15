'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/../lib/axios';
import { getCookie } from 'cookies-next';
import { PlaylistItem } from '@/model/Playlist';

const BASE_URL = process.env.NEXT_PUBLIC_API_ASSET;

export default function PlaylistDetailPage() {
    const { id } = useParams();
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistImage, setPlaylistImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylistItems = async () => {
            try {
                const token = getCookie('accessToken');
                const res = await axiosInstance.get(`/playlist/${id}/item`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data.data;

                if (Array.isArray(data) && data.length > 0) {
                    setPlaylistItems(data);
                    setPlaylistName(data[0].playlist_name || 'Untitled');
                    setPlaylistImage(data[0].playlist_image || '');
                }

            } catch (err) {
                console.error('Error fetching playlist movies', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPlaylistItems();
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-500 mt-10"></p>;
    }

    return (
        <div className="p-28">
            {/* Header */}
            <div style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}} className="flex justify-between items-center p-6 rounded-2xl text-white mb-6 -mt-35">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{playlistName}</h1>
                        <p className="text-lg">by You</p>
                    </div>
                </div>
                <button className="bg-white text-purple-700 px-4 py-2 rounded-full font-semibold shadow">
                    Edit Playlist
                </button>
            </div>

            {/* Movie Grid */}
            {playlistItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {playlistItems.map((movie) => (
                        <div key={movie.movie_id} className="text-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                                alt={movie.name}
                                className="w-full h-[360px] object-cover rounded-xl"
                            />
                            <p className="mt-2 text-sm text-gray-800">{movie.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No movies in this playlist yet.</p>
            )}
        </div>
    );
}
