import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hasitha Amarasinghe",
  description:
    "Personal portfolio of Hasitha Amarasinghe - a learner, building one project at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header/>
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
