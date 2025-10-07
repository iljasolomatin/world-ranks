"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import searchIcon from "@/public/Search.svg";
import { Input } from "@/components/ui/input";
import { CountriesParams } from "@/lib/countries";
import { useCallback } from "react";

interface SearchInputProps {
  placeholder?: string;
  currentParams: CountriesParams;
}

function SearchInput({
  placeholder = "Search by Name, Region, Subregion",
  currentParams,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const params = new URLSearchParams(searchParams);

      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      // Reset to page 1 when searching
      params.delete("page");

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="relative w-full max-w-96">
      <Image
        src={searchIcon}
        width={18}
        height={18}
        alt="Search"
        className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 transform"
      />
      <Input
        type="text"
        placeholder={placeholder}
        defaultValue={currentParams.search || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-input pl-10 shadow-none"
      />
    </div>
  );
}

export default SearchInput;
