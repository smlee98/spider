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

    const formData = new FormData();
    Array.from(files).forEach((x) => formData.append("files", x));

    const response = await fetch("/api/image/upload", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    result.data.map((item: { path: string }) => {
      editor.chain().focus().setImage({ src: item.path }).run();
    });
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
