"use client";

import { createCommunityPost, updateCommunityPost } from "@/actions/gallery/actions";
import { DialogCancel } from "@/components/dialog-cancel";
import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof formSchema>;

const formSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().min(1, { message: "내용을 입력해주세요." })
});

export function CommunityPostForm({
  defaultValues,
  id
}: {
  defaultValues?: Partial<{ title: string; content: string; DELETE?: boolean }>;
  id?: string;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? ""
    }
  });

  const router = useRouter();

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mx-auto flex w-full flex-col gap-y-10 lg:max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
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
