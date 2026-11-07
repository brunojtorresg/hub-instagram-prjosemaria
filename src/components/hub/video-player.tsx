"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function VideoPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL;
  const posterUrl = process.env.NEXT_PUBLIC_POSTER_URL;

  if (!videoUrl) return null;

  return (
    <div className="w-full max-w-xs md:max-w-sm mx-auto animate-fade-in-up px-4" style={{ animationDelay: "0.2s" }}>
      <div className="relative aspect-9/16 w-full overflow-hidden rounded-sm border border-brand-gold/20 shadow-2xl shadow-black/80">
        <video
          autoPlay
          loop
          playsInline
          preload="metadata"
          muted={isMuted}
          poster={posterUrl}
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        <button
          type="button"
          onClick={() => setIsMuted((m) => !m)}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="w-12 h-px bg-brand-gold/50 mx-auto mt-4" />
    </div>
  );
}