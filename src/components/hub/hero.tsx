import Image from "next/image";

export function Hero() {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;

  return (
    <header className="relative flex w-full flex-col items-center py-12 md:py-24 animate-fade-in-up">
      {logoUrl && (
        <div className="mb-6 relative">
          <div className="absolute inset-2 bg-brand-gold/15 blur-2xl rounded-4xl" />
          <div className="relative w-24 h-24 md:w-36 md:h-36">
            <Image
              src={logoUrl}
              alt="Selo José Maria Guimarães"
              fill
              sizes="(max-width: 768px) 96px, 144px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 max-w-3xl px-4 text-center">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-white leading-tight">
          Pr. José Maria{" "}
          <span className="block md:inline italic text-brand-gold">
            Guimarães
          </span>
        </h1>
        
        <div className="w-16 h-px bg-linear-to-r from-transparent via-brand-gold to-transparent" />

        <p className="text-sm md:text-xl text-brand-muted leading-relaxed px-2">
          Cursos, livros e conteúdos exclusivos para edificar sua{" "}
          <span className="text-brand-white font-medium whitespace-nowrap">
            vida espiritual,
          </span>{" "}
          <span className="text-brand-white font-medium whitespace-nowrap">
            familiar e financeira
          </span>{" "}
          — com quem há mais de 35 anos transforma vidas à luz da Bíblia.
        </p>
      </div>
    </header>
  );
}