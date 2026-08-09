import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { ClientErrorProbe } from "@/components/ClientErrorProbe";
import { ContentProtection } from "@/components/ContentProtection";
import { site } from "@/data/content";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Saurabh Shrivastava — Product Manager",
    template: "%s · Saurabh Shrivastava",
  },
  description:
    "Senior Product Manager building and scaling AI-powered B2B/B2C SaaS across CRM, customer experience, GTM, and monetization.",
  metadataBase: new URL("https://saurabhshrivastava.portfolio"),
  openGraph: {
    title: "Saurabh Shrivastava — Product Manager",
    description:
      "AI-powered SaaS, CRM & customer experience. Product strategy through GTM and monetization.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Shrivastava — Product Manager",
    description:
      "AI-powered SaaS, CRM & customer experience. Product strategy through GTM and monetization.",
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
  themeColor: "#f6f5f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--paper)] text-[var(--ink)]">
        <ContentProtection />
        <ClientErrorProbe />
        {children}
      </body>
    </html>
  );
}
