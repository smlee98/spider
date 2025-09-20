import { MenusHeading } from "@/components/editor/menus-heading";
import { MenusImage } from "@/components/editor/menus-image";
import { MenusTableCreate } from "@/components/editor/menus-table-create";
import { Separator } from "@/components/ui/separator";
import { Toggle, type toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import {
  Bold,
  Code,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  SeparatorHorizontal,
  SquareChevronRight,
  Strikethrough,
  Subscript,
  Superscript,
  Underline
} from "lucide-react";

interface EditorMenuProps extends VariantProps<typeof toggleVariants> {
  editor: Editor | null;
}

export function EditorMenus({ variant, size, editor }: EditorMenuProps) {
  if (!editor) return null;
  return (
    <div className={cn("flex items-center gap-1 border-b p-2", size === "sm" && "gap-0.5 px-1.5 py-1")}>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("highlight")}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("subscript")}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
      >
        <Subscript className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("superscript")}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
      >
        <Superscript className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="size-4" />
      </Toggle>
      <Separator className="mx-2 h-5! w-px" orientation="vertical" />
      <MenusHeading editor={editor} />
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("codeblock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <SquareChevronRight className="size-4" />
      </Toggle>
      <Toggle
        variant={variant}
        size={size}
        pressed={editor.isActive("horizontalRule")}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <SeparatorHorizontal className="size-4" />
      </Toggle>
      <MenusTableCreate variant={variant} size={size} editor={editor} />
      <MenusImage editor={editor} />
    </div>
  );
}
