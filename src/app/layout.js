import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tapimaster.pe";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TapiMaster | Tapicería Automotriz Premium en Cajamarca",
    template: "%s | TapiMaster",
  },
  description: "Especialistas en tapizado de asientos de autos en Cajamarca. Trabajamos con Cuero Natural, Cuero Americano, Tacto Cuero y Pranna. Diseños personalizados y alta costura con garantía.",
  keywords: ["tapiceria cajamarca", "tapizado de autos", "cuero automotriz", "tapimaster", "mariscal caceres 1031", "pranna cajamarca"],
  authors: [{ name: "TapiMaster" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TapiMaster | Tapicería Automotriz Premium en Cajamarca",
    description: "Transformamos interiores de autos con tapizado premium, cuero natural y acabados de alta costura en Cajamarca.",
    url: siteUrl,
    siteName: "TapiMaster",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "TapiMaster tapicería automotriz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TapiMaster | Tapicería Automotriz Premium en Cajamarca",
    description: "Tapicería automotriz premium en Cajamarca con cuero natural, diseños personalizados y acabados de lujo.",
    images: ["/images/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo/favicon.png",
    shortcut: "/images/logo/favicon.png",
    apple: "/images/logo/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "TapiMaster",
    url: siteUrl,
    image: `${siteUrl}/images/logo/logo.png`,
    description: "Especialistas en tapizado de asientos de autos en Cajamarca con cuero premium y acabados personalizados.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cajamarca",
      addressCountry: "PE",
    },
    telephone: "+51 999 999 999",
    areaServed: "Cajamarca",
  };

  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Preloader />
        <CustomCursor />
        {children}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="au1j2fECe0"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
