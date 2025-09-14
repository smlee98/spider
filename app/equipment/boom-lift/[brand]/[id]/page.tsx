"use client";

import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowLeft, ImageOff } from "lucide-react";
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

  const equipment = brand.equipments.find((e) => e.model.toLowerCase() === modelParam);
  if (!equipment) {
    notFound();
  }

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link
            href="/equipment/boom-lift"
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
          <h1 className="text-foreground text-4xl font-black md:text-5xl">{equipment.model}</h1>
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
                    <TableCell className="text-muted-foreground px-6 font-semibold">{dictBoomLift.bodyWeight}</TableCell>
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
  );
}