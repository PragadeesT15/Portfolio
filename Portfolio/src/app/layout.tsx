import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/data/profile";
import { Providers } from "@/components/providers";
import { Preloader } from "@/components/layout/preloader";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: siteConfig.title,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — developer portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111318" },
    { media: "(prefers-color-scheme: light)", color: "#F5F7FA" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

// Runs before the page paints so a stored or system theme never flashes.
const themeScript = `(function(){try{var key="orbital-theme";var stored=localStorage.getItem(key);var theme=stored==="light"||stored==="dark"?stored:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var root=document.documentElement;root.dataset.theme=theme;root.style.colorScheme=theme;}catch(error){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-ink font-sans text-frost antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-frost px-5 py-3 text-sm font-medium text-ink transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>

        <Providers>
          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <div className="grain" aria-hidden="true" />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
