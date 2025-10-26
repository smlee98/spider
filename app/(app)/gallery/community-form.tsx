"use client";

import { createCommunityPost, updateCommunityPost } from "@/actions/gallery/actions";
import { cranes } from "@/app/(app)/equipment/constants";
import { DialogCancel } from "@/components/dialog-cancel";
import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof formSchema>;

const formSchema = z.object({
  type: z.string().min(1, { message: "타입이 선택되지 않았습니다." }),
  brand: z.string().min(1, { message: "브랜드가 선택되지 않았습니다." }),
  model: z.string().min(1, { message: "모델이 선택되지 않았습니다." }),
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().min(1, { message: "내용을 입력해주세요." })
});

export function CommunityPostForm({
  defaultValues,
  id
}: {
  defaultValues?: Partial<{ type: string; brand: string; model: string; title: string; content: string; DELETE?: boolean }>;
  id?: string;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      type: defaultValues?.type ?? "",
      brand: defaultValues?.brand ?? "",
      model: defaultValues?.model ?? "",
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? ""
    }
  });

  const router = useRouter();

  // 선택된 type과 brand를 watch
  const selectedType = form.watch("type");
  const selectedBrand = form.watch("brand");

  // type에 따라 사용 가능한 brands 필터링
  const availableBrands = useMemo(() => {
    if (!selectedType) return [];
    const craneType = cranes.find((c) => c.type === selectedType);
    return craneType?.brands ?? [];
  }, [selectedType]);

  // brand에 따라 사용 가능한 models 필터링
  const availableModels = useMemo(() => {
    if (!selectedBrand) return [];
    const brand = availableBrands.find((b) => b.brandName === selectedBrand);
    return brand?.equipments ?? [];
  }, [selectedBrand, availableBrands]);

  const handleSubmit = async (data: FormData) => {
    try {
      if (id) {
        await updateCommunityPost({ id, data });
      } else {
        await createCommunityPost({ data });
      }
      router.push(".");
    } catch (error) {
      console.error(error);
    }
  };

  const typeMap = {
    spider: "거미크레인",
    crawler: "크롤러 크레인",
    "boom-lift": "굴절식 고소작업대"
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mx-auto flex w-full flex-col gap-y-10 lg:max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>타입</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          // type 변경 시 brand와 model 초기화
                          form.setValue("brand", "");
                          form.setValue("model", "");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="타입을 선택하세요." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {cranes.map((crane) => (
                              <SelectItem key={crane.type} value={crane.type}>
                                {typeMap[crane.type as keyof typeof typeMap]}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="brand"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>브랜드</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          // brand 변경 시 model 초기화
                          form.setValue("model", "");
                        }}
                        disabled={!selectedType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="브랜드를 선택하세요." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {availableBrands.map((brand) => (
                              <SelectItem key={brand.brandName} value={brand.brandName}>
                                {brand.brandName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="model"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>모델</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange} disabled={!selectedBrand}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="모델을 선택하세요." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {availableModels.map((equipment) => (
                              <SelectItem key={equipment.modelName} value={equipment.modelName}>
                                {equipment.modelName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="제목을 입력해주세요." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-y-4">
          <div>
            <h3 className="text-lg font-medium">내용</h3>
            <p className="text-muted-foreground text-sm">등록하려는 게시글의 내용을 작성합니다.</p>
          </div>
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem>
                <div>
                  <Editor className="h-[480px]" content={field.value} onValueChange={field.onChange} />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-between gap-8">
            <DialogCancel />
            <Button type="submit">{!id ? "등록" : "수정"}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
