"use client";

import { ToggleSwitcher } from "@/components/toggle-switcher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode, Ref } from "react";
import { useState } from "react";

// Main Navigation Component
export function MainNav() {
  return (
    <div className="mr-4 hidden w-full md:flex">
      <nav className="flex w-full items-center justify-between gap-6 text-sm">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">보유장비</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-96 flex-col gap-3 p-4">
                  <ListItem href="#" title="Item 1">
                    Description 1
                  </ListItem>
                  <ListItem href="#" title="Item 2">
                    Description 2
                  </ListItem>
                  <ListItem href="#" title="Item 3">
                    Description 3
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <NavigationMenuLink className="px-4 font-medium" asChild>
                <Link href="#">현장사진</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">회사 소개</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-96 flex-col gap-3 p-4">
                  <ListItem href="/company/about" title="대명거미크레인 소개" />
                  <ListItem href="#" title="연혁" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <NavigationMenuLink className="px-4 font-medium" asChild>
                <Link href="#">문의하기</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ToggleSwitcher />
      </nav>
    </div>
  );
}

// Mobile Navigation Component
export function MobileNav() {
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
      <SheetContent side="right" className="flex h-dvh w-dvw flex-col px-0">
        <SheetHeader className="px-6 pb-0">
          <SheetTitle>
            <MobileLink href="/" className="dark:invert" onOpenChange={setOpen}>
              <Image src="/logo.png" alt="logo" width={184} height={40} />
            </MobileLink>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <ul role="list" className="my-4 flex flex-col gap-6 px-6 text-2xl font-bold">
            <li>
              <Accordion type="single" collapsible className="flex w-full flex-col gap-6">
                <AccordionItem value="solution" className="bg-background divide-y-0">
                  <AccordionTrigger className="bg-inherit p-0 text-2xl font-bold">보유장비</AccordionTrigger>
                  <AccordionContent className="px-0 pt-6 pb-0">
                    <ul className="text-muted-foreground flex flex-col gap-6 text-2xl">
                      <li>
                        <MobileLink href="#" onOpenChange={setOpen}>
                          Item 1
                        </MobileLink>
                      </li>
                      <li>
                        <MobileLink href="#" onOpenChange={setOpen}>
                          Item 2
                        </MobileLink>
                      </li>
                      <li>
                        <MobileLink href="#" onOpenChange={setOpen}>
                          Item 3
                        </MobileLink>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            <li>
              <MobileLink href="#" onOpenChange={setOpen}>
                현장사진
              </MobileLink>
            </li>
            <li>
              <Accordion type="single" collapsible className="flex w-full flex-col gap-6">
                <AccordionItem value="solution" className="bg-background divide-y-0">
                  <AccordionTrigger className="bg-inherit p-0 text-2xl font-bold">보유장비</AccordionTrigger>
                  <AccordionContent className="px-0 pt-6 pb-0">
                    <ul className="text-muted-foreground flex flex-col gap-6 text-2xl">
                      <li>
                        <MobileLink href="/company/about" onOpenChange={setOpen}>
                          대명거미크레인 소개
                        </MobileLink>
                      </li>
                      <li>
                        <MobileLink href="#" onOpenChange={setOpen}>
                          연혁
                        </MobileLink>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            <li>
              <MobileLink href="#" onOpenChange={setOpen}>
                문의하기
              </MobileLink>
            </li>
          </ul>
        </ScrollArea>
        <div className="flex w-full items-center justify-end p-6">
          <ToggleSwitcher />
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
}

function MobileLink({ href, onOpenChange, className, children, onClick, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
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
