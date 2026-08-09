import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { ContentProtection } from "@/components/ContentProtection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/content";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Saurabh Shrivastava — Product Manager",
    template: "%s · Saurabh Shrivastava",
  },
  description:
    "Strategic Product Manager specializing in AI-powered B2B/B2B2C SaaS, omnichannel communications, GTM, and monetization. Open to mid-management Product Manager roles.",
  metadataBase: new URL("https://saurabhshrivastava.portfolio"),
  openGraph: {
    title: "Saurabh Shrivastava — Product Manager",
    description:
      "AI-Powered SaaS & Omnichannel Communications | GTM & Monetization. Portfolio of product work at Solera and Tekion.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Shrivastava — Product Manager",
    description:
      "AI-Powered SaaS & Omnichannel Communications | GTM & Monetization.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  other: {
    copyright: site.copyright,
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--ink-deep)] text-[var(--paper)]">
        <ContentProtection />
        <SiteHeader />
        <main className="allow-select relative z-0 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
