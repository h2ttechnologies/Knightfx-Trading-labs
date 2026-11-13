import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FloatingTelegram } from "@/components/floating-telegram";
import { SmoothScroll } from "@/components/reveal";
import { getPublicSiteContent } from "@/lib/public-content";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const description = "KnightFX Trading Labs is a trading education and mentorship brand focused on market understanding, strategy development, risk management and discipline.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KnightFX Trading Labs — Discipline. Strategy. Growth.",
    template: "%s | KnightFX Trading Labs",
  },
  description,
  applicationName: "KnightFX Trading Labs",
  keywords: ["trading education", "market structure", "risk management", "trading discipline", "KnightFX"],
  openGraph: {
    type: "website",
    siteName: "KnightFX Trading Labs",
    title: "KnightFX Trading Labs — Discipline. Strategy. Growth.",
    description,
    images: [{ url: "/brand/logo.png", width: 1024, height: 1024, alt: "KnightFX Trading Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KnightFX Trading Labs — Discipline. Strategy. Growth.",
    description,
    images: ["/brand/logo.png"],
  },
  icons: { icon: "/brand/logo.png", shortcut: "/brand/logo.png", apple: "/brand/logo.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const publicContent = await getPublicSiteContent();
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter links={publicContent?.links} />
        <FloatingTelegram />
      </body>
    </html>
  );
}
