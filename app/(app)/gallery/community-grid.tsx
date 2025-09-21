"use client";

import { getCommunityList } from "@/actions/community/actions";
import { Spinner } from "@/components/spinner";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageInfo, Pagination } from "@/types/common";
import { Post, User } from "@prisma/client";
import { format } from "date-fns";
import { ImageOff, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

// HTML 콘텐츠에서 첫 번째 이미지 URL 추출
function extractFirstImage(htmlContent: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
}

interface CommunityListParams {
  pagination: Pagination;
}

interface CommunityList {
  data: Array<Post & { author: User }>;
  pageInfo: PageInfo;
}

const fetcher = async (arg: CommunityListParams): Promise<CommunityList> => {
  return await getCommunityList(arg);
};

export function CommunityGrid({ user }: { user?: User }) {
  const getKey = (pageIndex: number, previousPageData: CommunityList | null): CommunityListParams | null => {
    if (previousPageData && previousPageData.pageInfo.last) return null;
    return { pagination: { page: pageIndex } };
  };
  const { ref, inView } = useInView({ delay: 100 });
  const { data, setSize, isValidating, isLoading } = useSWRInfinite<CommunityList, Error>(getKey, fetcher, {
    onSuccess: (data: CommunityList[]) => {
      if (isValidating || data.at(-1)?.pageInfo.last) return;
      if (inView) void setSize((size: number) => size + 1);
    },
    revalidateFirstPage: true
  });

  useEffect(() => {
    if (isValidating || data?.at(-1)?.pageInfo.last) return;
    if (inView) void setSize((size: number) => size + 1);
  }, [inView, setSize, isValidating, data]);

  const pathname = usePathname();

  return (
    <div className="relative flex size-full flex-col gap-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-3xl font-black md:text-4xl">현장사진</h1>
          <p className="text-muted-foreground">
            {isLoading ? "데이터를 가져오고 있습니다." : `${data?.at(-1)?.pageInfo?.totalElements ?? 0}개의 데이터`}
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
          {data?.flatMap(({ data }: CommunityList) =>
            data.map((post: Post & { author: User }) => {
              const firstImage = extractFirstImage(post.content);

              return (
                <Link key={post?.id} href={`${pathname}/${post.id}`} className="group">
                  <Card className="group gap-0 overflow-hidden py-0 transition-all group-hover:ring-2">
                    <CardContent className="bg-muted relative flex aspect-square items-center justify-center overflow-hidden p-0">
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
            })
          )}
          <div ref={ref} className="text-muted-foreground flex min-h-px w-full items-center justify-center gap-2 py-4">
            {isValidating && (
              <>
                <Spinner className="size-4" />
                <span>데이터를 불러오는 중입니다.</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
