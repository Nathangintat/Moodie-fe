'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axiosInstance from '@/../lib/axios';
import { Playlist } from '@/model/Playlist';
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_ASSET;

export default function UserPlaylist() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = getCookie('accessToken');
                const res = await axiosInstance.get('/playlist', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (Array.isArray(res.data.data)) {
                    setPlaylists(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch playlists', err);
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
            {playlists.map((playlist) => (
                <Link key={playlist.playlist_id} href={`/dashboard/profile/playlist/${playlist.playlist_id}`} passHref>
                    <div className="text-center cursor-pointer">
                        <img
                            src={`${BASE_URL}/uploads/playlists/${playlist.playlist_image}`}
                            alt={playlist.name}
                            className="w-full aspect-square object-cover rounded-xl shadow-md"
                        />
                        <p className="mt-2 font-semibold text-lg">{playlist.name}</p>
                        <p className="text-gray-500 text-sm">by You</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
