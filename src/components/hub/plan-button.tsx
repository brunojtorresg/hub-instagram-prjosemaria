"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { trackAndRedirectAction } from "@/actions/track-click";
import { cn } from "@/lib/utils";

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
    <form onSubmit={handleSubmit} className="w-full">
      <input type="hidden" name="action" value={actionName} />
      <input type="hidden" name="redirectUrl" value={stripeUrl} />

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold",
          "disabled:cursor-not-allowed disabled:opacity-70",
          featured
            ? "border-brand-gold/30 bg-brand-gold/5 hover:border-brand-gold/50"
            : "border-white/5 bg-brand-surface hover:border-white/10"
        )}
      >
        <span className="flex flex-col gap-1">
          <span className="text-base font-medium text-brand-text">
            {planName}
          </span>
          <span className="text-sm text-brand-muted">{planDesc}</span>
        </span>

        <span className="flex items-center gap-3">
          {/* Fonte aumentada e em negrito para os valores R$ */}
          <span className="font-serif text-2xl font-bold text-brand-gold">
            {price}
          </span>
          {isPending && (
            <Loader2
              className="h-4 w-4 animate-spin text-brand-gold"
              aria-hidden="true"
            />
          )}
        </span>
      </button>
    </form>
  );
}