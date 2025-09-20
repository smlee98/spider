"use client";

import Container from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowLeft, BookText, CloudDownload } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { dictSpider } from "../../../constants";
import { spider } from "../../constants";

export default function SpiderDetailPage() {
  const params = useParams();
  const brandParam = params.brand as string;
  const modelParam = params.id as string;

  const brand = spider.find((b) => b.brandName.toLowerCase() === brandParam);
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
            <Link href="/equipment/spider" className={buttonVariants({ variant: "outline" })}>
              <ArrowLeft className="size-4" />
              뒤로가기
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="gap-0 overflow-hidden py-0">
              <CardContent className="bg-muted flex aspect-square items-center justify-center p-8">
                <picture>
                  <img
                    src={`/equipment/spider/${brand.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
                    alt={`${brand.brandName}/${equipment.modelName}`}
                    className="h-auto max-h-80 w-full max-w-full transition-all hover:scale-125 md:max-h-[480px]"
                  />
                </picture>
              </CardContent>
            </Card>

            <Card className="gap-0 pb-0">
              <CardHeader className="gap-0 border-b pb-0">
                <CardTitle>기본 사양</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictSpider.bodyWeight}
                      </TableCell>
                      <TableCell className="px-6">{equipment.weight}</TableCell>
                    </TableRow>
                    {equipment.weightWithJib && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictSpider.withJibWeight}
                        </TableCell>
                        <TableCell className="px-6">{equipment.weightWithJib}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictSpider.maxHeightVertical}
                      </TableCell>
                      <TableCell className="px-6">{equipment.maxHeight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictSpider.maxLengthHorizontal}
                      </TableCell>
                      <TableCell className="px-6">{equipment.maxLength}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictSpider.maxSafeLoad}
                      </TableCell>
                      <TableCell className="px-6">{equipment.maxSafeLoad}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictSpider.outriggerWidth}
                      </TableCell>
                      <TableCell className="px-6">{equipment.outriggerWidth}</TableCell>
                    </TableRow>
                    {equipment.maxOutriggerLoad && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictSpider.maxOutriggerLoad}
                        </TableCell>
                        <TableCell className="px-6">{equipment.maxOutriggerLoad}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictSpider.operationType}
                      </TableCell>
                      <TableCell className="px-6">{equipment.operationType}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>라인별 최대 허용 하중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {equipment.maxLoad1Line && (
                  <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                    <span className="text-muted-foreground font-medium">{dictSpider.maxAllowableLoad1Line}</span>
                    <span className="font-semibold">{equipment.maxLoad1Line}</span>
                  </div>
                )}
                {equipment.maxLoad2Lines && (
                  <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                    <span className="text-muted-foreground font-medium">{dictSpider.maxAllowableLoad2Lines}</span>
                    <span className="font-semibold">{equipment.maxLoad2Lines}</span>
                  </div>
                )}
                {equipment.maxLoad3Lines && (
                  <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                    <span className="text-muted-foreground font-medium">{dictSpider.maxAllowableLoad3Lines}</span>
                    <span className="font-semibold">{equipment.maxLoad3Lines}</span>
                  </div>
                )}
                {equipment.maxLoad4Lines && (
                  <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                    <span className="text-muted-foreground font-medium">{dictSpider.maxAllowableLoad4Lines}</span>
                    <span className="font-semibold">{equipment.maxLoad4Lines}</span>
                  </div>
                )}
                {equipment.maxLoad5Lines && (
                  <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                    <span className="text-muted-foreground font-medium">{dictSpider.maxAllowableLoad5Lines}</span>
                    <span className="font-semibold">{equipment.maxLoad5Lines}</span>
                  </div>
                )}
                {equipment.maxLoad6Lines && (
                  <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                    <span className="text-muted-foreground font-medium">{dictSpider.maxAllowableLoad6Lines}</span>
                    <span className="font-semibold">{equipment.maxLoad6Lines}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
      <div className="bg-muted relative bg-[url(/equipment/disegno.svg)] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center justify-center gap-4 bg-[#ddd]/95 py-40">
          <CloudDownload className="text-muted-foreground size-20" />
          <span className="text-xl font-semibold">PDF 다운로드</span>
          <div className="flex items-center gap-4">
            {equipment.brochurePdf && (
              <Button size="lg" variant="default" className="font-semibold" asChild>
                <a href={equipment.brochurePdf} download>
                  <BookText />
                  브로슈어 다운로드
                </a>
              </Button>
            )}
            {equipment.technicalDataPdf && (
              <Button size="lg" variant="default" className="font-semibold" asChild>
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
