"use client";

import { Separator } from "@/components/ui/separator";
import { isDropdownMenu, menuData } from "@/lib/menu-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const showArrowMenus = ["gallery", "about"];

  return (
    <footer className="bg-zinc-800">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col px-6 pt-8 pb-16 md:pt-24 lg:px-8 lg:pt-12 lg:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="invert">
                <Image src="/logo.png" alt="logo" width={184} height={40} />
              </Link>
              <div className="text-sm leading-6 text-white">
                <p>사용자등록번호 : 132-86-04665 | 대표 : 박완서</p>
                <p>17394 경기도 이천시 호법면 후안리 100-11</p>
              </div>
            </div>
            <ul className="text-muted-foreground flex items-center space-x-6 transition-all">
              <li className="opacity-75 hover:opacity-100">
                <a
                  href="https://www.youtube.com/@%EB%8C%80%EB%AA%85%EA%B1%B0%EB%AF%B8%ED%81%AC%EB%A0%88%EC%9D%B8"
                  target="_blank"
                >
                  <Image src="/media/youtube.png" width={32} height={32} alt="youtube" />
                </a>
              </li>
            </ul>
          </div>

          {/* 섹션 인라인 */}
          <div className="grid w-full grid-cols-1 gap-6 md:col-span-2 md:grid-cols-4 lg:gap-20">
            {menuData.map((item) => (
              <div key={item.id}>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  {item.icon?.type === "image" ? (
                    <picture>
                      <img src={item.icon.src} alt={item.icon.alt} className={item.icon.className} />
                    </picture>
                  ) : showArrowMenus.includes(item.id) ? (
                    <a
                      href={item.href || "#"}
                      className="flex items-center gap-x-1.5 text-sm leading-6 font-semibold text-white"
                    >
                      {item.title} <ArrowUpRight className="size-4" />
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                {isDropdownMenu(item) && (
                  <ul className="space-y-3 text-sm leading-6 text-gray-400">
                    {item.children?.map((child) => (
                      <li key={child.id}>
                        <a href={child.href || "#"} target={child.target}>
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-gray-400" />

        <div className="text-muted-foreground flex w-full flex-col justify-between gap-4 font-medium md:flex-row md:items-center">
          <p className="text-sm text-gray-400">© 2025 spidercrane.co.kr. All rights reserved.</p>
          <p className="text-sm font-semibold text-balance break-keep text-amber-600">
            (주)대명거미크레인은 철저한 안전 교육으로 사고 예방에 최선을 다하며, 국내 최대의 크레인과 베테랑 기사들을
            보유하고 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
