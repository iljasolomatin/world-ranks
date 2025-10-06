import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

const regions: string[] = [
  "Americas",
  "Antarctic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];

function RegionFilter() {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <Label htmlFor="region">Region</Label>
      <div className="flex flex-wrap gap-2">
        {regions.map((region) => (
          <Button key={region} variant="outline" size="sm">
            {region}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default RegionFilter;
