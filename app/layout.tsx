import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from "@/lib/site";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hasitha Amarasinghe",
    template: "%s | Hasitha Amarasinghe",
  },
  description:
    "Computer Science student exploring DevOps, Linux, and infrastructure. Building things and writing about what I learn.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Hasitha Amarasinghe",
    description:
      "Computer Science student exploring DevOps, Linux, and infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasitha Amarasinghe",
    description:
      "Computer Science student exploring DevOps, Linux, and infrastructure.",
    creator: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}

        <Analytics />
        <SpeedInsights />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}