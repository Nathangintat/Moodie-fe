import {Movie} from "@/model/Movie";
import Link from "next/link";




export default function MovieList({movies}: { movies: Movie[], }) {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Movie List</h2>
            <div className="grid grid-cols-5 gap-6 overflow-hidden">
                {movies.map((movie) => (
                    <Link href={`/dashboard/explore/detail/${movie.id}`} key={movie.id}>
                        <div key={movie.id} className="text-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                                alt={movie.name}
                                className="rounded-lg shadow-md object-cover w-full h-80"
                            />
                            <p className="mt-2 text-sm font-medium text-gray-800">{movie.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
