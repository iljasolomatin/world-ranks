"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  CountriesParams,
  REGIONS,
  RegionFilter as RegionFilterType,
} from "@/lib/countries";
import { useCallback } from "react";

interface RegionFilterProps {
  currentParams: CountriesParams;
  onParamsChange?: (newParams: Partial<CountriesParams>) => void;
}

function RegionFilter({ currentParams, onParamsChange }: RegionFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRegionChange = useCallback(
    (region: RegionFilterType) => {
      if (onParamsChange) {
        // Use callback for instant updates
        onParamsChange({ region });
      } else {
        // Fallback to URL navigation
        const params = new URLSearchParams(searchParams);

        if (region === "all") {
          params.delete("region");
        } else {
          params.set("region", region);
        }

        params.delete("page");
        router.push(`?${params.toString()}`);
      }
    },
    [onParamsChange, router, searchParams],
  );

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Label htmlFor="region">Region</Label>
      <div className="flex flex-wrap gap-2">
        {REGIONS.map((region) => (
          <Button
            key={region}
            variant={currentParams.region === region ? "default" : "outline"}
            size="sm"
            onClick={() => handleRegionChange(region)}
          >
            {region === "all" ? "All" : region}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default RegionFilter;
