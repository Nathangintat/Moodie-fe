'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/../lib/axios';
import { getCookie } from 'cookies-next';

interface UserResponse {
    username: string;
    email: string;
    profile_image: string;
}

export default function ProfileEditForm() {
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = getCookie('accessToken');
                const res = await axiosInstance.get('/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data.data);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="bg-white p-6 rounded-2xl border border-purple-300 mt-6 w-full max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block font-medium mb-2">Username</label>
                    <input
                        type="text"
                        defaultValue={user?.username}
                        className="w-full border border-purple-300 rounded-xl px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Password</label>
                    <input
                        type="password"
                        value="********"
                        className="w-full border border-purple-300 rounded-xl px-4 py-2"
                        disabled
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Email address</label>
                    <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full border border-purple-300 rounded-xl px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Favorite Movie</label>
                    <input
                        type="text"
                        defaultValue="Interstellar"
                        className="w-full border border-purple-300 rounded-xl px-4 py-2"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button className="px-4 py-2 border rounded-full">Cancel</button>
                <button className="px-4 py-2 bg-purple-700 text-white rounded-full">Save Changes</button>
            </div>
        </div>
    );
}
