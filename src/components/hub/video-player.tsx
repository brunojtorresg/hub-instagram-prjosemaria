"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function VideoPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL;
  const posterUrl = process.env.NEXT_PUBLIC_POSTER_URL;

  if (!videoUrl) {
    return (
      <div className="flex aspect-9/16 w-full max-w-80 items-center justify-center rounded-2xl border border-white/5 bg-brand-surface">
        <p className="text-sm text-brand-muted">Vídeo não configurado</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-80 overflow-hidden rounded-2xl border border-white/5 bg-brand-surface shadow-2xl shadow-black/50">
      <video
        autoPlay
        loop
        playsInline
        preload="metadata"
        muted={isMuted}
        poster={posterUrl}
        aria-label="Apresentação do Pr. José Maria"
        className="aspect-9/16 h-auto w-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={() => setIsMuted((current) => !current)}
        aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-brand-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Volume2 className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}