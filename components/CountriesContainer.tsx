"use client";

import { useState, useMemo, useTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Country,
  CountriesParams,
  filterCountries,
  sortCountries,
  paginateCountries,
} from "@/lib/countries";
import CountriesSearch from "./CountriesSearch";
import CountriesTable from "./CountriesTable";
import SortSelect from "./SortSelect";
import RegionFilter from "./RegionFilter";
import StatusFilter from "./StatusFilter";
import Pagination from "./Pagination";

interface CountriesContainerProps {
  initialCountries: Country[];
  initialParams: CountriesParams;
}

export default function CountriesContainer({
  initialCountries,
  initialParams,
}: CountriesContainerProps) {
  const [isPending, startTransition] = useTransition();
  const [currentParams, setCurrentParams] =
    useState<CountriesParams>(initialParams);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Process countries client-side for instant updates
  const { countries, totalCount, totalPages, currentPage } = useMemo(() => {
    // Filter countries
    const filtered = filterCountries(initialCountries, currentParams);

    // Sort countries
    const sorted = sortCountries(
      filtered,
      currentParams.sortBy,
      currentParams.sortOrder,
    );

    // Paginate countries
    const paginated = paginateCountries(sorted, currentParams.page);

    return {
      countries: paginated.countries,
      totalCount: paginated.totalCount,
      totalPages: paginated.totalPages,
      currentPage: paginated.currentPage,
    };
  }, [initialCountries, currentParams]);

  // Update URL without causing a page refresh
  const updateURL = useCallback(
    (newParams: Partial<CountriesParams>) => {
      const updatedParams = { ...currentParams, ...newParams };

      // Reset to page 1 if we're filtering/sorting
      if (
        "search" in newParams ||
        "region" in newParams ||
        "status" in newParams ||
        "sortBy" in newParams ||
        "sortOrder" in newParams
      ) {
        updatedParams.page = 1;
      }

      setCurrentParams(updatedParams);

      // Update URL in background
      startTransition(() => {
        const params = new URLSearchParams(searchParams);

        // Update URL parameters
        Object.entries(updatedParams).forEach(([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (key === "page" && value === 1) ||
            (key === "sortBy" && value === "population") ||
            (key === "sortOrder" && value === "desc") ||
            (key === "region" && value === "all") ||
            (key === "status" && value === "all")
          ) {
            params.delete(key);
          } else {
            params.set(key, value.toString());
          }
        });

        router.replace(`?${params.toString()}`, { scroll: false });
      });
    },
    [currentParams, router, searchParams, startTransition],
  );

  return (
    <>
      <CountriesSearch
        className="md:col-span-2"
        foundCount={totalCount}
        currentParams={currentParams}
        onParamsChange={updateURL}
      />

      <div className="flex max-w-96 flex-col gap-4">
        <SortSelect currentParams={currentParams} onParamsChange={updateURL} />
        <RegionFilter
          currentParams={currentParams}
          onParamsChange={updateURL}
        />
        <StatusFilter
          currentParams={currentParams}
          onParamsChange={updateURL}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-4 md:col-start-2">
        <CountriesTable countries={countries} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => updateURL({ page })}
        />
      </div>
    </>
  );
}
