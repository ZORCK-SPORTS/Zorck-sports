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
      "Catálogo de uniformes personalizados para times, turmas, empresas, pesca, agro e eventos. Atendimento direto pelo WhatsApp.",
    keywords: [
      "uniformes personalizados",
      "camisas esportivas",
      "interclasse",
      "terceirão",
      "Zorck Sport",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Zorck Sport",
      title: "Zorck Sport | Uniformes que vestem identidade",
      description: "Explore 694 referências e personalize o uniforme do seu grupo.",
      images: [{ url: socialImage, width: 1760, height: 922, alt: "Zorck Sport — uniformes personalizados" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Zorck Sport | Uniformes que vestem identidade",
      description: "Explore 694 referências e personalize o uniforme do seu grupo.",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
