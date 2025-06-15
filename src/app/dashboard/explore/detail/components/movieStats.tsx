'use client';

interface StatsProps {
    rank: number;
    moodieRating: number;
    userRating?: number;
}

export default function MovieStats({ rank, moodieRating, userRating }: StatsProps) {
    return (
        <div className="p-4 border border-purple-300 bg-white rounded-xl shadow-md w-48">
            <h4 className="text-md font-semibold text-gray-700 mb-2">📊 Movie Stats</h4>
            <div className="bg-purple-700 text-white text-center rounded-md py-2 font-bold mb-2">
                Current Rank<br />
                <span className="text-2xl">#{rank}</span>
            </div>
            <div className="flex justify-between text-sm">
                <div className="text-purple-700 font-bold">Moodie Rating</div>
                <div>{moodieRating.toFixed(1)}</div>
            </div>
            <div className="flex justify-between text-sm mt-1">
                <div className="text-purple-700 font-bold">Your Rating</div>
                <div>{userRating ? userRating.toFixed(1) : 'n/a'}</div>
            </div>
        </div>
    );
}
