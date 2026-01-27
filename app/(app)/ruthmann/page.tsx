import Container from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steigerProducts = [
  {
    modelName: "T700HF",
    displayName: "STEIGER® T 700 HF",
    workingHeight: "70.00 m",
    liftingHeight: "68.00 m",
    outreach: "41.00 m",
    swivelingAngle: "220°",
    workingCageLoad: "600 kg",
    vehicleClass: "> 7.5 t",
    image: "/ruthmann/t700hf-list.jpg"
  },
  {
    modelName: "T750HF",
    displayName: "STEIGER® T 750 HF",
    workingHeight: "75.00 m",
    liftingHeight: "73.00 m",
    outreach: "42.20 m",
    swivelingAngle: "220°",
    workingCageLoad: "600 kg",
    vehicleClass: "> 7.5 t",
    image: "/ruthmann/t750hf-list.png"
  },
  {
    modelName: "T900HF",
    displayName: "STEIGER® T 900 HF",
    workingHeight: "90.00 m",
    liftingHeight: "88.00 m",
    outreach: "42.00 m",
    swivelingAngle: "220°",
    workingCageLoad: "600 kg",
    vehicleClass: "> 7.5 t",
    image: "/ruthmann/t900hf-list.png"
  },
  {
    modelName: "T1000HF",
    displayName: "STEIGER® T 1000 HF",
    workingHeight: "100.00 m",
    liftingHeight: "98.00 m",
    outreach: "39.00 m",
    swivelingAngle: "220°",
    workingCageLoad: "600 kg",
    vehicleClass: "> 7.5 t",
    image: "/ruthmann/t1000hf-list.jpg"
  }
];

export default function RuthmannPage() {
  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="relative flex h-64 items-center justify-center bg-gradient-to-b from-[#f08a00] to-[#c97300]">
        <div className="absolute inset-0 bg-[url('/equipment/disegno.svg')] bg-cover bg-center opacity-10" />
        <div className="z-10 flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white">RUTHMANN</h1>
          <p className="text-lg font-medium text-white/90">STEIGER® - Truck-Mounted Aerial Work Platforms</p>
        </div>
      </div>

      <Container className="max-w-(--breakpoint-xl)">
        <div className="flex flex-col gap-12">
          {/* 소개 섹션 */}
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold">RUTHMANN STEIGER®</h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed text-balance">
              We like to compare our company principles to those of a mountain climber. Dedication, intelligence,
              perseverance, and goal orientation will safely get us to the top of the mountain. The key to success is
              professionalism and customer orientation.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed text-balance">
              For 65 years, STEIGER® has not only been the most popular brand name in the industry but has also stood
              for creative technology, safety and high quality on the international truck-mounted aerial platform stage.
            </p>
          </div>

          {/* 제품 그리드 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {steigerProducts.map((product) => (
              <Link key={product.modelName} href={`/ruthmann/${product.modelName.toLowerCase()}`} className="group">
                <Card className="h-full gap-0 overflow-hidden py-0 transition-all group-hover:ring-2 group-hover:ring-[#f08a00] hover:shadow-lg">
                  <CardContent className="bg-muted flex aspect-[4/3] items-center justify-center p-4">
                    <img
                      src={encodeURI(product.image)}
                      alt={product.displayName}
                      className="h-full w-full object-contain transition-transform group-hover:scale-105"
                    />
                  </CardContent>
                  <CardHeader className="gap-4 border-t py-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-bold">{product.displayName}</span>
                      <ArrowRight className="text-muted-foreground size-5 transition-transform group-hover:translate-x-1 group-hover:text-[#f08a00]" />
                    </CardTitle>
                    <div className="text-muted-foreground flex flex-col gap-1 text-sm">
                      <div className="flex justify-between">
                        <span>Working height:</span>
                        <span className="text-foreground font-semibold">{product.workingHeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lifting height:</span>
                        <span className="text-foreground font-semibold">{product.liftingHeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outreach:</span>
                        <span className="text-foreground font-semibold">{product.outreach}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Swivelling angle of upper boom:</span>
                        <span className="text-foreground font-semibold">{product.swivelingAngle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Working cage load:</span>
                        <span className="text-foreground font-semibold">{product.workingCageLoad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vehicle class:</span>
                        <span className="text-foreground font-semibold">{product.vehicleClass}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
