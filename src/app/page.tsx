import { Hero } from "@/components/hub/hero";
import { VideoPlayer } from "@/components/hub/video-player";
import { PlanButton } from "@/components/hub/plan-button";
import { EventsAgenda } from "@/components/hub/events-agenda";
import { QuotesSection } from "@/components/hub/quotes-section";
import { WhatsAppIcon } from "@/components/hub/whatsapp-icon";

export const revalidate = 3600;

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Vídeo Cinematográfico */}
      <section className="px-6 pb-24 md:pb-32">
        <VideoPlayer />
      </section>

      {/* CTA Principal */}
      <section className="px-6 pb-24 flex justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <a
          href="https://prjosemaria.com/app"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 px-10 py-5 bg-brand-gold text-brand-bg font-medium tracking-wide transition-all hover:bg-brand-gold-hover hover:shadow-[0_0_40px_-10px_rgba(201,169,106,0.4)]"
        >
          ACESSAR PLATAFORMA
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </section>

      {/* Planos de Acesso */}
      <section className="w-full max-w-2xl mx-auto px-6 pb-24 border-t border-white/5 pt-16">
        <h2 className="text-center text-xs font-medium uppercase tracking-[0.2em] text-brand-muted mb-12">
          Planos de Acesso
        </h2>
        <div className="flex flex-col">
          <PlanButton
            planName="Mensal"
            planDesc="Acesso imediato • Cancele quando quiser"
            price="R$ 19,90"
            actionName="checkout_mensal_brl"
            stripeUrl="https://buy.stripe.com/14A00kf7M7RH64M4U05wI00"
          />
          <PlanButton
            planName="Anual"
            planDesc="Economia de 16% • 12 meses de acesso"
            price="R$ 200,00"
            actionName="checkout_anual_brl"
            featured
            stripeUrl="https://buy.stripe.com/cNi9AU3p4c7X0Ks7285wI01"
          />
        </div>
      </section>

      {/* Agenda Global */}
      <section className="w-full max-w-2xl mx-auto px-6 pb-24">
        <EventsAgenda />
      </section>

      {/* WhatsApp CTA */}
      <section className="px-6 pb-24 flex justify-center">
        <a
          href="https://wa.me/5519992203593?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20agenda%20do%20Pastor%20Jos%C3%A9%20Maria."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 border border-white/10 text-brand-white hover:border-whatsapp hover:text-whatsapp transition-all duration-300 rounded-xl"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="text-sm tracking-wide">Agendas & Eventos</span>
        </a>
      </section>

      {/* Citações */}
      <section className="w-full max-w-2xl mx-auto px-6 pb-32">
        <QuotesSection />
      </section>

      {/* Footer Minimalista */}
      <footer className="mt-auto py-12 text-center border-t border-white/5">
        <p className="text-xs text-brand-muted/60 tracking-widest uppercase">
          © {new Date().getFullYear()} Pr. José Maria Guimarães
        </p>
        <p className="text-[10px] text-brand-muted/40 mt-2">
          Tecnologia & Gestão: Fortis Gestão | Software e Automação
        </p>
      </footer>
    </main>
  );
}