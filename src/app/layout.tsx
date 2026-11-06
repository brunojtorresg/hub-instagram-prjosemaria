import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pr. José Maria Guimarães | Plataforma Oficial",
  description: "Cursos, livros e conteúdos exclusivos para edificar sua vida espiritual, familiar e financeira.",
  openGraph: {
    title: "Pr. José Maria Guimarães | Plataforma Oficial",
    description: "Cursos, livros e conteúdos exclusivos para edificar sua vida espiritual, familiar e financeira.",
    type: "website",
    locale: "pt_BR",
    siteName: "Pr. José Maria Guimarães",
    images: [
      {
        url: "https://svzgtqqutbfjgxwmhbuk.supabase.co/storage/v1/object/public/hub-media/public/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pr. José Maria Guimarães",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-bg font-sans antialiased selection:bg-brand-gold/20 selection:text-brand-white">
        {children}
      </body>
    </html>
  );
}