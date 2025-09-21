"use client";

import { Viewer } from "@/components/editor/viewer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post, User } from "@prisma/client";
import { format } from "date-fns";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommunityRemove } from "./community-remove";

export function CommunityPost({ user, data }: { user?: User; data: Post & { author: User } }) {
  const router = useRouter();
  return (
    <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <h1 className="text-foreground text-3xl font-black md:text-4xl">{data.title}</h1>
            <div className="mt-1 flex items-center gap-1">
              <div className="text-muted-foreground flex items-center gap-x-2 text-sm">
                <span>{data.author?.name ?? "-"}</span>
                <span>&middot;</span>
                <span>{format(data.createdAt, "yyyy년 MM월 dd일 HH시 mm분")}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 [&>*]:flex-1">
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/community`);
                router.refresh();
              }}
            >
              <ArrowLeft />
              목록 보기
            </Button>
            {user && (
              <>
                <Link href={`/community/${data.id}/edit`} className={buttonVariants({ variant: "outline" })}>
                  <Edit className="size-4" />
                  게시글 수정
                </Link>
                <CommunityRemove id={String(data.id)} />
              </>
            )}
          </div>
        </div>
        <div className="grid w-full grid-cols-3 gap-6">
          <div className="col-span-full md:col-span-2">
            <Viewer content={data?.content ?? ""} />
          </div>
          <div className="col-span-full md:col-auto">
            <div className="sticky top-24 flex flex-col gap-y-6">
              {/* 게시글 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle>게시글 정보</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="grid gap-3">
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">등록자</span>
                        <span>{data.author?.name ?? "-"}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">등록일자</span>
                        <span>{format(data.createdAt, "yyyy년 MM월 dd일 HH시 mm분")}</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
