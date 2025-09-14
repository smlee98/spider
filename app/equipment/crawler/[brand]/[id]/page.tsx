"use client";

import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowLeft, ImageOff } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { dictCrawler } from "../../../constants";
import { crawler } from "../../constants";

export default function CrawlerDetailPage() {
  const params = useParams();
  const brandParam = params.brand as string;
  const modelParam = params.id as string;

  const brand = crawler.find((b) => b.brandName.toLowerCase() === brandParam);
  if (!brand) {
    notFound();
  }

  const equipment = brand.equipments.find((e) => e.modelName.toLowerCase() === modelParam);
  if (!equipment) {
    notFound();
  }

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link
            href="/equipment/crawler"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="size-4" />
            뒤로가기
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Badge variant="secondary" className="w-fit font-semibold">
            {brand.brandName}
          </Badge>
          <h1 className="text-foreground text-4xl font-black md:text-5xl">{equipment.modelName}</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="gap-0 overflow-hidden py-0">
            <CardContent className="bg-muted flex aspect-square items-center justify-center p-8">
              <ImageOff className="text-muted-foreground size-16" />
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader className="gap-0 border-b pb-0">
              <CardTitle>기본 사양</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground px-6 font-semibold">{dictCrawler.bodyWeight}</TableCell>
                    <TableCell className="px-6">{equipment.bodyWeight}</TableCell>
                  </TableRow>
                  {equipment.withJibWeight && (
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6 font-semibold">
                        {dictCrawler.withJibWeight}
                      </TableCell>
                      <TableCell className="px-6">{equipment.withJibWeight}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="text-muted-foreground px-6 font-semibold">
                      {dictCrawler.maxHeightVertical}
                    </TableCell>
                    <TableCell className="px-6">{equipment.maxHeightVertical}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground px-6 font-semibold">
                      {dictCrawler.maxLengthHorizontal}
                    </TableCell>
                    <TableCell className="px-6">{equipment.maxLengthHorizontal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground px-6 font-semibold">{dictCrawler.maxSafeLoad}</TableCell>
                    <TableCell className="px-6">{equipment.maxSafeLoad}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground px-6 font-semibold">
                      {dictCrawler.operationType}
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
              {equipment.maxAllowableLoad1Line && (
                <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                  <span className="text-muted-foreground font-medium">{dictCrawler.maxAllowableLoad1Line}</span>
                  <span className="font-semibold">{equipment.maxAllowableLoad1Line}</span>
                </div>
              )}
              {equipment.maxAllowableLoad2Lines && (
                <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                  <span className="text-muted-foreground font-medium">{dictCrawler.maxAllowableLoad2Lines}</span>
                  <span className="font-semibold">{equipment.maxAllowableLoad2Lines}</span>
                </div>
              )}
              {equipment.maxAllowableLoad3Lines && (
                <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                  <span className="text-muted-foreground font-medium">{dictCrawler.maxAllowableLoad3Lines}</span>
                  <span className="font-semibold">{equipment.maxAllowableLoad3Lines}</span>
                </div>
              )}
              {equipment.maxAllowableLoad4Lines && (
                <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                  <span className="text-muted-foreground font-medium">{dictCrawler.maxAllowableLoad4Lines}</span>
                  <span className="font-semibold">{equipment.maxAllowableLoad4Lines}</span>
                </div>
              )}
              {equipment.maxAllowableLoad5Lines && (
                <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                  <span className="text-muted-foreground font-medium">{dictCrawler.maxAllowableLoad5Lines}</span>
                  <span className="font-semibold">{equipment.maxAllowableLoad5Lines}</span>
                </div>
              )}
              {equipment.maxAllowableLoad6Lines && (
                <div className="bg-muted flex justify-between rounded-xl px-4 py-3">
                  <span className="text-muted-foreground font-medium">{dictCrawler.maxAllowableLoad6Lines}</span>
                  <span className="font-semibold">{equipment.maxAllowableLoad6Lines}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}