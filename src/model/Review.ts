export interface Review {
    review_id: number;
    movie_id: number;
    movie_name: string;
    user_id: number;
    profile_image: string;
    username: string;
    headline: string;
    content: string;
    poster: string;
    rating: number;
    emoji: string;
    vote_count:     number;
    downvote_count: number;
    has_voted:      boolean;
    has_downvoted: boolean;
    created_at: string;
}

export interface ReviewRequest {
    movie_id: number;
    user_id: number;
    headline: string;
    content: string;
    rating: number;
    emoji: string;
}