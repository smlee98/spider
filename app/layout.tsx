import Providers from "@/components/providers";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

const API_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

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
  description: "(주)대명거미크레인",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn(pretendard.variable, jetbrainsMono.variable)} suppressHydrationWarning>
      <body>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
