export interface Movie {
    id: number;
    name: string;
    poster: string;
}

export interface SearchMovie {
    id: number;
    name: string;
    poster: string;
}

export interface MovieDetail {
    id: number;
    name: string;
    poster: string;
    overview: string;
    release_date: string;
    rating: number;
    genres: string[];
}

