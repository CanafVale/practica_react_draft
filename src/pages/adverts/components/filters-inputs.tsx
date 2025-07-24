import FormField from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { useRef, type ChangeEvent } from "react";
import type { Filters, Tags } from "../types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import TagsSelector from "./tags-selector";
import PriceRange from "./price-range";

export default function FiltersInputs({
  onChange,
  pricesRange,
}: {
  onChange: (filters: Filters) => void;
  pricesRange: [min: number, max: number];
}) {
  const filters = useRef<Filters>({});

  const handleChange = () => {
    onChange({ ...filters.current });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    filters.current.name = event.target.value;
    handleChange();
  };

  const handlePriceChange = (value: number[]) => {
    console.log(value);
    filters.current.price = [value[0], value[1]];
    handleChange();
  };

  const handleSaleChange = (value: string) => {
    if (value === "sale") {
      filters.current.sale = true;
    } else if (value === "buy") {
      filters.current.sale = false;
    } else {
      filters.current.sale = undefined;
    }
    handleChange();
  };

  const handleTagsChange = (tags: Tags) => {
    filters.current.tags = tags;
    handleChange();
  };

  return (
    <div className="grid gap-4 gap-x-6 border-b pb-4 sm:grid-cols-2">
      <FormField>
        Name
        <Input
          type="text"
          placeholder="Name"
          autoComplete="off"
          onChange={handleNameChange}
        />
      </FormField>
      <FormField>
        For sale or Looking to buy?
        <RadioGroup
          className="flex items-center py-2.5"
          defaultValue="all"
          onValueChange={handleSaleChange}
        >
          <Label className="flex items-center gap-2">
            <RadioGroupItem value="sale" />
            For sale
          </Label>
          <Label className="flex items-center gap-2">
            <RadioGroupItem value="buy" />
            Looking to buy
          </Label>
          <Label className="flex items-center gap-2">
            <RadioGroupItem value="all" />
            All
          </Label>
        </RadioGroup>
      </FormField>
      <FormField>
        <PriceRange
          className="py-3"
          min={pricesRange[0]}
          max={pricesRange[1]}
          onValueChange={handlePriceChange}
        />
      </FormField>
      <FormField>
        Tags
        <TagsSelector className="justify-start" onChange={handleTagsChange} />
      </FormField>
    </div>
  );
}
