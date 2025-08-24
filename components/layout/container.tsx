import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col px-8 py-36">{children}</div>
  );
}
