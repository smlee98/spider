"use server";

import { prisma } from "@/lib/prisma";
import { Post, User } from "@prisma/client";

export async function getListByEquipment({
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
