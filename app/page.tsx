import { AuroraBackground } from "@/components/aurora-background";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <AuroraBackground>
      <h1 className="mb-6 pb-1 text-center text-3xl leading-snug font-bold tracking-tight sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
        철저한 안전 교육으로 사고 예방에 최선을 다하며 <br className="hidden md:block" /> 국내 최대의 크레인과 베테랑
        기사들을 보유하고 있습니다.
      </h1>
      <Button size="lg">
        보유 장비 둘러보기
        <ArrowRight />
      </Button>
    </AuroraBackground>
  );
}
