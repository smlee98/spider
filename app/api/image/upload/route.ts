import { IMAGES_BUCKET, createAdminClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ status: string; data?: { url: string; size: number }[]; result?: string }>> {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const data: { url: string; size: number }[] = [];

    const supabase = createAdminClient();

    for await (const fileEntry of files) {
      if (!(fileEntry instanceof File)) {
        return NextResponse.json({ status: "fail", result: "invalid file" }, { status: 400 });
      }

      const file = fileEntry as File;
      const { name, size } = file;

      // 파일 크기 제한 (50MB)
      if (size > 50 * 1024 * 1024) {
        return NextResponse.json({ status: "fail", result: "File too large (max 50MB)" }, { status: 400 });
      }

      // 이미지 타입 검증
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ status: "fail", result: "Only image files are allowed" }, { status: 400 });
      }

      const timestamp = Date.now();
      const sanitizedName = name?.replace(/[^a-zA-Z0-9.-]/g, "_") || "image";
      const fileName = `${timestamp}_${sanitizedName}`;

      try {
        const arrayBuffer = await file.arrayBuffer();

        // Service Role로 업로드
        const { data: uploadData, error } = await supabase.storage.from(IMAGES_BUCKET).upload(fileName, arrayBuffer, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false
        });

        if (error) {
          throw error;
        }

        // 공개 URL 가져오기
        const { data: publicUrlData } = supabase.storage.from(IMAGES_BUCKET).getPublicUrl(uploadData.path);

        data.push({ url: publicUrlData.publicUrl, size });
      } catch (storageError) {
        console.error("Supabase Storage error:", storageError);
      }
    }

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        status: "fail",
        result: error instanceof Error ? error.message : "서버 오류가 발생했습니다."
      },
      { status: 500 }
    );
  }
}
