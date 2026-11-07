import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

type HubEvent = {
  id: string;
  title: string;
  city: string;
  state: string | null;
  country: string;
  flag_code: string;
  church_name: string | null;
  conference_name: string | null;
  event_date: string;
  status: "open" | "sold_out" | "no_registration";
  requires_registration: boolean;
  cta_url: string | null;
};

const STATUS_LABEL: Record<HubEvent["status"], string> = {
  open: "Inscrições abertas",
  sold_out: "Esgotado",
  no_registration: "Entrada franca",
};

const FLAG_CODE_PATTERN = /^[a-z]{2}$/;
const WHATSAPP_NUMBER = "5519992203593";

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function EventsAgenda() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  if (!tenantId) return null;

  const todayIso = new Date().toISOString().slice(0, 10);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hub_events")
    .select(
      "id, title, city, state, country, flag_code, church_name, conference_name, event_date, status, requires_registration, cta_url",
    )
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .gte("event_date", todayIso)
    .order("event_date", { ascending: true })
    .limit(6);

  if (error || !data) return null;

  const events = data as HubEvent[];
  if (events.length === 0) return null;

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-center text-xs font-medium uppercase tracking-[0.2em] text-brand-muted mb-8">
        Agenda Global
      </h2>

      <div className="flex flex-col gap-5">
        {events.map((event: HubEvent) => {
          const hasValidFlag = FLAG_CODE_PATTERN.test(event.flag_code);
          const formattedDate = formatDate(event.event_date);

          const isSoldOut = event.status === "sold_out";
          const needsRegistration = event.requires_registration;

          let buttonHref = "#";
          let buttonText = "Mais informações";

          if (!isSoldOut) {
            if (needsRegistration && event.cta_url) {
              buttonHref = event.cta_url;
              buttonText = "Garantir presença";
            } else {
              const msg = `Olá! Gostaria de informações sobre o evento "${event.title}" em ${event.city} (${event.country}) no dia ${formattedDate}.`;
              buttonHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
              buttonText = "Informações via Whatsapp";
            }
          } else {
            buttonText = "Esgotado";
          }

          return (
            <article
              key={event.id}
              className="group relative flex w-full flex-col gap-4 rounded-xl border border-white/5 bg-brand-surface p-5 transition-all hover:border-brand-gold/20"
            >
              {/* Badge de Status - posicionado corretamente dentro do card */}
              <div className="absolute top-4 right-4">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ${
                    event.status === "open"
                      ? "border-brand-gold/40 text-brand-gold bg-brand-gold/5"
                      : event.status === "sold_out"
                        ? "border-white/10 text-brand-muted bg-white/5"
                        : "border-brand-gold/30 text-brand-gold/90 bg-brand-gold/5"
                  }`}
                >
                  {STATUS_LABEL[event.status]}
                </span>
              </div>

              {/* Header: Bandeira + Localização + Data */}
              <div className="flex flex-col gap-2 pr-24">
                {/* Linha 1: Bandeira (Solução definitiva sem warnings) */}
                {hasValidFlag && (
                  <div className="flex justify-start">
                    <div className="relative w-10 h-[30px] shrink-0">
                      <Image
                        src={`https://flagcdn.com/w80/${event.flag_code}.png`}
                        alt={`Bandeira de ${event.country}`}
                        fill
                        className="object-contain rounded-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Linha 2 e 3: Localização e Data */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-brand-white leading-tight whitespace-nowrap">
                    {event.city}
                    {event.state && `, ${event.state}`} • {event.country}
                  </span>
                  <span className="text-xs text-brand-muted mt-0.5 capitalize">
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 pt-4">
                {/* Seção inferior: Igreja + Conferência + Descrição */}
                <div className="space-y-1.5">
                  {event.church_name && (
                    <p className="text-sm font-medium text-brand-white">
                      {event.church_name}
                    </p>
                  )}
                  {event.conference_name && (
                    <p className="text-sm italic text-brand-gold">
                      {event.conference_name}
                    </p>
                  )}
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {event.title}
                  </p>
                </div>

                {/* Botão */}
                {!isSoldOut && (
                  <a
                    href={buttonHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block w-full rounded-lg border border-brand-gold/30 bg-brand-gold/5 py-2.5 text-center text-sm font-semibold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-bg"
                  >
                    {buttonText}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
