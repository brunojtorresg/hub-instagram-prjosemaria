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
  no_registration: "Entrada livre",
};

const STATUS_COLOR: Record<HubEvent["status"], string> = {
  open: "var(--color-brand-gold)",
  sold_out: "var(--color-brand-muted)",
  no_registration: "#25D366",
};

const FLAG_CODE_PATTERN = /^[a-z]{2}$/;

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
    .select(
      "id, title, city, state, country, flag_code, church_name, conference_name, event_date, status, requires_registration, cta_url"
    )
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .gte("event_date", todayIso)
    .order("event_date", { ascending: true })
    .limit(6);

  if (error) {
    console.error("Falha ao carregar hub_events:", error.message);
    return null;
  }

  const events = (data ?? []) as HubEvent[];
  if (events.length === 0) return null;

  return (
    <section
      aria-label="Agenda global de eventos"
      className="flex w-full flex-col gap-3"
    >
      <h2
        className="mb-1 text-center text-xs font-medium uppercase tracking-widest"
        style={{ color: "var(--color-brand-muted)" }}
      >
        Agenda de Eventos
      </h2>

      {events.map((event) => {
        const hasValidFlag = FLAG_CODE_PATTERN.test(event.flag_code);
        const locationParts = [event.city, event.state, event.country].filter(
          Boolean
        );
        const locationString = locationParts.join(" • ");

        return (
          <article
            key={event.id}
            className="flex w-full flex-col gap-3 rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--color-brand-surface)",
              borderColor: "rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Header: Bandeira + Localização + Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {hasValidFlag && (
  <Image
    src={`https://flagcdn.com/w80/${event.flag_code}.png`}
    alt=""
    aria-hidden="true"
    width={40}
    height={30}
    loading="lazy"
    className="rounded-sm"
    style={{ width: '40px', height: '30px', objectFit: 'cover' }}
  />
)}
                <span className="flex flex-col">
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--color-brand-text)" }}
                  >
                    {locationString}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-brand-muted)" }}
                  >
                    {formatDate(event.event_date)}
                  </span>
                </span>
              </div>

              <span
                className="rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider"
                style={{
                  color: STATUS_COLOR[event.status],
                  borderColor: STATUS_COLOR[event.status],
                }}
              >
                {STATUS_LABEL[event.status]}
              </span>
            </div>

            {/* Nome da Igreja */}
            {event.church_name && (
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-brand-text)" }}
              >
                {event.church_name}
              </p>
            )}

            {/* Nome da Conferência (se houver) */}
            {event.conference_name && (
              <p
                className="text-sm italic"
                style={{ color: "var(--color-brand-gold)" }}
              >
                {event.conference_name}
              </p>
            )}

            {/* Título do Evento */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-brand-muted)" }}
            >
              {event.title}
            </p>

            {/* CTA Condicional */}
            {event.status !== "sold_out" && event.requires_registration && (
              <a
                href={event.cta_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-colors"
                style={{
                  borderColor: "var(--color-brand-gold)",
                  color: "var(--color-brand-gold)",
                }}
              >
                {event.cta_url ? "Garantir presença" : "Informações"}
              </a>
            )}
          </article>
        );
      })}
    </section>
  );
}