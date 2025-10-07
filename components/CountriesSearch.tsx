import SearchInput from "@/components/SearchInput";
import { cn } from "@/lib/utils";
import { CountriesParams } from "@/lib/countries";

interface CountriesSearchProps {
  className?: string;
  foundCount?: number;
  currentParams: CountriesParams;
}

function CountriesSearch({
  className,
  foundCount = 0,
  currentParams,
}: CountriesSearchProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-foreground font-semibold">
        Found {foundCount} countries
      </p>
      <SearchInput currentParams={currentParams} />
    </div>
  );
}

export default CountriesSearch;
