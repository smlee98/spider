"use client";

import { getListByEquipment } from "@/actions/post/actions";
import CapacityIcon from "@/components/icons/capacity";
import HeightIcon from "@/components/icons/height";
import { ImageZoom } from "@/components/image-zoom";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMenuById } from "@/lib/menu-data";
import { Post, User } from "@prisma/client";
import { format } from "date-fns";
import { ArrowLeft, BookText, CloudDownload, Cog, ImageOff, Quote, Ruler } from "lucide-react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { cranes, craneType, dictionaries, type Equipment } from "../../../constants";

export default function EquipmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const typeParam = params.type as string;
  const brandParam = decodeURIComponent(params.brand as string);
  const modelParam = decodeURIComponent(params.id as string);
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

  // 숫자 추출 함수
  const extractNumber = (value: string): number => {
    if (!value) return 0;
    const match = value.match(/[-]?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  // 값 비교 후 색상 클래스 반환 (카드용)
  const getValueColor = (currentValue: string, field: keyof Equipment): string => {
    // 기본 탭일 때는 항상 검정색
    if (selectedAccessoryIndex === -1) {
      return "";
    }

    // 항상 기본 탭(equipment)과 비교
    const currentNum = extractNumber(currentValue);
    const baseNum = extractNumber(equipment[field] as string);

    if (currentNum > baseNum) {
      return "text-green-600";
    } else if (currentNum < baseNum) {
      return "text-red-600";
    }
    return "";
  };

  // 증감값 계산 및 표시 (테이블용)
  const getValueDiff = (
    currentValue: string,
    field: keyof Equipment
  ): { diff: number; absDiff: number; unit: string } | null => {
    // 기본 탭일 때는 증감 표시 안 함
    if (selectedAccessoryIndex === -1) {
      return null;
    }

    // 항상 기본 탭(equipment)과 비교
    const currentNum = extractNumber(currentValue);
    const baseNum = extractNumber(equipment[field] as string);

    if (currentNum === baseNum) {
      return null;
    }

    // 소수점 둘째자리에서 반올림
    const diff = Math.round((currentNum - baseNum) * 100) / 100;
    const absDiff = Math.abs(diff);

    // 단위 추출 (kg, m 등)
    const unitMatch = currentValue.match(/[a-zA-Z가-힣]+/);
    const unit = unitMatch ? unitMatch[0] : "";

    return { diff, absDiff, unit };
  };

  // HTML 콘텐츠에서 첫 번째 이미지 URL 추출
  function extractFirstImage(htmlContent: string): string | null {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : null;
  }

  const fetcher = async (): Promise<Array<Post & { author: User }>> => {
    return await getListByEquipment({
      type: menuItem.id,
      brand: brand.brandName,
      model: equipment.modelName
    });
  };

  const { data } = useSWR<Array<Post & { author: User }>, Error>(
    `community-list-${menuItem.id}-${brand.brandName}-${equipment.modelName}`,
    fetcher
  );

  return (
    <div className="flex flex-col">
      <Container>
        <div className="flex flex-col gap-12">
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

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 [&>[data-slot='card']]:flex-1">
                <Card className="col-span-full">
                  <CardContent className="size-full">
                    <div className="flex size-full items-center justify-between">
                      <div className="flex flex-col justify-center">
                        <span className="text-muted-foreground text-sm">{dictionaries.dimensions}</span>
                        <span
                          className={`text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl ${getValueColor(currentData.dimensions || "", "dimensions")}`}
                        >
                          {currentData.dimensions || "-"}
                        </span>
                      </div>
                      <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-lg">
                        <Ruler className="size-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="size-full">
                    <div className="flex size-full items-center justify-between">
                      <div className="flex size-full flex-col justify-center">
                        <span className="text-muted-foreground text-sm">{dictionaries.maxSafeLoad}</span>
                        <span
                          className={`text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl ${getValueColor(currentData.maxSafeLoad || "", "maxSafeLoad")}`}
                        >
                          {currentData.maxSafeLoad || "-"}
                        </span>
                      </div>
                      <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-lg">
                        <CapacityIcon className="size-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="size-full">
                    <div className="flex size-full items-center justify-between">
                      <div className="flex size-full flex-col justify-center">
                        <span className="text-muted-foreground text-sm">{dictionaries.maxLiftingHeight}</span>
                        <span
                          className={`text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl ${getValueColor(currentData.maxLiftingHeight || "", "maxLiftingHeight")}`}
                        >
                          {currentData.maxLiftingHeight || "-"}
                        </span>
                      </div>
                      <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-lg">
                        <HeightIcon className="size-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="size-full">
                    <div className="flex size-full items-center justify-between">
                      <div className="flex size-full flex-col justify-center">
                        <span className="text-muted-foreground text-sm">{dictionaries.maxLiftingLength}</span>
                        <span
                          className={`text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl ${getValueColor(currentData.maxLiftingLength || "", "maxLiftingLength")}`}
                        >
                          {currentData.maxLiftingLength || "-"}
                        </span>
                      </div>
                      <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-lg">
                        <HeightIcon className="size-8 rotate-90" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="size-full">
                    <div className="flex size-full items-center justify-between">
                      <div className="flex size-full flex-col justify-center">
                        <span className="text-muted-foreground text-sm">{dictionaries.operatingMethod}</span>
                        <span className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                          {currentData.operatingMethod || "-"}
                        </span>
                      </div>
                      <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-lg">
                        <Cog className="size-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {equipment.description && (
                  <Card className="bg-secondary col-span-full gap-0 overflow-hidden py-0">
                    <CardContent className="relative flex size-full flex-row items-center justify-between px-18 py-8">
                      <p className="text-primary z-20 text-lg font-medium text-balance break-keep">
                        {equipment.description}
                      </p>
                      <Quote className="fill-foreground absolute -top-2 -left-3 z-10 size-16 rotate-180 opacity-15" />
                      <Quote className="fill-foreground absolute -right-3 -bottom-2 z-10 size-16 opacity-15" />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">기술 정보</h2>
            <Card className="gap-0 py-0">
              <CardContent className="px-0">
                <Table>
                  <TableBody className="[&>[data-slot='table-row']]:hover:bg-transparent">
                    {/* 1. 치수 (LxWxH) */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold" rowSpan={5}>
                        제원
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.dimensions}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.dimensions || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.dimensions || "", "dimensions");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 2. 차체 무게 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.bodyWeight}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.bodyWeight || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.bodyWeight || "", "bodyWeight");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 3. 건조 무게 (드라이 웨이트) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.dryWeight}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.dryWeight || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.dryWeight || "", "dryWeight");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 4. 카운터 웨이트 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.counterWeight}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.counterWeight || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.counterWeight || "", "counterWeight");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 5. 최대 안전하중 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxSafeLoad}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxSafeLoad || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxSafeLoad || "", "maxSafeLoad");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 6. 최대 인양높이 */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold" rowSpan={8}>
                        작업 제원
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxLiftingHeight}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxLiftingHeight || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxLiftingHeight || "", "maxLiftingHeight");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 7. 최대 인양길이 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxLiftingLength}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxLiftingLength || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxLiftingLength || "", "maxLiftingLength");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 8. 최대 높이 끝단 하중 (윈치) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxHeightTipLoadWinch}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxHeightTipLoadWinch || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxHeightTipLoadWinch || "", "maxHeightTipLoadWinch");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 9. 최대 길이 끝단 하중 (윈치) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxLengthTipLoadWinch}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxLengthTipLoadWinch || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxLengthTipLoadWinch || "", "maxLengthTipLoadWinch");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 10. 최대 높이 끝단 하중 (후크)(집게)(패드) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxHeightTipLoadHook}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxHeightTipLoadHook || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxHeightTipLoadHook || "", "maxHeightTipLoadHook");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 11. 최대 길이 끝단 하중 (후크)(집게)(패드) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxLengthTipLoadHook}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxLengthTipLoadHook || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxLengthTipLoadHook || "", "maxLengthTipLoadHook");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 12. 작업 각도 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.workingAngle}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.workingAngle || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.workingAngle || "", "workingAngle");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 13. 권상 속도 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.hoistingSpeed}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.hoistingSpeed || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.hoistingSpeed || "", "hoistingSpeed");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 14. 선회 각도 */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold" rowSpan={2}>
                        선회
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.slewingAngle}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.slewingAngle || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.slewingAngle || "", "slewingAngle");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 15. 선회 속도 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.slewingSpeed}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.slewingSpeed || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.slewingSpeed || "", "slewingSpeed");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 16. 윈치 길이 */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold" rowSpan={2}>
                        와이어
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.winchLength}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.winchLength || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.winchLength || "", "winchLength");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 17. 윈치 두께 (⌀ = 직경) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.winchDiameter}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.winchDiameter || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.winchDiameter || "", "winchDiameter");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 18. 아웃트리거 확장 치수 */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold" rowSpan={2}>
                        아웃트리거
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">
                        {dictionaries.outriggerExtensionDimensions}
                      </TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.outriggerExtensionDimensions || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(
                              currentData.outriggerExtensionDimensions || "",
                              "outriggerExtensionDimensions"
                            );
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 19. 최대 아웃트리거 하중 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.maxOutriggerLoad}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.maxOutriggerLoad || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.maxOutriggerLoad || "", "maxOutriggerLoad");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 20. 트랙 치수(확장) */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold" rowSpan={4}>
                        트랙
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.trackDimensions}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.trackDimensions || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.trackDimensions || "", "trackDimensions");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 21. 속력 1단, (2단) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.speed}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.speed || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.speed || "", "speed");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 22. 등판 능력 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.climbingAbility}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.climbingAbility || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.climbingAbility || "", "climbingAbility");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 23. 접지압 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.groundPressure}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                          <span>{currentData.groundPressure || "-"}</span>
                          {(() => {
                            const diff = getValueDiff(currentData.groundPressure || "", "groundPressure");
                            if (diff) {
                              return (
                                <span
                                  className={`text-sm font-medium ${diff.diff > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ({diff.diff > 0 ? "▲" : "▼"}
                                  {diff.absDiff})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* 24. 작동방식 */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold" rowSpan={4}>
                        엔진
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.operatingMethod}</TableCell>
                      <TableCell className="px-6">{currentData.operatingMethod || "-"}</TableCell>
                    </TableRow>
                    {/* 25. 엔진/배터리 (HP : 마력) */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.powerType}</TableCell>
                      <TableCell className="px-6">{currentData.powerType || "-"}</TableCell>
                    </TableRow>
                    {/* 26. 파워팩 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.powerPack}</TableCell>
                      <TableCell className="px-6">{currentData.powerPack || "-"}</TableCell>
                    </TableRow>
                    {/* 27. 사용 전원 */}
                    <TableRow>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.powerSupply}</TableCell>
                      <TableCell className="px-6">{currentData.powerSupply || "-"}</TableCell>
                    </TableRow>
                    {/* 28. 추가 옵션 */}
                    <TableRow>
                      <TableCell className="text-primary border-r px-6 text-center text-base font-semibold">
                        추가 옵션
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6">{dictionaries.additionalOptions}</TableCell>
                      <TableCell className="px-6">{currentData.additionalOptions || "-"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">현장사진</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {data?.length ? (
                data?.map((post: Post & { author: User }) => {
                  const firstImage = extractFirstImage(post.content);
                  return (
                    <Link key={post?.id} href={`/gallery/${post.id}`} className="group">
                      <Card className="group gap-0 overflow-hidden py-0 transition-all group-hover:ring-2">
                        <CardContent className="bg-muted relative flex aspect-video items-center justify-center overflow-hidden p-0">
                          {firstImage ? (
                            <img
                              src={firstImage}
                              alt={post.title}
                              className="absolute top-1/2 left-1/2 z-10 w-full max-w-none -translate-x-1/2 -translate-y-1/2 transition-all group-hover:scale-125"
                            />
                          ) : (
                            <ImageOff className="text-muted-foreground size-8" />
                          )}
                        </CardContent>
                        <CardHeader className="gap-0 border-t py-6">
                          <CardTitle>
                            <div className="flex items-center gap-x-1.5">
                              <span className="text-muted-foreground font-semibold">#{post?.id}</span>
                              <span className="line-clamp-1 flex-1 font-semibold">{post?.title}</span>
                            </div>
                          </CardTitle>
                          <CardDescription>{format(post?.createdAt, "yyyy-MM-dd")}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })
              ) : (
                <span className="text-muted-foreground">등록된 현장사진이 없습니다.</span>
              )}
            </div>
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
