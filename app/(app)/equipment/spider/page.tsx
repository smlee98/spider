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
import { spider } from "./constants";

type SortOption =
  | "maxSafeLoad-desc"
  | "maxSafeLoad-asc"
  | "maxHeight-desc"
  | "maxHeight-asc"
  | "weight-desc"
  | "weight-asc";

type SpiderEquipment = (typeof spider)[0]["equipments"][0] & {
  brandName: string;
};

export default function SpiderPage() {
  const [sortOption, setSortOption] = useState<SortOption>("maxSafeLoad-desc");
  const [activeTab, setActiveTab] = useState("all");

  // 모든 장비를 하나의 배열로 합치기 (브랜드 정보 포함)
  const allEquipments = spider.flatMap((brand) =>
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

      if (field === "weight") {
        aValue = parseFloat(a.weight.replace("kg", ""));
        bValue = parseFloat(b.weight.replace("kg", ""));
      } else if (field === "maxHeight") {
        aValue = parseFloat(a.maxHeight.replace("m", ""));
        bValue = parseFloat(b.maxHeight.replace("m", ""));
      } else if (field === "maxSafeLoad") {
        aValue = parseFloat(a.maxSafeLoad.replace("kg", ""));
        bValue = parseFloat(b.maxSafeLoad.replace("kg", ""));
      } else {
        return 0;
      }

      return order === "desc" ? bValue - aValue : aValue - bValue;
    });
  };

  const sortedAllEquipments = getSortedEquipments(allEquipments, sortOption);

  const EquipmentCard = ({ equipment }: { equipment: SpiderEquipment }) => (
    <Link
      key={`${equipment.brandName}-${equipment.modelName}`}
      href={`/equipment/spider/${equipment.brandName.toLowerCase()}/${equipment.modelName.toLowerCase()}`}
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
              src={`/equipment/spider/${equipment.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
              alt={`${equipment.brandName}/${equipment.modelName}`}
              className="h-auto max-h-80 w-full max-w-full md:max-h-60"
            />
          </picture>
        </CardContent>
        <CardFooter className="gap-0 p-0!">
          <div className="grid w-full grid-cols-3 divide-x border-t">
            <div className="flex flex-col px-4 py-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>최대 안전하중</span>
                <CapacityIcon className="size-4 shrink-0" />
              </div>
              <span className="text-lg font-semibold">{equipment.maxSafeLoad}</span>
            </div>
            <div className="flex flex-col px-4 py-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>최대길이(수직)</span>
                <HeightIcon className="size-4 shrink-0" />
              </div>
              <span className="text-lg font-semibold">{equipment.maxHeight}</span>
            </div>
            <div className="flex flex-col px-4 py-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>차체무게</span>
                <WeightIcon className="size-4 shrink-0" />
              </div>
              <span className="text-lg font-semibold">{equipment.weight}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <h1 className="text-foreground text-3xl font-black md:text-4xl">거미 크레인</h1>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="all">전체 ({allEquipments.length})</TabsTrigger>
              {spider.map((brand) => (
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
                  <SelectItem value="maxSafeLoad-desc">최대 안전하중 높은순</SelectItem>
                  <SelectItem value="maxSafeLoad-asc">최대 안전하중 낮은순</SelectItem>
                  <SelectItem value="maxHeight-desc">최대길이(수직) 높은순</SelectItem>
                  <SelectItem value="maxHeight-asc">최대길이(수직) 낮은순</SelectItem>
                  <SelectItem value="weight-desc">차체무게 높은순</SelectItem>
                  <SelectItem value="weight-asc">차체무게 낮은순</SelectItem>
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
          {spider.map((brand) => (
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
