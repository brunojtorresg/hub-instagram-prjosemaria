import { QuoteCard } from "./quote-card";

const QUOTES = [
  {
    id: "1",
    text: "A família não é um acidente da história, mas o projeto original de Deus para a humanidade.",
  },
  {
    id: "2",
    text: "Edificados pela Palavra, permanecemos firmes mesmo quando os ventos da vida tentam nos derrubar.",
  },
  {
    id: "3",
    text: "A verdadeira autoridade não se impõe pelo grito, mas se conquista pelo exemplo de uma vida rendida a Deus.",
  },
];

export function QuotesSection() {
  return (
    <section
      aria-label="Frases e reflexões"
      className="flex w-full flex-col gap-4"
    >
      <h2
        className="mb-1 text-center text-xs font-medium uppercase tracking-widest"
        style={{ color: "var(--color-brand-muted)" }}
      >
        Edificados pela Palavra
      </h2>

      <div className="flex flex-col gap-4">
        {QUOTES.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </section>
  );
}