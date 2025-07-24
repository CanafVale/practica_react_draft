import { Euro } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Advert } from "../types";

const tagsClassNames: Record<string, string> = {
  lifestyle: "bg-chart-1",
  mobile: "bg-chart-2",
  motor: "bg-chart-3",
  work: "bg-chart-4",
};

interface AdvertCardProps {
  advert: Advert;
}

export function AdvertCard({ advert }: AdvertCardProps) {
  return (
    <div className="bg-card rounded-md shadow transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2">
          <h3 className="overflow-hidden text-xl text-ellipsis whitespace-nowrap">
            {advert.name}
          </h3>
          <Badge className="self-start">
            {advert.sale ? "for sale" : "looking to buy"}
          </Badge>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Price</span>
            <span className="flex h-8 items-center gap-2 text-2xl">
              <Euro className="stroke-primary" />
              {advert.price}
            </span>
          </div>
          <div className="flex grow flex-col">
            <span className="text-muted-foreground">Tags</span>
            <ul className="flex flex-wrap gap-1">
              {advert.tags.map((tag) => (
                <li key={tag}>
                  <Badge className={tagsClassNames[tag]}>{tag}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
