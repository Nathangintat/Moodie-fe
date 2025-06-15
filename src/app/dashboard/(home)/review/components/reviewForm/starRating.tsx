'use client';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

interface StarRatingProps {
    rating: number;
    onChange: (newRating: number) => void;
}

export default function StarRating({ rating, onChange }: StarRatingProps) {
    return (
        <Rating
            value={rating}
            onChange={onChange}
            style={{ maxWidth: 200 }}
            items={5}
        />
    );
}
