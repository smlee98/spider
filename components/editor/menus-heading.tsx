import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import type { Level } from "@tiptap/extension-heading";
import type { Editor } from "@tiptap/react";
import { Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";

export function MenusHeading({ editor }: { editor: Editor }) {
  const icons = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6];
  const array = Array.from({ length: icons.length });
  const isActive = array.some((_, index) => editor.isActive("heading", { level: index + 1 }));
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={isActive ? "secondary" : "ghost"} className="px-3 py-0">
          <Heading />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex gap-4">
          {array.map((_, index) => {
            const Icon = icons[index]!;
            const level = (index + 1) as Level;
            return (
              <Toggle
                key={level}
                pressed={editor.isActive("heading", { level })}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
              >
                <Icon />
              </Toggle>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
