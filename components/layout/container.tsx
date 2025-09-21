import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("bg-background mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col px-8 py-36", className)}>
      {children}
    </div>
  );
}
