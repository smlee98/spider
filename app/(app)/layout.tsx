import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import React from "react";

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}
