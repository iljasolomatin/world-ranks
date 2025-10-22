import CountriesContainer from "@/components/CountriesContainer";
import {
  getCountriesData,
  CountriesParams,
  SortField,
  SortOrder,
  RegionFilter,
  StatusFilter,
} from "@/lib/countries";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    region?: string;
    status?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;

  // Parse and validate search parameters
  const params: CountriesParams = {
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    sortBy: (searchParams.sortBy as SortField) || "population",
    sortOrder: (searchParams.sortOrder as SortOrder) || "desc",
    search: searchParams.search || "",
    region: (searchParams.region as RegionFilter) || "all",
    status: (searchParams.status as StatusFilter) || "all",
  };

  // Fetch all countries data once on server
  const allCountries = await getCountriesData();

  return (
    // FLOATING CARD
    <div className="relative z-20 mx-auto -mt-28 max-w-7xl px-4 md:-mt-14">
      {/* DIV CONTAINS 2 SECTIONS: Search and Sort+Results */}
      <div className="bg-muted grid grid-cols-1 gap-y-4 rounded-lg border px-4 py-6 shadow-lg md:grid-cols-[250px_1fr] md:gap-x-4 md:px-6">
        <CountriesContainer
          initialCountries={allCountries}
          initialParams={params}
        />
      </div>
    </div>
  );
}
