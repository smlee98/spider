import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ status: string; data?: { path: string; size: number }[]; result?: string }>> {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const data: { path: string; size: number }[] = [];
    const uploadPath = "./public/images";
    const downloadPath = "/api/image?image=";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    for await (const fileEntry of files) {
      if (!(fileEntry instanceof File)) {
        return NextResponse.json({ status: "fail", result: "invalid file" }, { status: 400 });
      }

      const file = fileEntry as File;
      const { name, size } = file;
      const fileName = Date.now() + "." + (name?.split(".").at(-1) ?? "");

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync([uploadPath, fileName].join("/"), buffer);

      data.push({ path: downloadPath + fileName, size });
    }

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "fail" }, { status: 500 });
  }
}
