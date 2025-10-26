"use server";

import { getSession } from "@/actions/user/action";
import { prisma } from "@/lib/prisma";
import { Post, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getCommunityList(): Promise<Array<Post & { author: User }>> {
  try {
    const data = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" }
    });

    return data;
  } catch (error) {
    console.error("Error fetching community list:", error);
    throw new Error("커뮤니티 목록을 가져오는데 실패했습니다.");
  }
}

export async function getCommunityListByEquipment({
  type,
  brand,
  model
}: {
  type: string;
  brand: string;
  model: string;
}): Promise<Array<Post & { author: User }>> {
  try {
    const data = await prisma.post.findMany({
      where: {
        type,
        brand,
        model
      },
      include: { author: true },
      orderBy: { createdAt: "desc" }
    });

    return data;
  } catch (error) {
    console.error("Error fetching community list by equipment:", error);
    throw new Error("장비별 커뮤니티 목록을 가져오는데 실패했습니다.");
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

export async function createCommunityPost({
  data
}: {
  data: { type: string; brand: string; model: string; title: string; content: string };
}) {
  const { user } = await getSession();
  try {
    const newPost = await prisma.post.create({
      data: {
        type: data.type,
        brand: data.brand,
        model: data.model,
        title: data.title,
        content: data.content,
        authorId: user.id
      }
    });

    revalidatePath("/gallery");
    return newPost;
  } catch (error) {
    console.error("Error creating community post:", error);
    throw new Error("게시글 작성에 실패했습니다.");
  }
}

export async function updateCommunityPost({
  id,
  data
}: {
  id: string;
  data: { type: string; brand: string; model: string; title: string; content: string };
}) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        type: data.type,
        brand: data.brand,
        model: data.model,
        title: data.title,
        content: data.content
      }
    });

    revalidatePath("/gallery");
    revalidatePath(`/gallery/${id}`);
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

    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    console.error("Error deleting community post:", error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
}
