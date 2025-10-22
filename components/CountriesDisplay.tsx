import CountriesSearch from "@/components/CountriesSearch";
import CountriesTable from "@/components/CountriesTable";
import RegionFilter from "@/components/RegionFilter";
import SortSelect from "@/components/SortSelect";
import StatusFilter from "@/components/StatusFilter";
import Pagination from "@/components/Pagination";
import {
  getCountriesData,
  processCountries,
  CountriesParams,
} from "@/lib/countries";

interface CountriesDisplayProps {
  params: CountriesParams;
}

export default async function CountriesDisplay({
  params,
}: CountriesDisplayProps) {
  // Fetch all countries data
  const allCountries = await getCountriesData();

  // Process countries based on params (filter, sort, paginate)
  const { countries, totalCount, totalPages, currentPage } = processCountries(
    allCountries,
    params,
  );

  return (
    <>
      <CountriesSearch
        className="sm:col-span-2"
        foundCount={totalCount}
        currentParams={params}
      />

      {/* DIV FOR SORT, FILTERS */}
      <div className="flex flex-col gap-4">
        <SortSelect currentParams={params} />
        <RegionFilter currentParams={params} />
        <StatusFilter currentParams={params} />
      </div>

      <div className="space-y-4 sm:col-start-2">
        <CountriesTable countries={countries} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}
