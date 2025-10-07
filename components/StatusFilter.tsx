"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  CountriesParams,
  STATUS_OPTIONS,
  StatusFilter as StatusFilterType,
} from "@/lib/countries";
import { useCallback } from "react";

interface StatusFilterProps {
  currentParams: CountriesParams;
}

function StatusFilter({ currentParams }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = useCallback(
    (status: StatusFilterType) => {
      const params = new URLSearchParams(searchParams);

      if (status === "all") {
        params.delete("status");
      } else {
        params.set("status", status);
      }

      // Reset to page 1 when status changes
      params.delete("page");

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const getStatusLabel = (status: StatusFilterType) => {
    switch (status) {
      case "all":
        return "All";
      case "independent":
        return "Independent";
      case "dependent":
        return "Dependent";
      default:
        return status;
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Label htmlFor="status">Status</Label>
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((status) => (
          <Button
            key={status}
            variant={currentParams.status === status ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusChange(status)}
          >
            {getStatusLabel(status)}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default StatusFilter;
