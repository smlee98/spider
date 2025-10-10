"use client";

import { ImageZoom } from "@/components/image-zoom";
import Container from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowLeft, BookText, CloudDownload } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { dictBoomLift } from "../../../constants";
import { boomLift } from "../../constants";

export default function BoomLiftDetailPage() {
  const params = useParams();
  const brandParam = params.brand as string;
  const modelParam = params.id as string;

  const brand = boomLift.find((b) => b.brandName.toLowerCase() === brandParam);
  if (!brand) {
    notFound();
  }

  const equipment = brand.equipments.find((e) => e.modelName.toLowerCase() === modelParam);
  if (!equipment) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <h4 className="text-muted-foreground font-semibold">{brand.brandName}</h4>
              <h1 className="text-foreground text-3xl font-black md:text-4xl">{equipment.modelName}</h1>
            </div>
            <Link href="/equipment/boom-lift" className={buttonVariants({ variant: "outline" })}>
              <ArrowLeft className="size-4" />
              목록 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* <picture>
                  <img
                    src={`/equipment/boom-lift/${brand.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
                    alt={`${brand.brandName}/${equipment.modelName}`}
                    className="h-auto max-h-80 w-full max-w-full transition-all hover:scale-125 md:max-h-[480px]"
                  />
                </picture> */}
            <ImageZoom
              src={`/equipment/boom-lift/${brand.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
              alt={`${brand.brandName}/${equipment.modelName}`}
              className="w-full"
              zoomLevel={3.5}
            />

            <Card className="gap-0 pb-0">
              <CardHeader className="gap-0 border-b pb-0">
                <CardTitle>기본 사양</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictBoomLift.bodyWeight}
                      </TableCell>
                      <TableCell className="px-6">{equipment.bodyWeight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictBoomLift.maxHeightVertical}
                      </TableCell>
                      <TableCell className="px-6">{equipment.maxHeightVertical}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictBoomLift.maxLengthHorizontal}
                      </TableCell>
                      <TableCell className="px-6">{equipment.maxLengthHorizontal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictBoomLift.belowGroundHeight}
                      </TableCell>
                      <TableCell className="px-6">{equipment.belowGroundHeight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictBoomLift.platformMaxLoad}
                      </TableCell>
                      <TableCell className="px-6">{equipment.platformMaxLoad}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictBoomLift.platformSize}
                      </TableCell>
                      <TableCell className="px-6">{equipment.platformSize}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
      <div className="relative bg-[#ddd] bg-[url(/equipment/disegno.svg)] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center justify-center gap-4 bg-[#ddd]/95 py-40">
          <CloudDownload className="size-20 text-black/75" />
          <span className="text-xl font-semibold text-black">PDF 다운로드</span>
          <div className="flex items-center gap-4">
            {equipment.brochurePdf && (
              <Button size="lg" variant="default" className="bg-black font-semibold text-white" asChild>
                <a href={equipment.brochurePdf} download>
                  <BookText />
                  브로슈어 다운로드
                </a>
              </Button>
            )}
            {equipment.technicalDataPdf && (
              <Button size="lg" variant="default" className="bg-black font-semibold text-white" asChild>
                <a href={equipment.technicalDataPdf} download>
                  <BookText />
                  기술데이터 다운로드
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
