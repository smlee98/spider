"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getIronSession, IronSession, type SessionOptions } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const { AUTH_SECRET, SESSION_COOKIE } = process.env;

const sessionOptions: SessionOptions = {
  password: AUTH_SECRET!,
  cookieName: SESSION_COOKIE!,
  cookieOptions: { maxAge: undefined, secure: false }
};

export async function getSession(request?: NextRequest, response?: NextResponse): Promise<IronSession<{ user: User }>> {
  if (request && response) {
    return await getIronSession(request, response, sessionOptions);
  }
  return await getIronSession(await cookies(), sessionOptions);
}

export async function logout(): Promise<void> {
  const session = await getSession();
  session.destroy();
  revalidatePath("/");
}

export async function login({ data }: { data: { id: string; password: string } }) {
  try {
    const { id, password } = data;

    const session = await getSession();

    const result = await prisma.user.findFirst({
      where: {
        id,
        password
      }
    });

    if (!result?.id) throw new Error("INVALID");

    session.user = result;
    await session.save();

    return result;
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message === "INVALID") return { message: err.message };
    throw error;
  }
}
