"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Feature {
  title: string;
  description: string;
  image: string;
}

export function Construction() {
  const features: Feature[] = [
    {
      title: "구례 화엄사 각황전 앞 석등 교체",
      description: "문화재 보호와 전통 유지를 위한 정밀한 석등 교체 작업을 성공적으로 완료했습니다.",
      image: "/main/구례 화엄사 각황전 앞 석등 교체/01.jpg"
    },
    {
      title: "구례 화엄사 각황전 앞 석등 교체",
      description: "문화재 보호와 전통 유지를 위한 정밀한 석등 교체 작업을 성공적으로 완료했습니다.",
      image: "/main/구례 화엄사 각황전 앞 석등 교체/02.jpg"
    },
    {
      title: "국회의사당 이순신 장군상 교체 작업",
      description: "국가 상징물의 안전한 교체 작업을 전문 기술력으로 수행했습니다.",
      image: "/main/국회의사당 이순신 장군상 교체 작업/01.jpg"
    },
    {
      title: "국회의사당 이순신 장군상 교체 작업",
      description: "국가 상징물의 안전한 교체 작업을 전문 기술력으로 수행했습니다.",
      image: "/main/국회의사당 이순신 장군상 교체 작업/02.jpg"
    },
    {
      title: "서울역 스크린 설치 작업",
      description: "대형 공공시설의 디지털 스크린 설치를 정확하고 안전하게 완수했습니다.",
      image: "/main/서울역 스크린 설치 작업/01.jpg"
    },
    {
      title: "서울역 스크린 설치 작업",
      description: "대형 공공시설의 디지털 스크린 설치를 정확하고 안전하게 완수했습니다.",
      image: "/main/서울역 스크린 설치 작업/02.jpg"
    }
  ];

  return (
    <>
      <div className="mb-16 flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold lg:max-w-3xl lg:text-5xl">공사실적</h1>
        <p className="text-muted-foreground text-center text-lg font-medium text-balance break-keep md:max-w-4xl lg:text-xl">
          우수한 기술력과 풍부한 경험으로 완성한 프로젝트를 소개합니다.
        </p>
      </div>
      <div className="relative flex justify-center px-4 md:px-12">
        <Carousel
          className="w-full max-w-(--breakpoint-2xl)"
          opts={{
            align: "start",
            loop: true
          }}
          plugins={[
            Autoplay({
              delay: 3000
            })
          ]}
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index} className="relative overflow-hidden">
                <img src={feature.image} alt={feature.title} className="aspect-video w-full rounded-xl object-cover" />
                <div className="absolute top-0 left-4 z-10 size-full rounded-xl bg-[radial-gradient(100%_33%_at_left_bottom,rgba(0,0,0,0.65)_0%,rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center gap-1 text-white lg:bottom-8">
                  <h2
                    className="text-base font-bold whitespace-nowrap lg:text-3xl"
                    style={{ textShadow: "0px 0px 5px rgba(0, 0, 0, 0.6)" }}
                  >
                    {feature.title}
                  </h2>
                  <p
                    className="hidden text-lg font-medium lg:block"
                    style={{ textShadow: "0px 0px 5px rgba(0, 0, 0, 0.6)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
