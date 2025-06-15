export interface Playlist {
    playlist_id: number;
    name: string;
    playlist_image: string;
}

export interface PlaylistRequest {
    playlist_id: number;
    movie_id: number;
    playlist_image: string;
}

export interface PlaylistItem {
    movie_id: number;
    name: string;
    poster: string;
    playlist_image: string;
    playlist_name: string;
}