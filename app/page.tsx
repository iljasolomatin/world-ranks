import CountriesSearch from "@/components/CountriesSearch";
import RegionFilter from "@/components/RegionFilter";
import SortSelect from "@/components/SortSelect";
import StatusFilter from "@/components/StatusFilter";

function page() {
  return (
    // FLOATING CARD
    <div className="relative z-20 mx-auto -mt-28 max-w-7xl px-4">
      {/* DIV CONTAINS 2 SECTIONS: Search and Sort+Results */}
      <div className="bg-muted grid grid-cols-1 gap-y-4 rounded-lg border px-4 py-6 shadow-lg sm:grid-cols-[1fr_2fr] sm:gap-x-4">
        <CountriesSearch className="sm:col-span-2" />

        {/* DIV FOR SORT, FILTERS */}
        <div className="flex flex-col gap-4">
          <SortSelect />
          <RegionFilter />
          <StatusFilter />
        </div>

        <div className="sm:col-start-2">
          <p>RESULTS</p>
        </div>
      </div>
    </div>
  );
}

export default page;
