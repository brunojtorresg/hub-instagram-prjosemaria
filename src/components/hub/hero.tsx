import Image from "next/image";

export function Hero() {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;

  return (
    <header className="flex w-full flex-col items-center gap-6 text-center">
      {/* Logo do Ministério com Glow Dourado */}
      {logoUrl && (
        <div className="relative">
          {/* Glow dourado atrás do logo */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)",
              transform: "scale(1.2)",
            }}
          />
          
          {/* Container do logo com tamanho reduzido */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={logoUrl}
              alt="José Maria Guimarães - Edificados pela Palavra"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      )}

      {/* Nome e Descrição */}
      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-brand-white md:text-5xl">
          Pr. José Maria
        </h1>
        <p className="max-w-80 text-base leading-relaxed text-brand-muted">
          Há mais de 35 anos edificando vidas e famílias. Conferencista
          internacional, escritor e mentor.
        </p>
      </div>
    </header>
  );
}