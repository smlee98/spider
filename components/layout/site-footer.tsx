"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-zinc-800">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col px-6 pt-8 pb-16 md:pt-24 lg:px-8 lg:pt-12 lg:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <Link href="/" className="invert">
              <Image src="/logo.png" alt="logo" width={184} height={40} />
            </Link>
            <div className="text-sm leading-6 text-white">
              <p>사용자등록번호 : 132-86-04665 | 대표 : 박완서</p>
              <p>17394 경기도 이천시 호법면 후안리 100-11</p>
            </div>
            <ul className="text-muted-foreground flex items-center space-x-6 transition-all">
              <li className="opacity-75 hover:opacity-100">
                <a href="#">
                  <Image src="/media/youtube.png" width={32} height={32} alt="youtube" />
                </a>
              </li>
            </ul>
          </div>

          {/* 섹션 인라인 */}
          <div className="grid w-full grid-cols-1 gap-6 md:col-span-2 md:grid-cols-5 lg:gap-20">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">보유 장비</h3>
              <ul className="space-y-3 text-sm leading-6 text-gray-400">
                <li>
                  <a href="#">Item 1</a>
                </li>
                <li>
                  <a href="#">Item 2</a>
                </li>
                <li>
                  <a href="#">Item 3</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">
                <a href="#" className="flex items-center gap-x-1.5 text-sm leading-6 font-semibold text-white">
                  현장 사진 <ArrowUpRight className="size-4" />
                </a>
              </h3>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">회사 소개</h3>
              <ul className="space-y-3 text-sm leading-6 text-gray-400">
                <li>
                  <a href="#">대명거미크레인 소개</a>
                </li>
                <li>
                  <a href="#">연혁</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">
                <a href="#" className="flex items-center gap-x-1.5 text-sm leading-6 font-semibold text-white">
                  문의하기 <ArrowUpRight className="size-4" />
                </a>
              </h3>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                <picture>
                  <img src="/platform-basket.png" alt="platform-basket" className="h-6 w-auto" />
                </picture>
              </h3>
              <ul className="space-y-3 text-sm leading-6 text-gray-400">
                <li>
                  <a href="https://www.platformbasket.com/en/spider-lifts/">Spider lifts</a>
                </li>
                <li>
                  <a href="https://www.platformbasket.com/en/rail-boom-lifts/">Rail boom lifts</a>
                </li>
              </ul>
            </div>
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
