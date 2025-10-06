"use client";

import Image from "next/image";
import searchIcon from "@/public/Search.svg";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function SearchInput({
  placeholder = "Search by Name, Region, Subregion",
  value,
  onChange,
}: SearchInputProps) {
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
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-input pl-10 shadow-none"
      />
    </div>
  );
}

export default SearchInput;
