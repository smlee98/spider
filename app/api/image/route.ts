import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, IMAGES_BUCKET } from "@/lib/supabase";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const image = searchParams.get("image");

  if (!image) {
    return NextResponse.json({ error: "Missing image query parameter" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase.storage
      .from(IMAGES_BUCKET)
      .download(image);

    if (error) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.append("Content-Type", data.type || "image/*");
    headers.append("Cache-Control", "public, max-age=3600");

    return new NextResponse(data, { headers });
  } catch (error) {
    console.error("Image download error:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
