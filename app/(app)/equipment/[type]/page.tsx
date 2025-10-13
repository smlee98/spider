"use client";

import CapacityIcon from "@/components/icons/capacity";
import HeightIcon from "@/components/icons/height";
import WeightIcon from "@/components/icons/weight";
import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMenuById } from "@/lib/menu-data";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { cranes, craneType, type Equipment as BaseEquipment } from "../constants";

type SortOption =
  | "maxSafeLoad-desc"
  | "maxSafeLoad-asc"
  | "maxHeight-desc"
  | "maxHeight-asc"
  | "weight-desc"
  | "weight-asc";

type Equipment = BaseEquipment & {
  brandName: string;
};

export default function EquipmentTypePage() {
  const [sortOption, setSortOption] = useState<SortOption>("maxSafeLoad-desc");
  const [activeTab, setActiveTab] = useState("all");
  const params = useParams();

  // menuData에서 해당 경로를 가진 메뉴 아이템 찾기
  const equipmentMenu = getMenuById("equipment");
  const menuItem = equipmentMenu?.children?.find((item) => item.href === `/equipment/${params.type}`);

  if (!menuItem) {
    notFound();
  }

  // cranes 데이터에서 menuItem.id에 해당하는 장비 찾기
  const typeData = cranes.find((c) => c.type === menuItem.id);

  if (!typeData) {
    notFound();
  }

  // 모든 장비를 하나의 배열로 합치기 (브랜드 정보 포함)
  const allEquipments = typeData.brands.flatMap((brand) =>
    brand.equipments.map((equipment) => ({
      ...equipment,
      brandName: brand.brandName
    }))
  );

  // 정렬 함수
  const getSortedEquipments = (equipments: Equipment[], sortBy: SortOption) => {
    return [...equipments].sort((a, b) => {
      const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

      let aValue: number;
      let bValue: number;

      if (field === "bodyWeight") {
        aValue = parseFloat(a.bodyWeight.replace("kg", ""));
        bValue = parseFloat(b.bodyWeight.replace("kg", ""));
      } else if (field === "maxLiftingHeight") {
        aValue = parseFloat(a.maxLiftingHeight.replace("m", ""));
        bValue = parseFloat(b.maxLiftingHeight.replace("m", ""));
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

  const EquipmentCard = ({ equipment }: { equipment: Equipment }) => (
    <Link
      key={`${equipment.brandName}-${equipment.modelName}`}
      href={`/equipment/${params.type}/${equipment.brandName.toLowerCase()}/${equipment.modelName.toLowerCase()}`}
      className="group"
    >
      <Card className="gap-0 overflow-hidden py-0 transition-all group-hover:ring-2">
        <CardHeader className="gap-0 border-b !p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Badge>{equipment.brandName}</Badge>
              <CardTitle className="text-lg">{equipment.modelName}</CardTitle>
            </div>
            {equipment.accessories && equipment.accessories.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1">
                {equipment.accessories.slice(0, 2).map((accessory, index) => (
                  <Badge key={index} variant="secondary">
                    <Boxes className="size-3" />
                    <div className="flex items-center gap-1">
                      <span>{accessory.accessoryName}</span>
                      <span className="text-muted-foreground">
                        ({craneType[accessory.accessoryType as keyof typeof craneType]})
                      </span>
                    </div>
                  </Badge>
                ))}
                {equipment.accessories.length > 2 && (
                  <Badge variant="outline">
                    <span className="text-muted-foreground">+ {equipment.accessories.length - 2}개</span>
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </div>
        </CardHeader>
        <CardContent className="bg-muted flex aspect-square items-center justify-center">
          <picture>
            <img
              src={`/equipment/${equipment.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
              alt={`${equipment.brandName}/${equipment.modelName}`}
              className="h-auto max-h-[420px] w-full max-w-full"
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
                <span>최대 인양높이</span>
                <HeightIcon className="size-4 shrink-0" />
              </div>
              <span className="text-lg font-semibold">{equipment.maxLiftingHeight}</span>
            </div>
            <div className="flex flex-col px-4 py-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>차체 무게</span>
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
        <h1 className="text-foreground text-3xl font-black md:text-4xl">{menuItem.title}</h1>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="all">전체 ({allEquipments.length})</TabsTrigger>
              {typeData.brands.map((brand) => (
                <TabsTrigger key={brand.brandName} value={brand.brandName}>
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
                  <SelectItem value="maxLiftingHeight-desc">최대 인양높이 높은순</SelectItem>
                  <SelectItem value="maxLiftingHeight-asc">최대 인양높이 낮은순</SelectItem>
                  <SelectItem value="bodyWeight-desc">차체 무게 높은순</SelectItem>
                  <SelectItem value="bodyWeight-asc">차체 무게 낮은순</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* 전체 탭 */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {sortedAllEquipments.map((equipment, index) => (
                <EquipmentCard key={index} equipment={equipment} />
              ))}
            </div>
          </TabsContent>

          {/* 브랜드별 탭 */}
          {typeData.brands.map((brand) => (
            <TabsContent key={brand.brandName} value={brand.brandName}>
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
