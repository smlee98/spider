"use client";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface ConstructionType {
  feature1: Feature;
  feature2: Feature;
  feature3: Feature;
  feature4: Feature;
  feature5: Feature;
  feature6: Feature;
}

export function Construction() {
  const Construction: ConstructionType = {
    feature1: {
      title: "구례 화엄사 각황전 앞 석등 교체",
      description: "문화재 보호와 전통 유지를 위한 정밀한 석등 교체 작업을 성공적으로 완료했습니다.",
      image: "/main/구례 화엄사 각황전 앞 석등 교체/01.jpg"
    },
    feature2: {
      title: "구례 화엄사 석등 교체",
      description: "전통 문화재의 가치를 보존하며 안전한 작업을 진행했습니다.",
      image: "/main/구례 화엄사 각황전 앞 석등 교체/02.jpg"
    },
    feature3: {
      title: "국회의사당 이순신 장군상 교체 작업",
      description: "국가 상징물의 안전한 교체 작업을 전문 기술력으로 수행했습니다.",
      image: "/main/국회의사당 이순신 장군상 교체 작업/01.jpg"
    },
    feature4: {
      title: "국회의사당 이순신 장군상 설치",
      description: "역사적 상징물의 정확한 설치와 안전 관리를 수행했습니다.",
      image: "/main/국회의사당 이순신 장군상 교체 작업/02.jpg"
    },
    feature5: {
      title: "서울역 스크린 설치 작업",
      description: "대형 공공시설의 디지털 스크린 설치를 정확하고 안전하게 완수했습니다.",
      image: "/main/서울역 스크린 설치 작업/01.jpg"
    },
    feature6: {
      title: "서울역 대형 스크린 설치",
      description: "최신 디지털 장비의 정밀한 설치 작업을 완벽하게 수행했습니다.",
      image: "/main/서울역 스크린 설치 작업/02.jpg"
    }
  };

  const { feature1, feature2, feature3, feature4, feature5, feature6 } = Construction;
  return (
    <>
      <div className="mb-24 flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold lg:max-w-3xl lg:text-5xl">공사실적</h1>
        <p className="text-muted-foreground text-center text-lg font-medium md:max-w-4xl lg:text-xl">
          우수한 기술력과 풍부한 경험으로 완성한 프로젝트를 소개합니다.
        </p>
      </div>
      <div className="relative flex justify-center">
        <div className="relative flex w-full flex-col rounded-xl border md:w-1/2 lg:w-full">
          <div className="relative flex flex-col lg:flex-row">
            <div className="flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
              <h2 className="text-xl font-semibold">{feature1.title}</h2>
              <p className="text-muted-foreground">{feature1.description}</p>
              <img
                src={feature1.image}
                alt={feature1.title}
                className="mt-8 aspect-[1.5] h-full w-full rounded-xl object-cover lg:aspect-[2.4]"
              />
            </div>
            <div className="flex flex-col justify-between p-10 lg:w-2/5">
              <h2 className="text-xl font-semibold">{feature2.title}</h2>
              <p className="text-muted-foreground">{feature2.description}</p>
              <img
                src={feature2.image}
                alt={feature2.title}
                className="mt-8 aspect-[1.45] h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
          <div className="relative flex flex-col border-t border-solid lg:flex-row">
            <div className="flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
              <h2 className="text-xl font-semibold">{feature3.title}</h2>
              <p className="text-muted-foreground">{feature3.description}</p>
              <img
                src={feature3.image}
                alt={feature3.title}
                className="mt-8 aspect-[1.45] h-full w-full rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-10 lg:w-3/5">
              <h2 className="text-xl font-semibold">{feature4.title}</h2>
              <p className="text-muted-foreground">{feature4.description}</p>
              <img
                src={feature4.image}
                alt={feature4.title}
                className="mt-8 aspect-[1.5] h-full w-full rounded-xl object-cover lg:aspect-[2.4]"
              />
            </div>
          </div>
          <div className="relative flex flex-col border-t border-solid lg:flex-row">
            <div className="flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
              <h2 className="text-xl font-semibold">{feature5.title}</h2>
              <p className="text-muted-foreground">{feature5.description}</p>
              <img
                src={feature5.image}
                alt={feature5.title}
                className="mt-8 aspect-[1.5] h-full w-full rounded-xl object-cover lg:aspect-[2.4]"
              />
            </div>
            <div className="flex flex-col justify-between p-10 lg:w-2/5">
              <h2 className="text-xl font-semibold">{feature6.title}</h2>
              <p className="text-muted-foreground">{feature6.description}</p>
              <img
                src={feature6.image}
                alt={feature6.title}
                className="mt-8 aspect-[1.45] h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
