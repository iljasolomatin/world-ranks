import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function SortSelect() {
  return (
    <Select name="sortBy">
      <Label htmlFor="sortBy">Sort by</Label>
      <SelectTrigger className="mb-4 w-full max-w-96 sm:max-w-full">
        <SelectValue placeholder="Population" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="population">Population</SelectItem>
        <SelectItem value="alphabetical">Alphabetical</SelectItem>
        <SelectItem value="area">Area</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SortSelect;
