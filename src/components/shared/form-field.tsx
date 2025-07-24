import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import type { ReactNode } from "react";

export default function FormField({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Label className={cn("grid w-full items-center gap-2", className)}>
      {children}
    </Label>
  );
}
