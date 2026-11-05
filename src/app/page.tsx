import { Hero } from "@/components/hub/hero";
import { VideoPlayer } from "@/components/hub/video-player";
import { PlanButton } from "@/components/hub/plan-button";
import { WhatsAppIcon } from "@/components/hub/whatsapp-icon";
import { EventsAgenda } from "@/components/hub/events-agenda";
import { QuotesSection } from "@/components/hub/quotes-section";

export const revalidate = 3600;

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center px-5 py-10">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <Hero />

        <VideoPlayer />

     <a
  href="https://prjosemaria.com/app"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative block w-full overflow-hidden rounded-xl bg-brand-gold px-6 py-4 text-center text-sm font-semibold text-brand-bg shadow-lg shadow-brand-gold/30 transition-all hover:shadow-xl hover:shadow-brand-gold/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
>
  {/* Efeito de brilho (shimmer) ao passar o mouse - Sintaxe v4 corrigida */}
  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  
  <span className="relative flex items-center justify-center gap-2">
    Acessar Plataforma Oficial
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  </span>
</a>

        <EventsAgenda />

        <section
          className="flex w-full flex-col gap-3"
          aria-label="Planos de assinatura"
        >
          <h2 className="mb-1 text-center text-xs font-medium uppercase tracking-widest text-brand-muted">
            Selecione o plano desejado
          </h2>

          <PlanButton
            planName="Mensal"
            planDesc="Acesso imediato • Cancele quando quiser"
            price="R$ 19,90"
            actionName="checkout_mensal_brl"
            stripeUrl="https://buy.stripe.com/14A00kf7M7RH64M4U05wI00"
          />

          <PlanButton
            planName="Anual"
            planDesc="Economia de 16% • 12 meses"
            price="R$ 200,00"
            actionName="checkout_anual_brl"
            featured
            stripeUrl="https://buy.stripe.com/cNi9AU3p4c7X0Ks7285wI01"
          />
        </section>

        <a
          href="https://wa.me/5519992203593?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20disponibilidade%20de%20agenda%20do%20Pastor%20Jos%C3%A9%20Maria."
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-sm font-semibold text-brand-bg transition-colors hover:bg-whatsapp-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Convites para Agendas & Eventos
        </a>

                {/* ... (seção de planos e botão whatsapp já existentes) ... */}

        <QuotesSection />

        <footer className="mt-auto pt-8 text-center text-xs leading-relaxed text-brand-muted">
          <p className="font-medium text-brand-muted/80">
            © Pr. José Maria Guimarães
          </p>
          <p>Todos os direitos reservados</p>
          <p className="mt-1">Tecnologia & Gestão: Fortis Gestão</p>
        </footer>

      </div>
    </main>
  );
}
