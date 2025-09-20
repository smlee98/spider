import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import { Table2 } from "lucide-react";
import { useState } from "react";

const MIN_SIZE = 6;

export function MenusTableCreate({ editor, variant, size }: VariantProps<typeof toggleVariants> & { editor: Editor }) {
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={toggleVariants({ variant, size })}>
          <Table2 className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="grid gap-0.5">
          {Array.from({ length: rows < MIN_SIZE ? MIN_SIZE : rows }).map((_, rowIndex) => (
            <div className="flex gap-0.5" key={rowIndex}>
              {Array.from({ length: cols < MIN_SIZE ? MIN_SIZE : cols }).map((_, cellIndex) => (
                <div className="flex gap-0.5" key={cellIndex}>
                  <button
                    className={cn("size-4 border", rowIndex < rows && cellIndex < cols && "bg-primary/10")}
                    onMouseEnter={() => {
                      setRows(rowIndex + 1);
                      setCols(cellIndex + 1);
                    }}
                    onClick={() => editor.commands.insertTable({ rows, cols })}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
