"use client";

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
import type { Equipment as EquipmentType } from "@/app/(app)/equipment/constants";

interface Equipment extends EquipmentType {
  brandName: string;
  type?: string; // 상세페이지 라우팅을 위한 타입
}

const ITEMS_PER_PAGE = 12;

export function EquipmentTable({ data }: { data: Equipment[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // 데이터가 변경되면 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  // 상세페이지로 이동
  const handleRowClick = (equipment: Equipment) => {
    if (!equipment.type) return;

    const type = equipment.type;
    const brand = equipment.brandName.toLowerCase();
    const model = equipment.modelName.toLowerCase();

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
                <TableHead className="font-semibold whitespace-nowrap">치수 (LxWxH)</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">최대 안전하중</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">최대 인양높이</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">최대 인양길이</TableHead>
                <TableHead className="pr-4 font-semibold whitespace-nowrap">작동방식</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((equipment: Equipment, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(equipment)}
                >
                  <TableCell className="pl-4 font-medium whitespace-nowrap">{equipment.brandName}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {equipment.modelName}
                    {equipment.accessories && equipment.accessories.length > 0 && (
                      <span className="text-muted-foreground ml-1 text-xs">
                        ({equipment.accessories.map(acc => acc.accessoryName).join(", ")})
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">{equipment.dimensions || "-"}</TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{equipment.maxSafeLoad || "-"}</TableCell>
                  <TableCell className="whitespace-nowrap">{equipment.maxLiftingHeight || "-"}</TableCell>
                  <TableCell className="whitespace-nowrap">{equipment.maxLiftingLength || "-"}</TableCell>
                  <TableCell className="pr-4 whitespace-nowrap">{equipment.operatingMethod || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-2">
          <p className="text-muted-foreground text-sm">
            총 <span className="text-foreground font-semibold">{data.length}</span>개의 장비
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
