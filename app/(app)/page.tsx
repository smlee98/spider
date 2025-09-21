import { AuroraBackground } from "@/components/aurora-background";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Printer, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <AuroraBackground>
      <div className="flex flex-col gap-8 px-8">
        <h1 className="pb-1 text-center text-3xl leading-snug font-bold tracking-tight text-pretty break-keep sm:text-4xl md:text-5xl lg:text-6xl">
          철저한 안전 교육으로 사고 예방에 최선을 다하며 <br className="hidden md:block" /> 국내 최대의 크레인과 베테랑
          기사들을 보유하고 있습니다.
        </h1>
        <div className="z-50 grid grid-cols-1 gap-8 md:grid-cols-3">
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
        </div>
      </div>
    </AuroraBackground>
  );
}
