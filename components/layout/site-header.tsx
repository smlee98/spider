import { getSession } from "@/actions/user/action";
import Image from "next/image";
import Link from "next/link";
import { MainNav, MobileNav } from "./navigations";

export async function SiteHeader() {
  const { user } = await getSession();
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-[99] -mb-px w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-(--breakpoint-2xl) items-center gap-x-6 px-8">
        <Link href="/" className="dark:invert">
          <Image src="/logo.png" alt="logo" width={184} height={40} />
        </Link>
        <MainNav user={user} />
        <MobileNav user={user} />
      </div>
    </header>
  );
}
