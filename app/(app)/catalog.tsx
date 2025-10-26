"use client";

import { cranes } from "@/app/(app)/equipment/constants";
import { EquipmentFilters } from "@/app/(app)/filter";
import { EquipmentTable } from "@/app/(app)/table";
import { useMemo, useState } from "react";

export default function Catalog() {
  const [filters, setFilters] = useState({
    heightRange: [0, 35],
    lengthRange: [0, 20],
    loadRange: [0, 16000]
  });

  // 숫자 값 추출 헬퍼 함수
  const parseNumericValue = (value: string): number => {
    if (!value) return 0;
    const match = value.match(/[-]?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  const filteredData = useMemo(() => {
    const allEquipments = cranes.flatMap((item) =>
      item.brands.flatMap((brand) =>
        brand.equipments.map((equipment) => ({
          ...equipment,
          brandName: brand.brandName,
          type: item.type
        }))
      )
    );

    return allEquipments.filter((equipment) => {
      // 최대 인양높이 필터
      const maxHeight = parseNumericValue(equipment.maxLiftingHeight);
      if (maxHeight < filters.heightRange[0] || maxHeight > filters.heightRange[1]) {
        return false;
      }

      // 최대 인양 길이 필터
      const maxLength = parseNumericValue(equipment.maxLiftingLength);
      if (maxLength < filters.lengthRange[0] || maxLength > filters.lengthRange[1]) {
        return false;
      }

      // 최대 안전하중 필터
      const maxLoad = parseNumericValue(equipment.maxSafeLoad);
      if (maxLoad < filters.loadRange[0] || maxLoad > filters.loadRange[1]) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <>
      <div className="mb-24 flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold lg:max-w-3xl lg:text-5xl">장비 카탈로그</h1>
        <p className="text-muted-foreground text-center text-lg font-medium md:max-w-4xl lg:text-xl">
          업계 최고 수준의 성능과 안전성을 자랑하는 프리미엄 크레인 장비 라인업. <br /> 각 현장의 특성에 최적화된 맞춤형
          솔루션을 제공합니다.
        </p>
      </div>
      <div className="grid w-full gap-6 lg:max-w-(--breakpoint-2xl) lg:grid-cols-[320px_1fr]">
        <aside className="h-fit lg:sticky lg:top-24">
          <EquipmentFilters onFilterChange={setFilters} />
        </aside>

        <EquipmentTable data={filteredData} />
      </div>
    </>
  );
}
