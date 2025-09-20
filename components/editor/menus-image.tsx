"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@tiptap/react";
import { ImagePlus } from "lucide-react";
import { useRef } from "react";

export function MenusImage({ editor }: { editor: Editor }) {
  const ref = useRef<HTMLInputElement>(null);

  const handleUploadPhoto = async (files: FileList | null) => {
    if (files === null) return;

    try {
      const formData = new FormData();
      Array.from(files).forEach((x) => formData.append("files", x));

      const response = await fetch("/api/image/upload", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.status === "success" && result.data) {
        result.data.map((item: { url: string }) => {
          editor.chain().focus().setImage({ src: item.url }).run();
        });
      } else {
        console.error("Image upload failed:", result.result || "Unknown error");
        alert("이미지 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Input
        type="file"
        className="hidden"
        accept="image/*"
        ref={ref}
        onChange={(e) => handleUploadPhoto(e.target.files)}
      />
      <Button type="button" variant="ghost" onClick={() => ref.current?.click()}>
        <ImagePlus className="size-4" />
      </Button>
    </div>
  );
}
