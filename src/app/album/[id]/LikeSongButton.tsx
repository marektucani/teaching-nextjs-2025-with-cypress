"use client";

import { likeSong, unlikeSong } from "@/actions/playlists";
import { useState } from "react";

interface LikeSongButtonProps {
  songId: number;
  isLiked: boolean;
}

export function LikeSongButton({ songId, isLiked: initialIsLiked }: LikeSongButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (isLiked) {
        await unlikeSong(songId);
        setIsLiked(false);
      } else {
        await likeSong(songId);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`btn btn-sm ${isLiked ? "btn-primary" : "btn-outline"}`}
    >
      {isLoading ? "..." : isLiked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
