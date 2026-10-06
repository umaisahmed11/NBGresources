import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { PageTransition } from "@/components/motion/PageTransition";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { buildMetadata, siteUrl, defaultTitle, defaultDescription } from "@/lib/seo/config";
import { organizationSchema, websiteSchema, jsonLd } from "@/lib/seo/structured-data";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata({ title: defaultTitle, description: defaultDescription, path: "/" }),
  title: {
    default: defaultTitle,
    template: "%s",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteSchema())}
        />
      </head>
      <body className="grain antialiased">
        <MotionProvider>
          <SmoothScroll />
          <CustomCursor />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-frost focus:px-4 focus:py-2 focus:text-sm focus:text-carbon"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
