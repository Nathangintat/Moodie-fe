export default function UserStatCard() {
    return (
        <div className="bg-white text-gray-800 rounded-xl p-4 w-52 text-center shadow-md">
            <p className="text-sm text-gray-600">Current Rank</p>
            <h2 className="text-2xl font-bold text-purple-700">#1</h2>
            <div className="mt-2">
                <p className="bg-purple-600 text-white py-1 px-3 rounded-full inline-block text-sm font-semibold">
                    9.9
                </p>
                <p className="text-xs mt-1">USER RATING</p>
            </div>
        </div>
    );
}
