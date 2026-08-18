import type { Metadata, Viewport } from "next";
import { absoluteSiteUrl, SITE_URL } from "./site-paths";
import "./globals.css";

const socialImage = absoluteSiteUrl("/og.png");

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: "Zorck Sport | Uniformes personalizados",
    template: "%s | Zorck Sport",
  },
  description:
    "Uniformes personalizados para times, turmas, empresas e eventos. Explore referências, selecione seus favoritos e fale direto com a Zorck Sport.",
  keywords: [
    "uniformes personalizados",
    "camisas esportivas",
    "interclasse",
    "terceirão",
    "Zorck Sport",
  ],
  icons: { icon: absoluteSiteUrl("/favicon-zorck.svg") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Zorck Sport",
    url: `${SITE_URL}/`,
    title: "Zorck Sport | Não vista o óbvio",
    description: "Explore 694 referências e crie um uniforme com a identidade do seu grupo.",
    images: [{ url: socialImage, width: 1731, height: 909, alt: "Zorck Sport — uniformes personalizados" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zorck Sport | Não vista o óbvio",
    description: "Explore 694 referências e crie um uniforme com a identidade do seu grupo.",
    images: [socialImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
