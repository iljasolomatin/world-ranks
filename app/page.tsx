import CountriesDisplay from "@/components/CountriesDisplay";
import {
  CountriesParams,
  SortField,
  SortOrder,
  RegionFilter,
  StatusFilter,
} from "@/lib/countries";

interface PageProps {
  searchParams: {
    page?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    region?: string;
    status?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  // Parse and validate search parameters
  const params: CountriesParams = {
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    sortBy: (searchParams.sortBy as SortField) || "population",
    sortOrder: (searchParams.sortOrder as SortOrder) || "desc",
    search: searchParams.search || "",
    region: (searchParams.region as RegionFilter) || "all",
    status: (searchParams.status as StatusFilter) || "all",
  };

  return (
    // FLOATING CARD
    <div className="relative z-20 mx-auto -mt-28 max-w-7xl px-4">
      {/* DIV CONTAINS 2 SECTIONS: Search and Sort+Results */}
      <div className="bg-muted grid grid-cols-1 gap-y-4 rounded-lg border px-4 py-6 shadow-lg sm:grid-cols-[1fr_2fr] sm:gap-x-4">
        <CountriesDisplay params={params} />
      </div>
    </div>
  );
}
