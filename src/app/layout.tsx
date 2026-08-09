import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { ClientErrorProbe } from "@/components/ClientErrorProbe";
import { ContentProtection } from "@/components/ContentProtection";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/data/content";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
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
      "Playful, premium portfolio — AI SaaS, CRM, CX, GTM & monetization.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Shrivastava — Product Manager",
    description:
      "Playful, premium portfolio — AI SaaS, CRM, CX, GTM & monetization.",
  },
  robots: { index: true, follow: true },
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  other: { copyright: site.copyright },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#14110f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--sand)] text-[var(--ink)]">
        <ThemeProvider>
          <ContentProtection />
          <ClientErrorProbe />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
