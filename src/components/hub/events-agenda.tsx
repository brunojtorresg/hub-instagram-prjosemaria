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
    month: "long",
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
    .select("id, title, city, state, country, flag_code, church_name, conference_name, event_date, status, requires_registration, cta_url")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .gte("event_date", todayIso)
    .order("event_date", { ascending: true })
    .limit(6);

  if (error || !data) return null;

  const events = data as HubEvent[];
  if (events.length === 0) return null;

  return (
    <section className="flex w-full max-w-2xl mx-auto flex-col gap-6 px-6 py-12">
      <h2 className="text-center text-xs font-medium uppercase tracking-[0.2em] text-brand-muted mb-4">
        Agenda Global
      </h2>

      {events.map((event) => {
        const hasValidFlag = FLAG_CODE_PATTERN.test(event.flag_code);
        const locationParts = [event.city, event.state, event.country].filter(Boolean);
        const locationString = locationParts.join(" • ");
        
        const isSoldOut = event.status === "sold_out";
        const needsRegistration = event.requires_registration;
        
        let buttonHref = "#";
        let buttonText = "Mais informações";

        if (!isSoldOut) {
          if (needsRegistration && event.cta_url) {
            buttonHref = event.cta_url;
            buttonText = "Garantir presença";
          } else {
            const msg = `Olá! Gostaria de informações sobre o evento "${event.title}" em ${event.city} (${event.country}) no dia ${formatDate(event.event_date)}.`;
            buttonHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            buttonText = "Falar no WhatsApp";
          }
        } else {
          buttonText = "Esgotado";
        }

        return (
          <article
            key={event.id}
            className="group flex w-full flex-col gap-4 rounded-2xl border border-white/5 bg-brand-surface p-6 transition-all hover:border-brand-gold/30 animate-fade-in-up"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {hasValidFlag && (
                  <Image
                    src={`https://flagcdn.com/w80/${event.flag_code}.png`}
                    alt=""
                    width={40}
                    height={30}
                    className="rounded-sm shadow-sm"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-brand-white">
                    {locationString}
                  </span>
                  <span className="text-sm text-brand-muted capitalize">
                    {formatDate(event.event_date)}
                  </span>
                </div>
              </div>

              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                event.status === 'open' ? 'border-brand-gold/30 text-brand-gold bg-brand-gold/5' :
                event.status === 'sold_out' ? 'border-white/10 text-brand-muted bg-white/5' :
                'border-whatsapp/30 text-whatsapp bg-whatsapp/5'
              }`}>
                {STATUS_LABEL[event.status]}
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5">
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
              <p className="text-sm leading-relaxed text-brand-muted">
                {event.title}
              </p>
            </div>

            {!isSoldOut && (
              <a
                href={buttonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full rounded-xl border border-brand-gold/30 bg-brand-gold/5 py-3 text-center text-sm font-semibold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-bg"
              >
                {buttonText}
              </a>
            )}
          </article>
        );
      })}
    </section>
  );
}