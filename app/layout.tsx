import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
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
    icons: { icon: "/favicon-zorck.svg" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Zorck Sport",
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
}

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
