"use client";

import { extensions } from "@/components/editor/extensions";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor, type EditorOptions } from "@tiptap/react";

interface ViewerProps extends Partial<EditorOptions> {
  className?: string;
  content?: string;
}

export function Viewer({ className, content, editorProps = {}, ...props }: ViewerProps) {
  const attributes = editorProps?.attributes as { class?: string } & Record<string, unknown>;
  editorProps.attributes = {
    ...attributes,
    class: cn(
      "focus-visible:outline-hidden prose dark:prose-invert prose-table:border prose-tr:divide-x flex-1 max-w-none min-h-0 overflow-y-auto",
      attributes?.class
    )
  };

  const editor = useEditor({
    extensions,
    content,
    editorProps,
    editable: false,
    immediatelyRender: false,
    ...props
  });

  return (
    <div className="flex flex-col">
      {editor && <EditorContent editor={editor} className={cn("flex min-h-0 flex-1 flex-col", className)} />}
    </div>
  );
}
