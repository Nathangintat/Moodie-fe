'use client';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface EmojiPickerComponentProps {
    onSelect: (emoji: string) => void;
}

export default function EmojiPickerComponent({ onSelect }: EmojiPickerComponentProps) {
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        onSelect(emojiData.emoji);
    };

    return (
        <EmojiPicker onEmojiClick={handleEmojiClick} />
    );
}
