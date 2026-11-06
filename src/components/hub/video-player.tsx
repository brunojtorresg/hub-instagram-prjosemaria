"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function VideoPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL;
  const posterUrl = process.env.NEXT_PUBLIC_POSTER_URL;

  if (!videoUrl) return null;

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      {/* Moldura Editorial */}
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

        {/* Controle de Som Minimalista */}
        <button
          type="button"
          onClick={() => setIsMuted((m) => !m)}
          className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Linha de Assinatura Visual (ancora o vídeo na página) */}
      <div className="w-16 h-px bg-brand-gold/50 mx-auto mt-6" />
    </div>
  );
}