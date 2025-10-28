"use client";

import type { Equipment as EquipmentType } from "@/app/(app)/equipment/constants";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Equipment extends EquipmentType {
  brandName: string;
  type?: string; // 상세페이지 라우팅을 위한 타입
}

// 테이블 row 데이터 타입 (악세서리 정보가 확장됨)
interface TableRowData {
  brandName: string;
  modelName: string;
  type?: string;
  accessoryName: string;
  accessoryType?: string; // 필터링을 위한 악세서리 타입
  dimensions: string;
  bodyWeight: string;
  maxSafeLoad: string;
  maxLiftingHeight: string;
  operatingMethod: string;
  originalEquipment: Equipment; // 원본 장비 정보 (라우팅용)
}

const ITEMS_PER_PAGE = 10;

export function EquipmentTable({ data, accessoryFilter }: { data: Equipment[]; accessoryFilter?: string }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // 장비 데이터를 악세서리별 row로 확장
  const expandedData: TableRowData[] = data.flatMap((equipment) => {
    // 기본 모델 row (악세서리 없는 상태)
    const baseRow: TableRowData = {
      brandName: equipment.brandName,
      modelName: equipment.modelName,
      type: equipment.type,
      accessoryName: "-",
      dimensions: equipment.dimensions || "-",
      bodyWeight: equipment.bodyWeight || "-",
      maxSafeLoad: equipment.maxSafeLoad || "-",
      maxLiftingHeight: equipment.maxLiftingHeight || "-",
      operatingMethod: equipment.operatingMethod || "-",
      originalEquipment: equipment
    };

    if (!equipment.accessories || equipment.accessories.length === 0) {
      // 악세서리가 없으면 기본 모델만 표시
      return [baseRow];
    }

    // 악세서리가 있으면 각 악세서리 row 생성
    const accessoryRows = equipment.accessories.map((accessory) => ({
      brandName: equipment.brandName,
      modelName: equipment.modelName,
      type: equipment.type,
      accessoryName: accessory.accessoryName,
      accessoryType: accessory.accessoryType, // 필터링을 위해 추가
      dimensions: accessory.dimensions || "-",
      bodyWeight: accessory.bodyWeight || "-",
      maxSafeLoad: accessory.maxSafeLoad || "-",
      maxLiftingHeight: accessory.maxLiftingHeight || "-",
      operatingMethod: equipment.operatingMethod || "-",
      originalEquipment: equipment
    }));

    // 필터가 있으면 해당 악세서리 row만 반환
    if (accessoryFilter) {
      if (accessoryFilter === "base_jib") {
        // 기본 + 보조붐: 기본 모델과 jib 악세서리만
        const jibRows = accessoryRows.filter((row) => row.accessoryType === "jib");
        return [baseRow, ...jibRows];
      } else {
        // 다른 타입: 해당 악세서리만
        return accessoryRows.filter((row) => row.accessoryType === accessoryFilter);
      }
    }

    // 필터가 없으면 기본 모델 + 모든 악세서리
    return [baseRow, ...accessoryRows];
  });

  // 데이터가 변경되면 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [expandedData.length]);

  // 페이지네이션 계산 (확장된 데이터 기준)
  const totalPages = Math.ceil(expandedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = expandedData.slice(startIndex, endIndex);

  // 상세페이지로 이동
  const handleRowClick = (rowData: TableRowData) => {
    if (!rowData.type) return;

    const type = rowData.type;
    const brand = rowData.brandName.toLowerCase();
    const model = rowData.modelName.toLowerCase();

    router.push(`/equipment/${type}/${brand}/${model}`);
  };

  if (data.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">검색 조건에 맞는 장비가 없습니다.</p>
          <p className="text-muted-foreground mt-2 text-sm">필터를 조정하여 다시 시도해주세요.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-4 font-semibold whitespace-nowrap">제작사</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">모델명</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">악세서리</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">치수 (LxWxH)</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">차체 무게</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">최대 안전하중</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">최대 인양높이</TableHead>
              <TableHead className="pr-4 font-semibold whitespace-nowrap">작동방식</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((rowData: TableRowData, index: number) => (
              <TableRow
                key={index}
                className="hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => handleRowClick(rowData)}
              >
                <TableCell className="pl-4 font-medium whitespace-nowrap">{rowData.brandName}</TableCell>
                <TableCell className="whitespace-nowrap">{rowData.modelName}</TableCell>
                <TableCell className="text-sm whitespace-nowrap">{rowData.accessoryName}</TableCell>
                <TableCell className="text-sm whitespace-nowrap">{rowData.dimensions}</TableCell>
                <TableCell className="whitespace-nowrap">{rowData.bodyWeight}</TableCell>
                <TableCell className="font-medium whitespace-nowrap">{rowData.maxSafeLoad}</TableCell>
                <TableCell className="whitespace-nowrap">{rowData.maxLiftingHeight}</TableCell>
                <TableCell className="pr-4 whitespace-nowrap">{rowData.operatingMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-2">
          <p className="text-muted-foreground text-sm">
            총 <span className="text-foreground font-semibold">{expandedData.length}</span>개의 항목
          </p>
          <Pagination className="mx-0 w-auto justify-normal">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {/* 페이지 번호 표시 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
}
