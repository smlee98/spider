import { put } from "@vercel/blob";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ status: string; data?: { url: string; size: number }[]; result?: string }>> {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const data: { url: string; size: number }[] = [];

    for await (const fileEntry of files) {
      if (!(fileEntry instanceof File)) {
        return NextResponse.json({ status: "fail", result: "invalid file" }, { status: 400 });
      }

      const file = fileEntry as File;
      const { name, size } = file;
      const fileName = Date.now() + "_" + (name || "image");

      if (process.env.VERCEL && process.env.BLOB_READ_WRITE_TOKEN) {
        // Vercel Blob Storage 사용 (프로덕션)
        try {
          const blob = await put(fileName, file, {
            access: "public",
            contentType: file.type
          });
          data.push({ url: blob.url, size });
        } catch (blobError) {
          console.error("Blob upload error:", blobError);
          // Blob 실패 시 Base64 fallback
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString('base64');
          const dataUrl = `data:${file.type};base64,${base64}`;
          data.push({ url: dataUrl, size });
        }
      } else {
        // 로컬 개발 환경: 파일시스템에 저장
        const uploadPath = "./public/images";

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filePath = path.join(uploadPath, fileName);
        fs.writeFileSync(filePath, buffer);
        data.push({ url: `/api/image?image=${fileName}`, size });
      }
    }

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ status: "fail", result: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
