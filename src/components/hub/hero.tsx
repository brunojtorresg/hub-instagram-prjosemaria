import Image from "next/image";

export function Hero() {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;

  return (
    <header className="relative flex w-full flex-col items-center py-16 md:py-24 animate-fade-in-up">
      {logoUrl && (
        <div className="mb-8 relative">
          {/* Glow dourado ajustado para o formato quadrado arredondado do logo */}
          <div className="absolute inset-2 bg-brand-gold/15 blur-2xl rounded-4xl" />
          
          {/* Container limpo: sem borda CSS extra e sem padding */}
          <div className="relative w-28 h-28 md:w-36 md:h-36">
            <Image
              src={logoUrl}
              alt="Selo José Maria Guimarães"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* Nome completo com destaque em Guimarães */}
      <div className="flex flex-col items-center gap-6 max-w-3xl px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-white leading-[1.1]">
          Pr. José Maria <span className="italic text-brand-gold">Guimarães</span>
        </h1>
        
        {/* Linha divisória dourada */}
        <div className="w-24 h-px bg-linear-to-r from-transparent via-brand-gold to-transparent" />

        <p className="text-lg md:text-xl text-brand-muted max-w-2xl leading-relaxed">
          Cursos, livros e conteúdos exclusivos para edificar sua{" "}
          <span className="text-brand-white font-medium">vida espiritual, familiar e financeira</span>{" "}
          — com quem há mais de 35 anos transforma vidas à luz da Bíblia.
        </p>
      </div>
    </header>
  );
}