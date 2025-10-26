import Catalog from "@/app/(app)/catalog";
import { Construction } from "@/app/(app)/construction";
import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Mail, PhoneCall, Printer, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative -mt-16 min-h-dvh overflow-hidden">
        <div className="absolute flex size-full items-center justify-center p-6">
          <div className="flex flex-col gap-8 px-8">
            <h1 className="pb-1 text-center text-3xl leading-snug font-bold tracking-tight text-pretty break-keep text-white sm:text-4xl md:text-5xl lg:text-6xl">
              철저한 안전 교육으로 사고 예방에 최선을 다하며 <br className="hidden md:block" /> 국내 최대의 크레인과
              베테랑 기사들을 보유하고 있습니다.
            </h1>
            <div className="z-20 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="bg-secondary">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <PhoneCall className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center">
                        <h3 className="font-semibold">대표번호</h3>
                      </div>
                      <ul className="text-muted-foreground flex flex-col gap-1 font-medium">
                        <li>02-2216-6000, 031-563-0040</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <Printer className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center">
                        <h3 className="font-semibold">팩스번호</h3>
                      </div>
                      <ul className="text-muted-foreground flex flex-col gap-1 font-medium">
                        <li>031-563-1391</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <Smartphone className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center">
                        <h3 className="font-semibold">핸드폰</h3>
                      </div>
                      <ul className="text-muted-foreground flex flex-col gap-1 font-medium">
                        <li>010-7179-5277</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <Mail className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center">
                        <h3 className="font-semibold">이메일</h3>
                      </div>
                      <ul className="text-muted-foreground flex flex-col gap-1 font-medium">
                        <li>b6205425@naver.com</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 size-full min-w-full bg-black/70 select-none" />
        <video
          width="1920"
          height="960"
          className="absolute -z-20 mt-4 size-full min-w-full object-cover select-none"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="intro.mp4" type="video/mp4" />
        </video>
      </div>
      <Separator />
      <Container>
        <Catalog />
      </Container>
      <Separator />
      <Container>
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="mb-16 flex flex-col items-center gap-4">
            <h1 className="text-center text-3xl font-bold lg:max-w-3xl lg:text-5xl">공식 딜러</h1>
            <p className="text-muted-foreground text-center text-lg font-medium md:max-w-4xl lg:text-xl">
              Platform Basket과 Befard의 공식 인증 딜러입니다
            </p>
          </div>
          {/* Brand Cards */}
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {/* Platform Basket Card */}
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6 flex items-start gap-4">
                  <picture className="size-16 shrink-0 overflow-hidden rounded-xl">
                    <img src="/icon-platform.png" alt="icon-platform" />
                  </picture>
                  <div>
                    <h2 className="mb-2 text-2xl font-bold">Platform Basket</h2>
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      공식 딜러
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Platform Basket의 정품을 공급하는 공식 인증 딜러입니다. 모든 제품은 정식 유통 경로를 통해 공급되며,
                  품질을 보증합니다.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>정품 보증</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>공식 A/S 지원</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>최신 제품 라인업</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Befard Card */}
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6 flex items-start gap-4">
                  <picture className="size-16 shrink-0 overflow-hidden rounded-xl">
                    <img src="/icon-befard.png" alt="icon-befard" />
                  </picture>
                  <div>
                    <h2 className="mb-2 text-2xl font-bold">Befard</h2>
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      공식 딜러
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Befard의 정품을 공급하는 공식 인증 딜러입니다. 모든 제품은 정식 유통 경로를 통해 공급되며, 품질을
                  보증합니다.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>정품 보증</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>공식 A/S 지원</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>최신 제품 라인업</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center">
            <div className="bg-primary/5 inline-flex items-center gap-2 rounded-full px-6 py-3">
              <CheckCircle2 className="text-primary h-5 w-5" />
              <span className="font-medium">신뢰할 수 있는 공식 파트너</span>
            </div>
          </div>
        </div>
      </Container>
      <Separator />
      <Container>
        <Construction />
      </Container>
    </div>
  );
}
