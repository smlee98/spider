import Catalog from "@/app/(app)/catalog";
import { Construction } from "@/app/(app)/construction";
import { Animations } from "@/components/animation";
import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative -mt-16 min-h-dvh overflow-hidden">
        {/* <div className="absolute flex size-full flex-col items-center justify-center gap-8 p-6 lg:gap-16">
          <h1 className="text-center text-3xl leading-snug font-bold tracking-tight text-pretty break-keep text-white sm:text-4xl md:text-5xl lg:text-7xl">
            철저한 안전 교육으로 사고 예방에 최선을 다하며 <br className="hidden md:block" /> 국내 최대의 크레인과
            베테랑 기사들을 보유하고 있습니다.
          </h1>
        </div> */}
        <div className="absolute top-24 z-10 flex w-full items-start justify-between gap-4 px-8">
          <div className="flex flex-col items-center gap-1 text-lg font-semibold text-white">
            <picture>
              <img src="/logo.png" alt="logo" className="h-8 w-auto shrink-0 invert lg:h-12" />
            </picture>
          </div>
          <div className="flex flex-col items-end gap-4 text-lg font-semibold text-white lg:flex-row">
            <picture>
              <img src="/authorized-dealer.png" alt="authorized-dealer" className="h-8 w-auto lg:h-10" />
            </picture>
            <picture>
              <img src="/official-dealer.png" alt="official-dealer" className="h-6 w-auto lg:h-8" />
            </picture>
          </div>
        </div>
        <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          <Animations variant="scrollDown" className="size-4! text-white lg:size-8!" />
          <span className="text-white">Scroll</span>
        </div>
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
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      </div>
      <Separator />
      <Container>
        <Catalog />
      </Container>
      <Separator />
      <Container>
        <Construction />
      </Container>
      <Separator />
      <Container>
        <div className="container mx-auto px-4 py-16">
          <div className="mb-16 flex flex-col items-center gap-4">
            <h1 className="text-center text-3xl font-bold lg:max-w-3xl lg:text-5xl">공식 딜러</h1>
            <p className="text-muted-foreground text-center text-lg font-medium text-balance break-keep md:max-w-4xl lg:text-xl">
              Platform Basket과 Befard의 공식 인증 딜러입니다.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
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
                <p className="text-muted-foreground mb-6 text-balance break-keep">
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
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6 flex items-start gap-4">
                  <picture className="size-16 shrink-0 overflow-hidden rounded-xl">
                    <img src="/icon-ruthmann.png" alt="icon-ruthmann" />
                  </picture>
                  <div>
                    <h2 className="mb-2 text-2xl font-bold">STEIGER® | RUTHMANN</h2>
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      공식 딜러
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 text-balance break-keep">
                  STEIGER® | RUTHMANN의 정품을 공급하는 공식 인증 딜러입니다. 모든 제품은 정식 유통 경로를 통해
                  공급되며, 품질을 보증합니다.
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
          <div className="mt-16 text-center">
            <div className="bg-primary/5 inline-flex items-center gap-2 rounded-full px-6 py-3">
              <CheckCircle2 className="text-primary h-5 w-5" />
              <span className="font-medium">신뢰할 수 있는 공식 파트너</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
