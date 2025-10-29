"use client";

import { logout } from "@/actions/user/action";
import { ToggleSwitcher } from "@/components/toggle-switcher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { isDropdownMenu, menuData } from "@/lib/menu-data";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { LogIn, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode, Ref } from "react";
import { useState } from "react";

// Main Navigation Component
export function MainNav({ user }: { user?: User }) {
  const router = useRouter();
  return (
    <div className="mr-4 hidden w-full md:flex">
      <nav className="flex w-full items-center justify-between gap-6 text-sm">
        <NavigationMenu>
          <NavigationMenuList>
            {menuData.map((item) => (
              <NavigationMenuItem key={item.id}>
                {isDropdownMenu(item) ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent" onClick={(e) => e.preventDefault()}>
                      {item.icon?.type === "image" ? (
                        <picture>
                          <img src={item.icon.src} alt={item.icon.alt} className={item.icon.className} />
                        </picture>
                      ) : (
                        item.title
                      )}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="flex w-96 flex-col gap-3 p-4">
                        {item.children?.map((child) => (
                          <ListItem key={child.id} href={child.href || "#"} title={child.title} target={child.target}>
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink className="px-4 font-medium" asChild>
                    <Link href={item.href || "#"} target={item.target}>
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center justify-end gap-4">
          <ToggleSwitcher />
          {!user?.id ? (
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "font-medium")}>
              <LogIn />
              로그인
            </Link>
          ) : (
            <Button
              variant="outline"
              className="font-medium"
              onClick={async () => {
                await logout();
                router.push("/");
              }}
            >
              <LogOut />
              로그아웃
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}

// Mobile Navigation Component
export function MobileNav({ user }: { user?: User }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="ml-auto px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="z-[100] flex h-dvh w-dvw flex-col px-0">
        <SheetHeader className="px-6 pb-0">
          <SheetTitle>
            <MobileLink href="/" className="dark:invert" onOpenChange={setOpen}>
              <Image src="/logo.png" alt="logo" width={184} height={40} />
            </MobileLink>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <ul role="list" className="my-4 flex flex-col gap-6 px-6 text-2xl font-bold">
            {menuData.map((item) => (
              <li key={item.id}>
                {isDropdownMenu(item) ? (
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-6">
                    <AccordionItem value={item.id} className="bg-background divide-y-0">
                      <AccordionTrigger className="bg-inherit p-0 text-2xl font-bold">
                        {item.icon?.type === "image" ? (
                          <picture>
                            <img src={item.icon.src} alt={item.icon.alt} className={item.icon.className} />
                          </picture>
                        ) : (
                          item.title
                        )}
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pt-6 pb-0">
                        <ul className="text-muted-foreground flex flex-col gap-6 text-2xl">
                          {item.children?.map((child) => (
                            <li key={child.id}>
                              <MobileLink href={child.href || "#"} onOpenChange={setOpen} target={child.target}>
                                {child.title}
                              </MobileLink>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <MobileLink href={item.href || "#"} onOpenChange={setOpen} target={item.target}>
                    {item.title}
                  </MobileLink>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="flex w-full items-center justify-between p-6">
          <ToggleSwitcher />
          {!user?.id ? (
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "font-medium")}>
              <LogIn />
              로그인
            </Link>
          ) : (
            <Button
              variant="outline"
              className="font-medium"
              onClick={async () => {
                await logout();
                router.push("/");
              }}
            >
              <LogOut />
              로그아웃
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface ListItemProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "title"> {
  ref?: Ref<HTMLAnchorElement>;
  className?: string;
  title: string;
  children?: ReactNode;
}

const ListItem = ({ ref, className, title, children, ...props }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block gap-3 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-x-3 text-sm font-medium">
            <div className="flex flex-col gap-0.5">
              <span className="text-base leading-none font-semibold">{title}</span>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{children}</p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";

interface MobileLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "onClick"> {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: string;
}

function MobileLink({ href, onOpenChange, className, children, onClick, target, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      target={target}
      onClick={(e) => {
        onClick?.(e);
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
