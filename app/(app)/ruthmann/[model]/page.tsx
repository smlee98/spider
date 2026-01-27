"use client";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";

const steigerProducts = {
  t700hf: {
    modelName: "T700HF",
    displayName: "STEIGER® T 700 HF",
    tagline: "With the new STEIGER® T 700 HF, RUTHMANN presents a further highlight of German engineering.",
    image: "/equipment/Ruthmann Steiger/T700HF/T700HF.png",
    gallery: [
      "/ruthmann/t700hf/gallery-1.jpg",
      "/ruthmann/t700hf/gallery-2.jpg",
      "/ruthmann/t700hf/gallery-3.jpg",
      "/ruthmann/t700hf/gallery-4.jpg"
    ],
    workingDiagram: "/ruthmann/t700hf/working-diagram.png",
    features: [
      "70 m working height",
      "41 m outreach, 24.6 m upper boom outreach",
      "11.99 m total vehicle length: compact design",
      "Top performance data due to multi-bevelled boom technology",
      "Highflex jib (RÜSSEL®) – 220° swivel range",
      "Highflex working basket – 440° rotation angle",
      "Generous 600 kg working cage load capacity",
      "Working below ground possible",
      "Automatic set-up/retraction mechanism",
      "Hydraulically extendable aluminium working cage",
      "Maintenance-friendly boom system"
    ],
    specs: [
      { label: "Working height", value: "70.00 m" },
      { label: "Lifting height", value: "68.00 m" },
      { label: "Outreach", value: "41.00 m" },
      { label: "Upper boom outreach", value: "24.60 m" },
      { label: "Total vehicle length", value: "11.99 m" },
      { label: "Total height", value: "< 3.99 m" },
      { label: "Swivelling angle (upper boom)", value: "180°" },
      { label: "Swivelling angle (jib/RÜSSEL®)", value: "220°" },
      { label: "Range of rotation", value: "500°" },
      { label: "Work basket load capacity", value: "600 kg" },
      { label: "Permissible inclination", value: "2°" },
      { label: "Permissible total weight", value: "> 32,000 kg" }
    ],
    description:
      "With the new STEIGER® T 700 HF, RUTHMANN presents a further highlight of German engineering. This model combines an impressive 70 m working height with a compact design of less than 12 m total vehicle length, making it ideal for work in confined spaces."
  },
  t750hf: {
    modelName: "T750HF",
    displayName: "STEIGER® T 750 HF",
    tagline: "HEIGHT performance Maximus",
    image: "/equipment/Ruthmann Steiger/T750HF/T750HF.png",
    gallery: ["/ruthmann/t750hf/gallery-1.jpg", "/ruthmann/t750hf/gallery-2.jpg", "/ruthmann/t750hf/gallery-3.jpg"],
    workingDiagramSky: "/ruthmann/t750hf/working-diagram-sky.jpg",
    workingDiagramHeight: "/ruthmann/t750hf/working-diagram-height.jpg",
    dualConcept: true,
    features: [
      "75 m working height",
      "42.2 m outreach",
      "13.99 m total vehicle length (depends on vehicle type)",
      "Top performance data due to multi-bevelled boom technology",
      "'Standing' working basket for under/up and all over/back possibilities",
      "Generous 600 kg working cage load capacity",
      "Working below ground possible",
      "More possibilities with HEIGHT performance special features",
      "Automatic set-up/retraction mechanism",
      "Hydraulically extendable aluminium working cage",
      "Maintenance-friendly boom system"
    ],
    specs: [
      { label: "Working height", value: "75.00 m" },
      { label: "Lifting height", value: "73.00 m" },
      { label: "Outreach", value: "42.20 m" },
      { label: "Total vehicle length", value: "13.99 m" },
      { label: "Total height", value: "< 3.99 m" },
      { label: "Swivelling angle (upper boom)", value: "180°" },
      { label: "Swivelling angle (jib/RÜSSEL®)", value: "220°" },
      { label: "Range of rotation", value: "500°" },
      { label: "Work basket size", value: "2.42 x 0.97 m" },
      { label: "Maximum work basket size", value: "3.82 x 0.97 m" },
      { label: "Work basket load capacity", value: "600 kg" },
      { label: "Permissible inclination", value: "2°" },
      { label: "Permissible total weight", value: "> 32,000 kg" }
    ],
    description:
      "The STEIGER® T 750 HF represents HEIGHT performance at its maximum. With 75 m working height and 42.2 m outreach, this model offers outstanding performance for demanding applications."
  },
  t900hf: {
    modelName: "T900HF",
    displayName: "STEIGER® T 900 HF",
    tagline: "SKY performance",
    image: "/equipment/Ruthmann Steiger/T900HF/T900HF.png",
    gallery: ["/ruthmann/t900hf/gallery-1.jpg"],
    skyPerformance: "/ruthmann/t900hf/sky-performance.jpg",
    heightPerformance: "/ruthmann/t900hf/height-performance.jpg",
    dualConcept: true,
    features: [
      "90 m working height",
      "Innovative dual concept for extended application range",
      "Approx. 42 m lateral outreach",
      "Highflex jib (RÜSSEL®) – 220° swivel range",
      "Highflex working basket – 440° rotation angle",
      "5-axle chassis (total weight 48-52 tonnes)",
      "Various cab options (including sleeper cab)",
      "Familiar control and operating technology (COCKPIT)",
      "Extensive range of options available",
      "Many international large equipment references",
      "Worldwide RUTHMANN service support"
    ],
    specs: [
      { label: "Working height", value: "90.00 m" },
      { label: "Lifting height", value: "88.00 m" },
      { label: "Outreach", value: "42.00 m" },
      { label: "Upper boom length", value: "33.00 m" },
      { label: "Total vehicle length", value: "14.99 m" },
      { label: "Total height", value: "4.00 m" },
      { label: "Swivelling angle (jib/RÜSSEL®)", value: "220°" },
      { label: "Range of rotation", value: "540°" },
      { label: "Work basket size", value: "3.82 x 0.97 m" },
      { label: "Work basket load capacity", value: "600 kg" },
      { label: "Permissible inclination", value: "1°" },
      { label: "Permissible total weight", value: "48,000 - 52,000 kg" }
    ],
    description:
      "The SKY performance STEIGER® T 900 HF features DRS (Dynamic Reach System) and an innovative dual concept. It is currently the most flexible large machine in the 90 m class for truck-mounted work platforms, with a lateral outreach of up to 42 m.",
    dualConceptDescription:
      "The innovative dual concept extends application range and provides better utilization. Switch between SKY performance mode for maximum height and HEIGHT performance mode for maximum outreach."
  },
  t1000hf: {
    modelName: "T1000HF",
    displayName: "STEIGER® T 1000 HF",
    tagline: "The difference maker",
    image: "/equipment/Ruthmann Steiger/T1000HF/T1000HF.png",
    gallery: ["/ruthmann/t1000hf/gallery-1.jpg", "/ruthmann/t1000hf/gallery-2.jpg", "/ruthmann/t1000hf/gallery-3.jpg"],
    skyPerformance: "/ruthmann/t1000hf/sky-performance.jpg",
    heightPerformance: "/ruthmann/t1000hf/height-performance.jpg",
    brochure: "/ruthmann/t1000hf/brochure.pdf",
    dualConcept: true,
    features: [
      "Working height: 100 metres",
      "Lateral outreach: up to 39 metres",
      "Weight: from 53 tonnes – 10 t lighter than competition",
      "Compact design: Overall length of 16.35 metres",
      "High-performance technology: designed for maximum stability and efficiency"
    ],
    specs: [
      { label: "Working height", value: "100.00 m" },
      { label: "Lifting height", value: "98.00 m" },
      { label: "Outreach", value: "39.00 m" },
      { label: "Total vehicle length", value: "16.35 m" },
      { label: "Work basket load capacity", value: "600 kg" },
      { label: "Permissible total weight", value: "> 53,000 kg" }
    ],
    description:
      "With the STEIGER® T 1000 HF, RUTHMANN is setting new standards in height access technology. This innovative model reaches an impressive 100 metres working height and a lateral outreach of up to 39 metres - meaning that the 100 m truck-mounted access platform outperforms the competition by up to 10 metres. Built on a standard chassis with a total weight of 53 tonnes or more, the STEIGER® T 1000 HF is around 10 tonnes lighter than comparable models and, with an overall length of just 16.35 metres, is ideal for flexible use.",
    dualConceptDescription:
      "The T 1000 HF features an innovative dual concept with SKY performance mode for maximum working height of 100 m and HEIGHT performance mode for optimized outreach capabilities."
  }
};

type ProductKey = keyof typeof steigerProducts;
type Product = (typeof steigerProducts)[ProductKey];

export default function RuthmannDetailPage() {
  const router = useRouter();
  const params = useParams();
  const modelParam = (params.model as string).toLowerCase();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = steigerProducts[modelParam as ProductKey] as Product | undefined;

  if (!product) {
    notFound();
  }

  const allImages = [product.image, ...(product.gallery || [])];

  return (
    <div className="flex flex-col">
      {/* 헤더 배너 */}
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-b from-[#f08a00] to-[#c97300]">
        <div className="absolute inset-0 bg-[url('/equipment/disegno.svg')] bg-cover bg-center opacity-10" />
        <div className="z-10 flex flex-col items-center gap-2 px-4 text-center">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">{product.displayName}</h1>
          <p className="text-lg font-medium text-white/90">{product.tagline}</p>
        </div>
      </div>

      <Container>
        <div className="flex flex-col gap-12">
          {/* 뒤로가기 버튼 */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
            {"brochure" in product && product.brochure && (
              <Button asChild className="bg-[#f08a00] hover:bg-[#c97300]">
                <a href={product.brochure} download>
                  <Download className="size-4" />
                  Download Brochure (PDF)
                </a>
              </Button>
            )}
          </div>

          {/* 메인 콘텐츠: 이미지 갤러리 + 주요 특징 */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 이미지 갤러리 */}
            <div className="flex flex-col gap-4">
              <Card className="gap-0 overflow-hidden py-0">
                <CardContent className="bg-muted relative aspect-[4/3] overflow-hidden p-8">
                  <img
                    src={encodeURI(allImages[selectedImage])}
                    alt={product.displayName}
                    className="absolute inset-0 h-full w-full object-contain p-8"
                  />
                </CardContent>
              </Card>
              {/* 썸네일 */}
              <div className="grid h-20 grid-cols-5 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-full overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? "border-[#f08a00]" : "border-transparent hover:border-[#f08a00]/50"
                    }`}
                  >
                    <img
                      src={encodeURI(img)}
                      alt={`Thumbnail ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 주요 특징 */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold">Summary of advantages</h2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#f08a00]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Dual Concept 섹션 (T750HF, T900HF, T1000HF) */}
          {"dualConcept" in product && product.dualConcept && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Dual Concept - SKY & HEIGHT Performance</h2>
              {"dualConceptDescription" in product && (
                <p className="text-muted-foreground">{product.dualConceptDescription}</p>
              )}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {"skyPerformance" in product && product.skyPerformance && (
                  <Card className="flex flex-col gap-0 overflow-hidden py-0">
                    <CardContent className="bg-muted flex flex-1 flex-col gap-4 p-4">
                      <h3 className="text-center text-lg font-semibold">SKY Performance Mode</h3>
                      <div className="flex aspect-[4/3] items-center justify-center">
                        <img
                          src={product.skyPerformance}
                          alt="SKY Performance Mode"
                          className="h-full w-full rounded-lg object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {"heightPerformance" in product && product.heightPerformance && (
                  <Card className="flex flex-col gap-0 overflow-hidden py-0">
                    <CardContent className="bg-muted flex flex-1 flex-col gap-4 p-4">
                      <h3 className="text-center text-lg font-semibold">HEIGHT Performance Mode</h3>
                      <div className="flex aspect-[4/3] items-center justify-center">
                        <img
                          src={product.heightPerformance}
                          alt="HEIGHT Performance Mode"
                          className="h-full w-full rounded-lg object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {"workingDiagramSky" in product && product.workingDiagramSky && (
                  <Card className="flex flex-col gap-0 overflow-hidden py-0">
                    <CardContent className="bg-muted flex flex-1 flex-col gap-4 p-4">
                      <h3 className="text-center text-lg font-semibold">Working Diagram (SKY)</h3>
                      <div className="flex aspect-[4/3] items-center justify-center">
                        <img
                          src={product.workingDiagramSky}
                          alt="Working Diagram SKY"
                          className="h-full w-full rounded-lg object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {"workingDiagramHeight" in product && product.workingDiagramHeight && (
                  <Card className="flex flex-col gap-0 overflow-hidden py-0">
                    <CardContent className="bg-muted flex flex-1 flex-col gap-4 p-4">
                      <h3 className="text-center text-lg font-semibold">Working Diagram (HEIGHT)</h3>
                      <div className="flex aspect-[4/3] items-center justify-center">
                        <img
                          src={product.workingDiagramHeight}
                          alt="Working Diagram HEIGHT"
                          className="h-full w-full rounded-lg object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Working Diagram (T700HF) */}
          {"workingDiagram" in product && product.workingDiagram && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Working Diagram</h2>
              <Card className="flex flex-col gap-0 overflow-hidden py-0">
                <CardContent className="bg-muted flex flex-1 flex-col gap-4 p-4">
                  <img
                    src={product.workingDiagram}
                    alt="Working Diagram"
                    className="max-h-[500px] w-full object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* 기술 사양 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Technical specifications</h2>
            <Card className="gap-0 py-0">
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {product.specs.map((spec, index) => (
                      <TableRow key={index}>
                        <TableCell className="bg-muted/50 w-1/2 font-medium">{spec.label}</TableCell>
                        <TableCell className="font-semibold">{spec.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* 상세 설명 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Description</h2>
            <Card className="bg-muted/30">
              <CardContent className="py-6">
                <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
