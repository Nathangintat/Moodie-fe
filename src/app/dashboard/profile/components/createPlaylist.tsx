'use client';

import { useState } from 'react';
import CreatePlaylistForm from './createPlaylistForm';
import { Button } from '@/components/ui/button';

export default function CreatePlaylist() {
    const [open, setOpen] = useState(false);

    return (
        <div className="ml-auto">
            <Button
                onClick={() => setOpen(true)}
                style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                className="text-white font-semibold px-6 py-2 rounded-full shadow"
            >
                + Create Playlist
            </Button>

            {open && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Create New Playlist</h2>
                        <CreatePlaylistForm onClose={() => setOpen(false)}/>
                    </div>
                </div>
            )}
        </div>
    );
}
