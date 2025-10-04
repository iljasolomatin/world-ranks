import SearchInput from "@/components/SearchInput";

function CountriesSearch() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground font-semibold">Found X countries</p>
      <SearchInput />
    </div>
  );
}

export default CountriesSearch;
