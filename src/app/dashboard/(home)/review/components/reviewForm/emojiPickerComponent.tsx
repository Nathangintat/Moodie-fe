'use client';

import EmojiPicker from 'emoji-picker-react';

interface EmojiPickerComponentProps {
    onSelect: (emoji: string) => void;
}

export default function EmojiPickerComponent({ onSelect }: EmojiPickerComponentProps) {
    const handleEmojiClick = (emojiData: any) => {
        onSelect(emojiData.emoji);
    };

    return (
        <EmojiPicker onEmojiClick={handleEmojiClick} />
    );
}
