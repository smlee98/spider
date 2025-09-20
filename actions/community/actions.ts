"use server";

import { getSession } from "@/actions/user/action";
import { prisma } from "@/lib/prisma";
import { PageInfo, Pagination } from "@/types/common";
import { Post, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CommunityListParams {
  pagination: Pagination;
}

interface CommunityList {
  data: Array<Post & { author: User }>;
  pageInfo: PageInfo;
}

const PAGE_SIZE = 10;

export async function getCommunityList({ pagination }: CommunityListParams): Promise<CommunityList> {
  try {
    const { page = 0 } = pagination;
    const skip = page * PAGE_SIZE;

    // Post 테이블 사용
    const [data, totalCount] = await Promise.all([
      prisma.post.findMany({
        include: { author: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: PAGE_SIZE
      }),
      prisma.post.count()
    ]);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    const isLast = page >= totalPages - 1;

    return {
      data,
      pageInfo: {
        totalElements: totalCount,
        totalPages,
        size: PAGE_SIZE,
        number: page,
        first: page === 0,
        last: isLast,
        numberOfElements: data.length
      }
    };
  } catch (error) {
    console.error("Error fetching community list:", error);
    throw new Error("커뮤니티 목록을 가져오는데 실패했습니다.");
  }
}

export async function getCommunityPost({ id }: { id: string }): Promise<(Post & { author: User }) | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true }
    });

    return post;
  } catch (error) {
    console.error("Error fetching community post:", error);
    return null;
  }
}

export async function createCommunityPost({ data }: { data: { title: string; content: string } }) {
  const { user } = await getSession();
  try {
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: user.id
      }
    });

    revalidatePath("/community");
    return newPost;
  } catch (error) {
    console.error("Error creating community post:", error);
    throw new Error("게시글 작성에 실패했습니다.");
  }
}

export async function updateCommunityPost({ id, data }: { id: string; data: { title: string; content: string } }) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        content: data.content
      }
    });

    revalidatePath("/community");
    revalidatePath(`/community/${id}`);
    return updatedPost;
  } catch (error) {
    console.error("Error updating community post:", error);
    throw new Error("게시글 수정에 실패했습니다.");
  }
}

export async function deleteCommunityPost({ id }: { id: string }) {
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) }
    });

    revalidatePath("/community");
    return { success: true };
  } catch (error) {
    console.error("Error deleting community post:", error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
}
