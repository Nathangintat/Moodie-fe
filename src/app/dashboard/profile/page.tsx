'use client';

import { useState } from 'react';
import ProfileHeader from './components/profileHeader';
import UserStatCard from './components/userStatCard';
import PlaylistTabs from './components/playlistTabs';
import CreatePlaylist from './components/createPlaylist';
import CreatePlaylistForm from './components/createPlaylistForm';
import Playlist from './components/playlist';

export default function ProfilePage() {
    const [selectedTab, setSelectedTab] = useState<'playlist' | 'review'>('playlist');
    const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <div className="p-8">
            {/* Header */}
            <ProfileHeader />

            {/* Tabs + Create Button */}
            <div className="flex items-center justify-between mt-8">
                <PlaylistTabs selected={selectedTab} onChange={setSelectedTab} />
                <CreatePlaylist/>
            </div>

            {/* Content Section */}
            <div className="mt-6">
                {selectedTab === 'playlist' ? (
                    <Playlist />
                ) : (
                    <p className="text-center text-gray-500">Movie Review coming soon.</p>
                )}
            </div>

            {/* Create Playlist Form */}
            {showCreateForm && (
                <CreatePlaylistForm onClose={() => setShowCreateForm(false)} />
            )}
        </div>
    );
}
