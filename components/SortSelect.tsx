"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  CountriesParams,
  SORT_OPTIONS,
  SortField,
  SortOrder,
} from "@/lib/countries";
import { useCallback } from "react";

interface SortSelectProps {
  currentParams: CountriesParams;
  onParamsChange?: (newParams: Partial<CountriesParams>) => void;
}

function SortSelect({ currentParams, onParamsChange }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = useCallback(
    (value: string) => {
      // Parse the value (format: "field:order")
      const [sortBy, sortOrder] = value.split(":") as [SortField, SortOrder];

      if (onParamsChange) {
        // Use callback for instant updates
        onParamsChange({ sortBy, sortOrder });
      } else {
        // Fallback to URL navigation
        const params = new URLSearchParams(searchParams);
        router.push(`?${params.toString()}`);
      }
    },
    [onParamsChange, router, searchParams],
  );

  const currentValue = `${currentParams.sortBy}:${currentParams.sortOrder}`;

  return (
    <div>
      <Label htmlFor="sortBy">Sort by</Label>
      <Select value={currentValue} onValueChange={handleSortChange}>
        <SelectTrigger className="mb-4 w-full max-w-96 sm:max-w-full">
          <SelectValue placeholder="Population" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="population:desc">
            Population (High to Low)
          </SelectItem>
          <SelectItem value="population:asc">
            Population (Low to High)
          </SelectItem>
          <SelectItem value="name:asc">Name (A to Z)</SelectItem>
          <SelectItem value="name:desc">Name (Z to A)</SelectItem>
          <SelectItem value="area:desc">Area (Large to Small)</SelectItem>
          <SelectItem value="area:asc">Area (Small to Large)</SelectItem>
          <SelectItem value="region:asc">Region (A to Z)</SelectItem>
          <SelectItem value="region:desc">Region (Z to A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortSelect;
