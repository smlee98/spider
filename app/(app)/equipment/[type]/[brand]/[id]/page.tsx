"use client";

import { getListByEquipment } from "@/actions/post/actions";
import CapacityIcon from "@/components/icons/capacity";
import HeightIcon from "@/components/icons/height";
import { ImageZoom } from "@/components/image-zoom";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMenuById } from "@/lib/menu-data";
import { Post, User } from "@prisma/client";
import { format } from "date-fns";
import { ArrowLeft, BookText, CloudDownload, Cog, ImageOff, Quote, Ruler } from "lucide-react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { cranes, craneType, dictionaries, type Equipment } from "../../../constants";

export default function EquipmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const typeParam = params.type as string;
  const brandParam = decodeURIComponent(params.brand as string);
  const modelParam = decodeURIComponent(params.id as string);
  const [specImages, setSpecImages] = useState<string[]>([]);

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

  // 악세서리가 있는지 확인
  const hasAccessories = equipment.accessories && equipment.accessories.length > 0;

  // 제원표 이미지 로드
  useEffect(() => {
    const loadSpecImages = async () => {
      const images: string[] = [];
      for (let i = 1; i <= 6; i++) {
        const imgPath = `/equipment/${brand.brandName}/${equipment.modelName}/spec/${i}.jpg`;
        try {
          const res = await fetch(imgPath, { method: "HEAD" });
          if (res.ok) {
            images.push(imgPath);
          }
        } catch {
          // 이미지가 없으면 무시
        }
      }
      setSpecImages(images);
    };
    loadSpecImages();
  }, [brand.brandName, equipment.modelName]);

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

  // 테이블에 표시할 필드 목록
  const specFields: { category: string; fields: { key: keyof Equipment; label: string }[] }[] = [
    {
      category: "제원",
      fields: [
        { key: "dimensions", label: dictionaries.dimensions },
        { key: "bodyWeight", label: dictionaries.bodyWeight },
        { key: "dryWeight", label: dictionaries.dryWeight },
        { key: "counterWeight", label: dictionaries.counterWeight },
        { key: "maxSafeLoad", label: dictionaries.maxSafeLoad }
      ]
    },
    {
      category: "작업 제원",
      fields: [
        { key: "maxLiftingHeight", label: dictionaries.maxLiftingHeight },
        { key: "maxLiftingLength", label: dictionaries.maxLiftingLength },
        { key: "maxHeightTipLoadWinch", label: dictionaries.maxHeightTipLoadWinch },
        { key: "maxLengthTipLoadWinch", label: dictionaries.maxLengthTipLoadWinch },
        { key: "maxHeightTipLoadHook", label: dictionaries.maxHeightTipLoadHook },
        { key: "maxLengthTipLoadHook", label: dictionaries.maxLengthTipLoadHook },
        { key: "workingAngle", label: dictionaries.workingAngle },
        { key: "hoistingSpeed", label: dictionaries.hoistingSpeed }
      ]
    },
    {
      category: "선회",
      fields: [
        { key: "slewingAngle", label: dictionaries.slewingAngle },
        { key: "slewingSpeed", label: dictionaries.slewingSpeed }
      ]
    },
    {
      category: "와이어",
      fields: [
        { key: "winchLength", label: dictionaries.winchLength },
        { key: "winchDiameter", label: dictionaries.winchDiameter }
      ]
    },
    {
      category: "아웃트리거",
      fields: [
        { key: "outriggerExtensionDimensions", label: dictionaries.outriggerExtensionDimensions },
        { key: "maxOutriggerLoad", label: dictionaries.maxOutriggerLoad }
      ]
    },
    {
      category: "트랙",
      fields: [
        { key: "trackDimensions", label: dictionaries.trackDimensions },
        { key: "speed", label: dictionaries.speed },
        { key: "climbingAbility", label: dictionaries.climbingAbility },
        { key: "groundPressure", label: dictionaries.groundPressure }
      ]
    },
    {
      category: "엔진",
      fields: [
        { key: "operatingMethod", label: dictionaries.operatingMethod },
        { key: "powerType", label: dictionaries.powerType },
        { key: "powerPack", label: dictionaries.powerPack },
        { key: "powerSupply", label: dictionaries.powerSupply }
      ]
    },
    {
      category: "추가 옵션",
      fields: [{ key: "additionalOptions", label: dictionaries.additionalOptions }]
    }
  ];

  return (
    <div className="flex flex-col">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col">
                <h4 className="text-muted-foreground font-semibold">
                  {brand.brandName === "Ruthmann Steiger" ? "STEIGER® | RUTHMANN" : brand.brandName}
                </h4>
                <h1 className="text-foreground text-3xl font-black md:text-4xl">{equipment.modelName}</h1>
              </div>
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="size-4" />
                뒤로가기
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="group relative">
                <ImageZoom
                  src={`/equipment/${brand.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
                  alt={`${brand.brandName}/${equipment.modelName}`}
                  className="w-full"
                  zoomLevel={3.5}
                />
                {equipment.comingSoon && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/25 transition-opacity group-hover:opacity-0">
                    <span className="rounded-lg bg-orange-500 px-6 py-3 text-xl font-bold text-white">
                      {equipment.comingSoon}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 [&>[data-slot='card']]:flex-1">
                <Card className="col-span-full">
                  <CardContent className="size-full">
                    <div className="flex size-full items-center justify-between">
                      <div className="flex flex-col justify-center">
                        <span className="text-muted-foreground text-sm">{dictionaries.dimensions}</span>
                        <span className="text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl">
                          {equipment.dimensions || "-"}
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
                        <span className="text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl">
                          {equipment.maxSafeLoad || "-"}
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
                        <span className="text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl">
                          {equipment.maxLiftingHeight || "-"}
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
                        <span className="text-2xl font-semibold tabular-nums transition-colors @[250px]/card:text-3xl">
                          {equipment.maxLiftingLength || "-"}
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
                          {equipment.operatingMethod || "-"}
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

          {/* 제원표 이미지 섹션 */}
          {specImages.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">제원표</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {specImages.map((imgPath, index) => (
                  <Card key={imgPath} className="gap-0 overflow-hidden py-0">
                    <CardContent className="px-0">
                      <img src={imgPath} alt={`제원표 ${index + 1}`} className="w-full max-w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">기술 정보</h2>
            <Card className="gap-0 overflow-hidden py-0">
              <CardContent className="px-0">
                <Table>
                  <TableHeader className="bg-muted hover:bg-muted">
                    <TableRow className="divide-x font-semibold">
                      <TableHead className="px-6 text-center font-semibold">구분</TableHead>
                      <TableHead className="px-6 font-semibold">항목</TableHead>
                      <TableHead className="px-6 font-semibold">기본</TableHead>
                      {hasAccessories &&
                        equipment.accessories?.map((accessory, index) => (
                          <TableHead key={index} className="px-6 font-semibold">
                            {accessory.accessoryName}
                            <span className="text-muted-foreground ml-1">
                              ({craneType[accessory.accessoryType as keyof typeof craneType]})
                            </span>
                          </TableHead>
                        ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&>[data-slot='table-row']]:hover:bg-transparent">
                    {specFields.map((categoryGroup) =>
                      categoryGroup.fields.map((field, fieldIndex) => (
                        <TableRow key={`${categoryGroup.category}-${field.key}`} className="divide-x">
                          {fieldIndex === 0 && (
                            <TableCell
                              className="text-primary border-r px-6 text-center text-base font-semibold"
                              rowSpan={categoryGroup.fields.length}
                            >
                              {categoryGroup.category}
                            </TableCell>
                          )}
                          <TableCell className="text-muted-foreground px-6">{field.label}</TableCell>
                          <TableCell className="px-6">{(equipment[field.key] as string) || "-"}</TableCell>
                          {hasAccessories &&
                            equipment.accessories?.map((accessory, accIndex) => (
                              <TableCell key={accIndex} className="px-6">
                                {(accessory[field.key as keyof typeof accessory] as string) || "-"}
                              </TableCell>
                            ))}
                        </TableRow>
                      ))
                    )}
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
                          <CardDescription suppressHydrationWarning>{format(new Date(post?.createdAt), "yyyy-MM-dd")}</CardDescription>
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
