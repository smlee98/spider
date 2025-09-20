import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Vercel 환경에서는 이 API를 사용하지 않음 (Base64 data URL 사용)
  if (process.env.VERCEL) {
    return NextResponse.json({
      error: "This endpoint is not available in production. Images are served as data URLs."
    }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const image = searchParams.get("image");

  if (!image) {
    return NextResponse.json({ error: "Missing image query parameter" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "images", image);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    const headers = new Headers();
    headers.append("Content-Type", "image/*");
    return new NextResponse(fileBuffer, { headers });
  } else {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
