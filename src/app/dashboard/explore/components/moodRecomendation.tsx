const moods = [
    { emoji: '😭', label: 'Sad' },
    { emoji: '🥰', label: 'In Love' },
    { emoji: '😄', label: 'Happy' },
    { emoji: '😱', label: 'Anxious' },
];

export default function MoodRecommendation() {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Mood-Based Genre Recommendations</h2>
            <div className="flex gap-4 flex-wrap">
                {moods.map((mood) => (
                    <button
                        key={mood.label}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl text-white font-semibold shadow-md"
                        style={{
                            background:
                                mood.label === 'Sad' ? '#3B82F6' :
                                    mood.label === 'In Love' ? '#EC4899' :
                                        mood.label === 'Happy' ? '#F59E0B' :
                                            '#06B6D4',
                        }}
                    >
                        {mood.emoji} {mood.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
