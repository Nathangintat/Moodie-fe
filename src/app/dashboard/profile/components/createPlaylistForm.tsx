'use client';

import { useState } from 'react';
import axiosInstance from '@/../lib/axios';
import { getCookie } from 'cookies-next';
import { Button } from '@/components/ui/button';

interface Props {
    onClose: () => void;
}

export default function CreatePlaylistForm({ onClose }: Props) {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = getCookie('accessToken');
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('playlist_image', image);
        }

        try {
            await axiosInstance.post('/playlist/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Playlist created successfully!');
            onClose();
        } catch (error) {
            console.error('Failed to create playlist', error);
            alert('Failed to create playlist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium">Playlist Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full border border-purple-500 rounded-xl px-4 py-2"
                />
            </div>

            <div>
                <label className="block font-medium">Cover Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="mt-1 w-full border border-purple-500 rounded-xl px-4 py-2"
                />
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}} className="text-white px-6" disabled={loading}>
                    {loading ? 'Saving...' : 'Create'}
                </Button>
            </div>
        </form>
    );
}
