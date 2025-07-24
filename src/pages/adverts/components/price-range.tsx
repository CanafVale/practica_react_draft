import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function PriceRange({
  min,
  max,
  onValueChange,
  className,
}: {
  min: number;
  max: number;
  onValueChange: (value: number[]) => void;
  className?: string;
}) {
  const [value, setValue] = useState([min, max]);

  return (
    <div className="grid gap-2">
      <div>
        Price range <span>{`(${value.join(" - ")})`}</span>
      </div>
      <Slider
        className={className}
        min={min}
        max={max}
        defaultValue={[min, max]}
        onValueCommit={onValueChange}
        onValueChange={setValue}
      />
    </div>
  );
}
