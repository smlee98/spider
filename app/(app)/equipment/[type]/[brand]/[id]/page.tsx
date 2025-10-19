"use client";

import { ImageZoom } from "@/components/image-zoom";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMenuById } from "@/lib/menu-data";
import { ArrowLeft, BookText, CloudDownload } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cranes, craneType, dictionaries, type Equipment } from "../../../constants";

export default function EquipmentDetailPage() {
  const router = useRouter();
  const { type: typeParam, brand: brandParam, id: modelParam } = useParams();
  const [selectedAccessoryIndex, setSelectedAccessoryIndex] = useState<number>(-1);

  // menuData에서 해당 경로를 가진 메뉴 아이템 찾기
  const equipmentMenu = getMenuById("equipment");
  const menuItem = equipmentMenu?.children?.find((item) => item.href === `/equipment/${typeParam}`);

  if (!menuItem) {
    notFound();
  }

  // cranes 데이터에서 menuItem.id에 해당하는 장비 찾기
  const typeData = cranes.find((c) => c.type === menuItem.id);

  if (!typeData) {
    notFound();
  }

  const brand = typeData.brands.find((b) => b.brandName.toLowerCase() === brandParam);
  if (!brand) {
    notFound();
  }

  const equipment = brand.equipments.find((e) => e.modelName.toLowerCase() === modelParam) as Equipment | undefined;
  if (!equipment) {
    notFound();
  }

  // 현재 표시할 데이터 결정: 악세서리가 선택되었으면 해당 악세서리 데이터, 아니면 기본 데이터
  const currentData =
    selectedAccessoryIndex >= 0 && equipment.accessories?.[selectedAccessoryIndex]
      ? equipment.accessories[selectedAccessoryIndex]
      : equipment;

  // 악세서리가 있는지 확인
  const hasAccessories = equipment.accessories && equipment.accessories.length > 0;

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

          {hasAccessories && (
            <Tabs
              defaultValue="-1"
              value={selectedAccessoryIndex.toString()}
              onValueChange={(value) => setSelectedAccessoryIndex(Number(value))}
            >
              <TabsList>
                <TabsTrigger value="-1" className="flex-1">
                  기본
                </TabsTrigger>
                {equipment.accessories?.map((accessory, index) => (
                  <TabsTrigger key={index} value={index.toString()} className="flex-1">
                    <div className="flex items-center gap-1">
                      <span>{accessory.accessoryName}</span>
                      <span className="text-muted-foreground">
                        ({craneType[accessory.accessoryType as keyof typeof craneType]})
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

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
                    {currentData.dimensions && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.dimensions}
                        </TableCell>
                        <TableCell className="px-6">{currentData.dimensions}</TableCell>
                      </TableRow>
                    )}
                    {currentData.trackDimensions && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.trackDimensions}
                        </TableCell>
                        <TableCell className="px-6">{currentData.trackDimensions}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxLiftingHeight && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxLiftingHeight}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxLiftingHeight}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxLiftingLength && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxLiftingLength}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxLiftingLength}</TableCell>
                      </TableRow>
                    )}
                    {currentData.bodyWeight && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.bodyWeight}
                        </TableCell>
                        <TableCell className="px-6">{currentData.bodyWeight}</TableCell>
                      </TableRow>
                    )}
                    {currentData.dryWeight && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.dryWeight}
                        </TableCell>
                        <TableCell className="px-6">{currentData.dryWeight}</TableCell>
                      </TableRow>
                    )}
                    {currentData.counterWeight && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.counterWeight}
                        </TableCell>
                        <TableCell className="px-6">{currentData.counterWeight}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxSafeLoad && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxSafeLoad}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxSafeLoad}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxHeightTipLoadWinch && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxHeightTipLoadWinch}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxHeightTipLoadWinch}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxLengthTipLoadWinch && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxLengthTipLoadWinch}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxLengthTipLoadWinch}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxHeightTipLoadHook && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxHeightTipLoadHook}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxHeightTipLoadHook}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxLengthTipLoadHook && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxLengthTipLoadHook}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxLengthTipLoadHook}</TableCell>
                      </TableRow>
                    )}
                    {currentData.speed && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">{dictionaries.speed}</TableCell>
                        <TableCell className="px-6">{currentData.speed}</TableCell>
                      </TableRow>
                    )}
                    {currentData.climbingAbility && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.climbingAbility}
                        </TableCell>
                        <TableCell className="px-6">{currentData.climbingAbility}</TableCell>
                      </TableRow>
                    )}
                    {currentData.workingAngle && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.workingAngle}
                        </TableCell>
                        <TableCell className="px-6">{currentData.workingAngle}</TableCell>
                      </TableRow>
                    )}
                    {currentData.hoistingSpeed && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.hoistingSpeed}
                        </TableCell>
                        <TableCell className="px-6">{currentData.hoistingSpeed}</TableCell>
                      </TableRow>
                    )}
                    {currentData.slewingAngle && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.slewingAngle}
                        </TableCell>
                        <TableCell className="px-6">{currentData.slewingAngle}</TableCell>
                      </TableRow>
                    )}
                    {currentData.slewingSpeed && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.slewingSpeed}
                        </TableCell>
                        <TableCell className="px-6">{currentData.slewingSpeed}</TableCell>
                      </TableRow>
                    )}
                    {currentData.winchLength && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.winchLength}
                        </TableCell>
                        <TableCell className="px-6">{currentData.winchLength}</TableCell>
                      </TableRow>
                    )}
                    {currentData.winchDiameter && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.winchDiameter}
                        </TableCell>
                        <TableCell className="px-6">{currentData.winchDiameter}</TableCell>
                      </TableRow>
                    )}
                    {currentData.outriggerExtensionDimensions && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.outriggerExtensionDimensions}
                        </TableCell>
                        <TableCell className="px-6">{currentData.outriggerExtensionDimensions}</TableCell>
                      </TableRow>
                    )}
                    {currentData.maxOutriggerLoad && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.maxOutriggerLoad}
                        </TableCell>
                        <TableCell className="px-6">{currentData.maxOutriggerLoad}</TableCell>
                      </TableRow>
                    )}
                    {currentData.groundPressure && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.groundPressure}
                        </TableCell>
                        <TableCell className="px-6">{currentData.groundPressure}</TableCell>
                      </TableRow>
                    )}
                    {currentData.operatingMethod && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.operatingMethod}
                        </TableCell>
                        <TableCell className="px-6">{currentData.operatingMethod}</TableCell>
                      </TableRow>
                    )}
                    {currentData.powerType && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.powerType}
                        </TableCell>
                        <TableCell className="px-6">{currentData.powerType}</TableCell>
                      </TableRow>
                    )}
                    {currentData.powerPack && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.powerPack}
                        </TableCell>
                        <TableCell className="px-6">{currentData.powerPack}</TableCell>
                      </TableRow>
                    )}
                    {currentData.powerSupply && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.powerSupply}
                        </TableCell>
                        <TableCell className="px-6">{currentData.powerSupply}</TableCell>
                      </TableRow>
                    )}
                    {currentData.additionalOptions && (
                      <TableRow>
                        <TableCell className="text-muted-foreground px-6 font-semibold">
                          {dictionaries.additionalOptions}
                        </TableCell>
                        <TableCell className="px-6">{currentData.additionalOptions}</TableCell>
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
