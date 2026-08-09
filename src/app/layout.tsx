import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/Providers";
import { site } from "@/data/content";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Saurabh Shrivastava — Product Manager",
    template: "%s · Saurabh Shrivastava",
  },
  description:
    "Product Manager building intuitive, high-impact products from concept to launch. Based in Bangalore.",
  metadataBase: new URL("https://saurabhshrivastava.portfolio"),
  openGraph: {
    title: "Saurabh Shrivastava — Product Manager",
    description:
      "Building intuitive, high-impact products from concept to launch. Based in Bangalore.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Shrivastava — Product Manager",
    description:
      "Building intuitive, high-impact products from concept to launch.",
  },
  robots: { index: true, follow: true },
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  other: { copyright: site.copyright },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${display.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--bg)] font-sans text-[var(--fg)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
