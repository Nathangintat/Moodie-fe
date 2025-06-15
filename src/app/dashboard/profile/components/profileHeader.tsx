'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/../lib/axios';
import { getCookie } from 'cookies-next';
import UserStatCard from './userStatCard';

const BASE_URL = process.env.NEXT_PUBLIC_API_ASSET;

interface UserResponse {
    id: number;
    username: string;
    email: string;
    profile_image: string;
}

export default function ProfileHeader() {
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = getCookie('accessToken');
                const res = await axiosInstance.get('/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data.data);
            } catch (err) {
                console.error('Failed to fetch user profile', err);
            }
        };

        fetchProfile();
    }, []);

    if (!user) return <p></p>;

    return (
        <div style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}} className="relative p-6 rounded-2xl flex items-center justify-between text-white">
            <div className="flex items-center gap-6">
                {user.profile_image ? (
                    <img
                        src={`${BASE_URL}/uploads/profiles/${user.profile_image}`}
                        alt="User Profile"
                        className="w-32 h-32 rounded-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/profile.png'; }}
                    />
                ) : (
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-white">
                        <span className="text-sm">?</span>
                    </div>
                )}
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold">{user.username}</h1>
                    <a href="#" className="underline text-sm">Edit Profile</a>
                    <div className="text-lg">
                        <p>Total Movie Review</p>
                        <p>Favorite Movie</p>
                    </div>
                </div>
            </div>
            <UserStatCard />
        </div>
    );
}
