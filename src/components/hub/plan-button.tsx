"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { trackAndRedirectAction } from "@/actions/track-click";

type PlanButtonProps = {
  planName: string;
  planDesc: string;
  price: string;
  actionName: string;
  stripeUrl: string;
  featured?: boolean;
};

export function PlanButton({
  planName,
  planDesc,
  price,
  actionName,
  stripeUrl,
  featured = false,
}: PlanButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      await trackAndRedirectAction({
        action: formData.get("action"),
        redirectUrl: formData.get("redirectUrl"),
        metadata: { plan: planName, price },
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      {featured && (
        <span className="absolute -top-3 right-2 bg-brand-gold text-brand-bg text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
          Recomendado
        </span>
      )}
      
      <input type="hidden" name="action" value={actionName} />
      <input type="hidden" name="redirectUrl" value={stripeUrl} />

      <button
        type="submit"
        disabled={isPending}
        className={`
          group relative flex w-full items-center justify-between py-6 md:py-8 px-2 text-left transition-all duration-300
          border-b disabled:opacity-50
          ${featured 
            ? "border-brand-gold/30 bg-brand-gold/5 hover:border-brand-gold/50" 
            : "border-white/10 hover:border-brand-gold/50"
          }
        `}
      >
        <div className="flex flex-col gap-1 md:gap-2 min-w-0 pr-2">
          <span className="font-serif text-xl md:text-2xl text-brand-white group-hover:text-brand-gold transition-colors whitespace-nowrap">
            {planName}
          </span>
          <span className="text-xs md:text-sm text-brand-muted font-light leading-tight">
            {planDesc}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <span className="font-serif text-xl md:text-2xl text-brand-gold whitespace-nowrap">
            {price}
          </span>
          {isPending && <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />}
          <span className="text-brand-muted group-hover:text-brand-gold transition-colors hidden sm:block">→</span>
        </div>
      </button>
    </form>
  );
}