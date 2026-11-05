"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Quote = {
  id: string;
  text: string;
};

type QuoteCardProps = {
  quote: Quote;
};

export function QuoteCard({ quote }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  
  const fullText = `"${quote.text}" — Pr. José Maria Guimarães`;
  const encodedText = encodeURIComponent(`${fullText}\n\nConheça mais: https://prjosemaria.com`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar para a área de transferência", err);
    }
  };

  const handleShare = () => {
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  return (
    <article
      className="flex w-full flex-col gap-4 rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--color-brand-surface)",
        borderColor: "rgba(255, 255, 255, 0.06)",
      }}
    >
      <blockquote>
        <p
          className="font-serif text-xl leading-relaxed italic"
          style={{ color: "var(--color-brand-white)" }}
        >
          {`"${quote.text}"`}
        </p>
      </blockquote>

      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--color-brand-gold)" }}
        >
          Pr. José Maria
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Texto copiado" : "Copiar frase"}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              copied
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-white/10 bg-transparent text-brand-muted hover:border-white/20 hover:text-brand-text"
            )}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartilhar no WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-transparent text-brand-muted transition-colors hover:border-whatsapp/30 hover:text-whatsapp"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}