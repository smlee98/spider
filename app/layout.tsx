import Providers from "@/components/providers";
import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal"
    }
  ],
  variable: "--font-pretendard"
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../fonts/JetbrainsMonoVariable.woff2",
      weight: "100 800",
      style: "normal"
    }
  ],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  title: "(주)대명거미크레인",
  description: "(주)대명거미크레인"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn(pretendard.variable, jetbrainsMono.variable)} suppressHydrationWarning>
      <body>
        <Providers>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SiteFooter />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
