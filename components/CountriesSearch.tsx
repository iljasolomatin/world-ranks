import SearchInput from "@/components/SearchInput";
import { cn } from "@/lib/utils";

interface CountriesSearchProps {
  className?: string;
}

function CountriesSearch({ className }: CountriesSearchProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-foreground font-semibold">Found X countries</p>
      <SearchInput />
    </div>
  );
}

export default CountriesSearch;
