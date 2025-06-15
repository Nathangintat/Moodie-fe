interface Props {
    selected: 'playlist' | 'review';
    onChange: (type: 'playlist' | 'review') => void;
}

export default function PlaylistTabs({ selected, onChange }: Props) {
    return (
        <div className="flex items-center gap-4 mt-8 mb-6">
            <button
                onClick={() => onChange('playlist')}
                className={`px-6 py-2 rounded-full font-medium ${
                    selected === 'playlist'
                        ? 'bg-gradient-to-b from-[#3C2773] to-[#844DD4] text-white'
                        : 'bg-gray-100 text-gray-600'
                }`}
            >
                Movie Playlist
            </button>
            <button
                onClick={() => onChange('review')}
                className={`px-6 py-2 rounded-full font-medium ${
                    selected === 'review'
                        ? 'bg-gradient-to-b from-[#3C2773] to-[#844DD4] text-white'
                        : 'bg-gray-100 text-gray-600'
                }`}
            >
                Movie Review
            </button>
        </div>
    );
}
