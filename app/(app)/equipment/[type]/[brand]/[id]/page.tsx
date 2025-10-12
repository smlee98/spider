"use client";

import { ImageZoom } from "@/components/image-zoom";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getMenuById } from "@/lib/menu-data";
import { ArrowLeft, BookText, CloudDownload } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { crains, dictionaries } from "../../../constants";

export default function EquipmentDetailPage() {
  const router = useRouter();
  const { type: typeParam, brand: brandParam, id: modelParam } = useParams();

  // menuData에서 해당 경로를 가진 메뉴 아이템 찾기
  const equipmentMenu = getMenuById("equipment");
  const menuItem = equipmentMenu?.children?.find((item) => item.href === `/equipment/${typeParam}`);

  if (!menuItem) {
    notFound();
  }

  // crains 데이터에서 menuItem.id에 해당하는 장비 찾기
  const typeData = crains.find((c) => c.type === menuItem.id);

  if (!typeData) {
    notFound();
  }

  const brand = typeData.brands.find((b) => b.brandName.toLowerCase() === brandParam);
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
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="size-4" />
              뒤로가기
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ImageZoom
              src={`/equipment/${brand.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
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
                    {equipment.dimensions && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.dimensions}
                        </TableCell>
                        <TableCell className="px-6">{equipment.dimensions}</TableCell>
                      </TableRow>
                    )}
                    {equipment.trackDimensions && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.trackDimensions}
                        </TableCell>
                        <TableCell className="px-6">{equipment.trackDimensions}</TableCell>
                      </TableRow>
                    )}
                    {equipment.boomLength && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.boomLength}
                        </TableCell>
                        <TableCell className="px-6">{equipment.boomLength}</TableCell>
                      </TableRow>
                    )}
                    {equipment.maxLiftingHeight && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxLiftingHeight}
                        </TableCell>
                        <TableCell className="px-6">{equipment.maxLiftingHeight}</TableCell>
                      </TableRow>
                    )}
                    {equipment.maxLiftingLength && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxLiftingLength}
                        </TableCell>
                        <TableCell className="px-6">{equipment.maxLiftingLength}</TableCell>
                      </TableRow>
                    )}
                    {equipment.bodyWeight && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.bodyWeight}
                        </TableCell>
                        <TableCell className="px-6">{equipment.bodyWeight}</TableCell>
                      </TableRow>
                    )}
                    {equipment.maxSafeLoad && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxSafeLoad}
                        </TableCell>
                        <TableCell className="px-6">{equipment.maxSafeLoad}</TableCell>
                      </TableRow>
                    )}
                    {equipment.maxHeightTipLoad && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxHeightTipLoad}
                        </TableCell>
                        <TableCell className="px-6">{equipment.maxHeightTipLoad}</TableCell>
                      </TableRow>
                    )}
                    {equipment.maxLengthTipLoad && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxLengthTipLoad}
                        </TableCell>
                        <TableCell className="px-6">{equipment.maxLengthTipLoad}</TableCell>
                      </TableRow>
                    )}
                    {equipment.speed && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">{dictionaries.speed}</TableCell>
                        <TableCell className="px-6">{equipment.speed}</TableCell>
                      </TableRow>
                    )}
                    {equipment.climbingAbility && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.climbingAbility}
                        </TableCell>
                        <TableCell className="px-6">{equipment.climbingAbility}</TableCell>
                      </TableRow>
                    )}
                    {equipment.workingAngle && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.workingAngle}
                        </TableCell>
                        <TableCell className="px-6">{equipment.workingAngle}</TableCell>
                      </TableRow>
                    )}
                    {equipment.slewingAngle && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.slewingAngle}
                        </TableCell>
                        <TableCell className="px-6">{equipment.slewingAngle}</TableCell>
                      </TableRow>
                    )}
                    {equipment.outriggerExtensionDimensions && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.outriggerExtensionDimensions}
                        </TableCell>
                        <TableCell className="px-6">{equipment.outriggerExtensionDimensions}</TableCell>
                      </TableRow>
                    )}
                    {equipment.maxOutriggerLoad && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxOutriggerLoad}
                        </TableCell>
                        <TableCell className="px-6">{equipment.maxOutriggerLoad}</TableCell>
                      </TableRow>
                    )}
                    {equipment.groundPressure && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.groundPressure}
                        </TableCell>
                        <TableCell className="px-6">{equipment.groundPressure}</TableCell>
                      </TableRow>
                    )}
                    {equipment.powerType && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.powerType}
                        </TableCell>
                        <TableCell className="px-6">{equipment.powerType}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
      {(equipment.isBrochure || equipment.isTechnicalData) && (
        <div className="relative bg-[#ddd] bg-[url(/equipment/disegno.svg)] bg-cover bg-center bg-no-repeat">
          <div className="flex flex-col items-center justify-center gap-4 bg-[#ddd]/95 py-40">
            <CloudDownload className="size-20 text-black/75" />
            <span className="text-xl font-semibold text-black">PDF 다운로드</span>
            <div className="flex items-center gap-4">
              {equipment.isBrochure && (
                <Button size="lg" variant="default" className="bg-black font-semibold text-white" asChild>
                  <a href={`/equipment/${brand.brandName}/${equipment.modelName}/brochure.pdf`} download>
                    <BookText />
                    브로슈어 다운로드
                  </a>
                </Button>
              )}
              {equipment.isTechnicalData && (
                <Button size="lg" variant="default" className="bg-black font-semibold text-white" asChild>
                  <a href={`/equipment/${brand.brandName}/${equipment.modelName}/technical-data.pdf`} download>
                    <BookText />
                    기술데이터 다운로드
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
