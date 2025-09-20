"use client";

import { extensions } from "@/components/editor/extensions";
import { EditorMenus } from "@/components/editor/menus";
import { Spinner } from "@/components/spinner";
import type { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor, type EditorOptions } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import { useEffect, type Dispatch, type SetStateAction } from "react";

interface EditorProps extends Partial<EditorOptions>, VariantProps<typeof toggleVariants> {
  className?: string;
  content?: string;
  onValueChange?: Dispatch<SetStateAction<string>> | ((value: string | ((prev: string) => string)) => void);
  uploader?: (file: File) => Promise<string>;
}

export function Editor({
  className,
  content,
  onValueChange,
  variant,
  size,
  onUpdate,
  editorProps = {},
  uploader,
  ...props
}: EditorProps) {
  const attributes = editorProps?.attributes as { class?: string } & Record<string, unknown>;
  editorProps.attributes = {
    ...attributes,
    class: cn(
      "focus-visible:outline-hidden prose dark:prose-invert prose-table:border prose-tr:divide-x flex-1 max-w-none min-h-0 overflow-y-auto p-4",
      attributes?.class
    )
  };

  const editor = useEditor({
    extensions,
    content,
    editorProps,
    onUpdate: (event) => {
      onValueChange?.(event.editor.getHTML());
      onUpdate?.(event);
    },
    immediatelyRender: false,
    ...props
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== content) editor.commands.setContent(content ?? "");
  }, [content, editor]);

  const length = editor?.storage.characterCount.characters();

  useEffect(() => {
    if (!editor) return;
    if (length === 0) {
      editor.commands.clearContent();
      onValueChange?.("");
    }
  }, [length]);

  return (
    <div
      className={cn(
        "bg-background focus-within:ring-ring relative flex min-h-64 flex-col rounded-md border shadow-xs focus-within:ring-1",
        className
      )}
    >
      {editor ? (
        <>
          <EditorMenus editor={editor} variant={variant} size={size} />
          <EditorContent editor={editor} className="flex min-h-0 flex-1 flex-col" />
        </>
      ) : (
        <Spinner className="m-auto size-5 opacity-50" />
      )}
    </div>
  );
}
