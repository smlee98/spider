"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

type EquipmentFilters = {
  maxWeight: number;
  minLoad: number;
  minHeight: number;
};

export function EquipmentFilters({ onFilterChange }: { onFilterChange: (filters: EquipmentFilters) => void }) {
  const initialFilters = {
    maxWeight: 0,
    minLoad: 0,
    minHeight: 0
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
            <Label htmlFor="maxWeight" className="text-sm font-medium">
              최대 차체 무게
            </Label>
            <div className="relative">
              <Input
                id="maxWeight"
                type="number"
                min={0}
                step="0.1"
                placeholder="최대 차체 무게"
                value={filters.maxWeight || ""}
                onChange={(e) => setFilters({ ...filters, maxWeight: Number(e.target.value) || 0 })}
                className="w-full pr-12"
              />
              <span className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 text-sm">ton</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="minLoad" className="text-sm font-medium">
              최소 안전하중
            </Label>
            <div className="relative">
              <Input
                id="minLoad"
                type="number"
                min={0}
                step="0.1"
                placeholder="최소 안전하중"
                value={filters.minLoad || ""}
                onChange={(e) => setFilters({ ...filters, minLoad: Number(e.target.value) || 0 })}
                className="w-full pr-12"
              />
              <span className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 text-sm">ton</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="minHeight" className="text-sm font-medium">
              최소 인양높이
            </Label>
            <div className="relative">
              <Input
                id="minHeight"
                type="number"
                min={0}
                step="0.1"
                placeholder="최소 인양높이 입력"
                value={filters.minHeight || ""}
                onChange={(e) => setFilters({ ...filters, minHeight: Number(e.target.value) || 0 })}
                className="w-full pr-12"
              />
              <span className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 text-sm">m</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
