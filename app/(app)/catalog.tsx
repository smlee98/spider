"use client";

import { cranes } from "@/app/(app)/equipment/constants";
import { EquipmentFilters } from "@/app/(app)/filter";
import { EquipmentTable } from "@/app/(app)/table";
import { useMemo, useState } from "react";

export default function Catalog() {
  const [filters, setFilters] = useState({
    maxWeight: 0,
    minLoad: 0,
    minHeight: 0,
    accessoryType: ""
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
      // 최대 차체 무게 필터 (0이면 필터링 안 함)
      // 필터: 톤 단위, equipment: kg 단위 → kg를 톤으로 변환하여 비교
      if (filters.maxWeight > 0) {
        const bodyWeightInKg = parseNumericValue(equipment.bodyWeight);
        const bodyWeightInTon = bodyWeightInKg / 1000;
        if (bodyWeightInTon > filters.maxWeight) {
          return false;
        }
      }

      // 최소 안전하중 필터 (0이면 필터링 안 함)
      // 필터: 톤 단위, equipment: kg 단위 → kg를 톤으로 변환하여 비교
      if (filters.minLoad > 0) {
        const maxLoadInKg = parseNumericValue(equipment.maxSafeLoad);
        const maxLoadInTon = maxLoadInKg / 1000;
        if (maxLoadInTon < filters.minLoad) {
          return false;
        }
      }

      // 최소 인양높이 필터 (0이면 필터링 안 함)
      if (filters.minHeight > 0) {
        const maxHeight = parseNumericValue(equipment.maxLiftingHeight);
        if (maxHeight < filters.minHeight) {
          return false;
        }
      }

      // 악세서리 타입 필터
      if (filters.accessoryType) {
        if (filters.accessoryType === "base_jib") {
          // 기본 + 보조붐: 악세서리가 없거나 jib 타입이 있는 경우
          const hasJib = equipment.accessories?.some((acc) => acc.accessoryType === "jib");
          const hasNoAccessories = !equipment.accessories || equipment.accessories.length === 0;
          if (!hasNoAccessories && !hasJib) {
            return false;
          }
        } else {
          // 다른 타입: 해당 악세서리 타입이 있는 경우만
          const hasAccessoryType = equipment.accessories?.some((acc) => acc.accessoryType === filters.accessoryType);
          if (!hasAccessoryType) {
            return false;
          }
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <>
      <div className="mb-16 flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold lg:max-w-3xl lg:text-5xl">장비 카탈로그</h1>
        <p className="text-muted-foreground text-center text-lg font-medium text-balance break-keep md:max-w-4xl lg:text-xl">
          업계 최고 수준의 성능과 안전성을 자랑하는 프리미엄 크레인 장비 라인업. <br /> 각 현장의 특성에 최적화된 맞춤형
          솔루션을 제공합니다.
        </p>
      </div>
      <div className="grid w-full gap-6 lg:max-w-(--breakpoint-2xl) lg:grid-cols-[320px_1fr]">
        <aside className="h-fit lg:sticky lg:top-24">
          <EquipmentFilters onFilterChange={setFilters} />
        </aside>

        <EquipmentTable data={filteredData} accessoryFilter={filters.accessoryType} />
      </div>
    </>
  );
}
