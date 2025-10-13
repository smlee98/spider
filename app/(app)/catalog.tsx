"use client";

import { cranes } from "@/app/(app)/equipment/constants";
import { EquipmentFilters } from "@/app/(app)/filter";
import { EquipmentTable } from "@/app/(app)/table";
import { useMemo, useState } from "react";

export default function Catalog() {
  const [filters, setFilters] = useState({
    heightRange: [0, 35],
    lengthRange: [0, 20],
    weightRange: [0, 18000],
    loadRange: [0, 16000],
    workingAngleRange: [-15, 85],
    rotationAngleRange: [0, 720],
    outriggerLoadRange: [0, 12000]
  });

  // 숫자 값 추출 헬퍼 함수
  const parseNumericValue = (value: string): number => {
    if (!value) return 0;
    const match = value.match(/[-]?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  // 각도 범위 추출 함수 (예: "0° ~ 80°" -> {min: 0, max: 80})
  const parseAngleRange = (value: string): { min: number; max: number } => {
    if (!value) return { min: 0, max: 0 };
    const matches = value.match(/[-]?\d+/g);
    if (matches && matches.length >= 2) {
      return { min: parseFloat(matches[0]), max: parseFloat(matches[1]) };
    }
    return { min: 0, max: 0 };
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

      // 차체무게 필터
      const weight = parseNumericValue(equipment.bodyWeight);
      if (weight < filters.weightRange[0] || weight > filters.weightRange[1]) {
        return false;
      }

      // 최대 안전하중 필터
      const maxLoad = parseNumericValue(equipment.maxSafeLoad);
      if (maxLoad < filters.loadRange[0] || maxLoad > filters.loadRange[1]) {
        return false;
      }

      // 작업 각도 필터
      const workingAngle = parseAngleRange(equipment.workingAngle);
      if (
        workingAngle.max > 0 &&
        (workingAngle.min > filters.workingAngleRange[1] || workingAngle.max < filters.workingAngleRange[0])
      ) {
        return false;
      }

      // 선회 각도 필터
      const slewingAngle = parseNumericValue(equipment.slewingAngle);
      if (
        slewingAngle > 0 &&
        (slewingAngle < filters.rotationAngleRange[0] || slewingAngle > filters.rotationAngleRange[1])
      ) {
        return false;
      }

      // 최대 아웃트리거 하중 필터
      const outriggerLoad = parseNumericValue(equipment.maxOutriggerLoad);
      if (
        outriggerLoad > 0 &&
        (outriggerLoad < filters.outriggerLoadRange[0] || outriggerLoad > filters.outriggerLoadRange[1])
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="grid w-full gap-6 lg:max-w-(--breakpoint-2xl) lg:grid-cols-[320px_1fr]">
      <aside className="h-fit lg:sticky lg:top-8">
        <EquipmentFilters onFilterChange={setFilters} />
      </aside>

      <EquipmentTable data={filteredData} />
    </div>
  );
}
