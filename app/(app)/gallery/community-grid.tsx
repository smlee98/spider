"use client";

import { getCommunityList } from "@/actions/gallery/actions";
import { Spinner } from "@/components/spinner";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Post, User } from "@prisma/client";
import { format } from "date-fns";
import { ImageOff, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

// HTML 콘텐츠에서 첫 번째 이미지 URL 추출
function extractFirstImage(htmlContent: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
}

const fetcher = async (): Promise<Array<Post & { author: User }>> => {
  return await getCommunityList();
};

export function CommunityGrid({ user }: { user?: User }) {
  const { data, isLoading } = useSWR<Array<Post & { author: User }>, Error>("community-list", fetcher);

  const pathname = usePathname();

  return (
    <div className="relative flex size-full flex-col gap-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-3xl font-black md:text-4xl">현장사진</h1>
          <p className="text-muted-foreground">
            {isLoading ? "데이터를 가져오고 있습니다." : `${data?.length ?? 0}개의 데이터`}
          </p>
        </div>
        {user && (
          <div className="flex items-center justify-end">
            <Link href={`${pathname}/new`} className={buttonVariants({ variant: "default" })}>
              <Plus className="size-4" />
              게시글 작성
            </Link>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="flex size-full grow flex-col items-center justify-center gap-2 py-36">
          <Spinner className="size-4" />
          <p className="text-muted-foreground animate-pulse text-base">데이터를 가져오고 있습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {data?.map((post: Post & { author: User }) => {
            const firstImage = extractFirstImage(post.content);
            return (
              <Link key={post?.id} href={`${pathname}/${post.id}`} className="group">
                <Card className="group gap-0 overflow-hidden py-0 transition-all group-hover:ring-2">
                  <CardContent className="bg-muted relative flex aspect-video items-center justify-center overflow-hidden p-0">
                    {firstImage ? (
                      <img
                        src={firstImage}
                        alt={post.title}
                        className="absolute top-1/2 left-1/2 z-10 w-full max-w-none -translate-x-1/2 -translate-y-1/2 transition-all group-hover:scale-125"
                      />
                    ) : (
                      <ImageOff className="text-muted-foreground size-8" />
                    )}
                  </CardContent>
                  <CardHeader className="gap-0 border-t py-6">
                    <CardTitle>
                      <div className="flex items-center gap-x-1.5">
                        <span className="text-muted-foreground font-semibold">#{post?.id}</span>
                        <span className="line-clamp-1 flex-1 font-semibold">{post?.title}</span>
                      </div>
                    </CardTitle>
                    <CardDescription>{format(post?.createdAt, "yyyy-MM-dd")}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
