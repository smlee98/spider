import { CharacterCount } from "@tiptap/extension-character-count";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";

export const extensions = [
  StarterKit,
  Underline,
  Highlight,
  Subscript,
  Superscript,
  Table.configure({ resizable: true, allowTableNodeSelection: true }),
  TableRow,
  TableCell,
  TableHeader,
  CharacterCount,
  Image,
  Dropcursor
];
