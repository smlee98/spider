import { ReactNode } from "react";

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col px-8 py-36">
      <div className="flex size-full flex-col">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
