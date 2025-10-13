"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

type EquipmentFilters = {
  heightRange: [number, number];
  lengthRange: [number, number];
  weightRange: [number, number];
  loadRange: [number, number];
  workingAngleRange: [number, number];
  rotationAngleRange: [number, number];
  outriggerLoadRange: [number, number];
};

export function EquipmentFilters({ onFilterChange }: { onFilterChange: (filters: EquipmentFilters) => void }) {
  const initialFilters = {
    heightRange: [0, 35],
    lengthRange: [0, 20],
    weightRange: [0, 18000],
    loadRange: [0, 16000],
    workingAngleRange: [-15, 85],
    rotationAngleRange: [0, 720],
    outriggerLoadRange: [0, 12000]
  };

  const [filters, setFilters] = useState(initialFilters);

  // 필터가 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    onFilterChange(filters as EquipmentFilters);
  }, [filters, onFilterChange]);

  return (
    <Card className="gap-0">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-lg font-semibold">필터</h2>
          <Button variant="outline" size="icon" onClick={() => setFilters(initialFilters)}>
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">최대 인양높이 (m)</Label>
              <span className="text-muted-foreground text-xs">
                {filters.heightRange[0]} - {filters.heightRange[1]}
              </span>
            </div>
            <Slider
              min={0}
              max={35}
              step={1}
              value={filters.heightRange}
              onValueChange={(value) => setFilters({ ...filters, heightRange: value })}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">최대 인양 길이 (m)</Label>
              <span className="text-muted-foreground text-xs">
                {filters.lengthRange[0]} - {filters.lengthRange[1]}
              </span>
            </div>
            <Slider
              min={0}
              max={20}
              step={0.5}
              value={filters.lengthRange}
              onValueChange={(value) => setFilters({ ...filters, lengthRange: value })}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">차체무게 (kg)</Label>
              <span className="text-muted-foreground text-xs">
                {filters.weightRange[0].toLocaleString()} - {filters.weightRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              min={0}
              max={18000}
              step={100}
              value={filters.weightRange}
              onValueChange={(value) => setFilters({ ...filters, weightRange: value })}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">최대 안전하중 (kg)</Label>
              <span className="text-muted-foreground text-xs">
                {filters.loadRange[0].toLocaleString()} - {filters.loadRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              min={0}
              max={16000}
              step={100}
              value={filters.loadRange}
              onValueChange={(value) => setFilters({ ...filters, loadRange: value })}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">작업 각도 (°)</Label>
              <span className="text-muted-foreground text-xs">
                {filters.workingAngleRange[0]}° - {filters.workingAngleRange[1]}°
              </span>
            </div>
            <Slider
              min={-15}
              max={85}
              step={1}
              value={filters.workingAngleRange}
              onValueChange={(value) => setFilters({ ...filters, workingAngleRange: value })}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">선회 각도 (°)</Label>
              <span className="text-muted-foreground text-xs">
                {filters.rotationAngleRange[0]}° - {filters.rotationAngleRange[1]}°
              </span>
            </div>
            <Slider
              min={0}
              max={720}
              step={10}
              value={filters.rotationAngleRange}
              onValueChange={(value) => setFilters({ ...filters, rotationAngleRange: value })}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">최대 아웃트리거 하중 (kg)</Label>
              <span className="text-muted-foreground text-xs">
                {filters.outriggerLoadRange[0].toLocaleString()} - {filters.outriggerLoadRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              min={0}
              max={12000}
              step={100}
              value={filters.outriggerLoadRange}
              onValueChange={(value) => setFilters({ ...filters, outriggerLoadRange: value })}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
