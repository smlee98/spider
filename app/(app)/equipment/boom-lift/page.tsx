"use client";

import CapacityIcon from "@/components/icons/capacity";
import HeightIcon from "@/components/icons/height";
import WeightIcon from "@/components/icons/weight";
import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
import { boomLift } from "./constants";

type SortOption =
  | "platformMaxLoad-desc"
  | "platformMaxLoad-asc"
  | "maxHeightVertical-desc"
  | "maxHeightVertical-asc"
  | "bodyWeight-desc"
  | "bodyWeight-asc";

type BoomLiftEquipment = (typeof boomLift)[0]["equipments"][0] & {
  brandName: string;
};

export default function BoomLiftPage() {
  const [sortOption, setSortOption] = useState<SortOption>("platformMaxLoad-desc");
  const [activeTab, setActiveTab] = useState("all");

  // 모든 장비를 하나의 배열로 합치기 (브랜드 정보 포함)
  const allEquipments = boomLift.flatMap((brand) =>
    brand.equipments.map((equipment) => ({
      ...equipment,
      brandName: brand.brandName
    }))
  );

  // 정렬 함수
  const getSortedEquipments = (equipments: typeof allEquipments, sortBy: SortOption) => {
    return [...equipments].sort((a, b) => {
      const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

      let aValue: number;
      let bValue: number;

      if (field === "bodyWeight") {
        aValue = parseFloat(a.bodyWeight.replace("kg", ""));
        bValue = parseFloat(b.bodyWeight.replace("kg", ""));
      } else if (field === "maxHeightVertical") {
        aValue = parseFloat(a.maxHeightVertical.replace("m", ""));
        bValue = parseFloat(b.maxHeightVertical.replace("m", ""));
      } else if (field === "platformMaxLoad") {
        aValue = parseFloat(a.platformMaxLoad.replace("kg", ""));
        bValue = parseFloat(b.platformMaxLoad.replace("kg", ""));
      } else {
        return 0;
      }

      return order === "desc" ? bValue - aValue : aValue - bValue;
    });
  };

  const sortedAllEquipments = getSortedEquipments(allEquipments, sortOption);

  const EquipmentCard = ({ equipment }: { equipment: BoomLiftEquipment }) => (
    <Link
      key={`${equipment.brandName}-${equipment.modelName}`}
      href={`/equipment/boom-lift/${equipment.brandName.toLowerCase()}/${equipment.modelName.toLowerCase()}`}
      className="group"
    >
      <Card className="gap-0 overflow-hidden py-0 transition-all group-hover:ring-2">
        <CardHeader className="gap-0 border-b !p-4">
          <div className="flex items-center gap-2">
            <Badge>{equipment.brandName}</Badge>
            <CardTitle className="text-lg">{equipment.modelName}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="bg-muted flex aspect-square items-center justify-center">
          <picture>
            <img
              src={`/equipment/boom-lift/${equipment.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
              alt={`${equipment.brandName}/${equipment.modelName}`}
              className="h-auto max-h-[420px] w-full max-w-full"
            />
          </picture>
        </CardContent>
        <CardFooter className="gap-0 p-0!">
          <div className="grid w-full grid-cols-3 divide-x border-t">
            <div className="flex flex-col px-4 py-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>플랫폼 최대하중</span>
                <CapacityIcon className="size-4 shrink-0" />
              </div>
              <span className="text-lg font-semibold">{equipment.platformMaxLoad}</span>
            </div>
            <div className="flex flex-col px-4 py-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>최대길이(수직)</span>
                <HeightIcon className="size-4 shrink-0" />
              </div>
              <span className="text-lg font-semibold">{equipment.maxHeightVertical}</span>
            </div>
            <div className="flex flex-col px-4 py-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>차체무게</span>
                <WeightIcon className="size-4 shrink-0" />
              </div>
              <span className="text-lg font-semibold">{equipment.bodyWeight}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <h1 className="text-foreground text-3xl font-black md:text-4xl">굴절식 고소작업대</h1>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="all">전체 ({allEquipments.length})</TabsTrigger>
              {boomLift.map((brand) => (
                <TabsTrigger key={brand.id} value={brand.id}>
                  {brand.brandName} ({brand.equipments.length})
                </TabsTrigger>
              ))}
            </TabsList>
            {activeTab === "all" && (
              <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platformMaxLoad-desc">플랫폼 최대하중 높은순</SelectItem>
                  <SelectItem value="platformMaxLoad-asc">플랫폼 최대하중 낮은순</SelectItem>
                  <SelectItem value="maxHeightVertical-desc">최대길이(수직) 높은순</SelectItem>
                  <SelectItem value="maxHeightVertical-asc">최대길이(수직) 낮은순</SelectItem>
                  <SelectItem value="bodyWeight-desc">차체무게 높은순</SelectItem>
                  <SelectItem value="bodyWeight-asc">차체무게 낮은순</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* 전체 탭 */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {sortedAllEquipments.map((equipment) => (
                <EquipmentCard key={`${equipment.brandName}-${equipment.modelName}`} equipment={equipment} />
              ))}
            </div>
          </TabsContent>

          {/* 브랜드별 탭 */}
          {boomLift.map((brand) => (
            <TabsContent key={brand.id} value={brand.id}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {brand.equipments.map((equipment) => (
                  <EquipmentCard key={equipment.modelName} equipment={{ ...equipment, brandName: brand.brandName }} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Container>
  );
}
