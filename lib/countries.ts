import {
  getCountries as getCountriesAPI,
  getCountriesByCodes as getCountryByCodeAPI,
} from "@yusifaliyevpro/countries";

export interface Country {
  name: { common: string };
  flags: { svg: string };
  population: number;
  area: number;
  region: string;
  independent?: boolean;
  cca3?: string;
}

export type SortField = "name" | "population" | "area" | "region";
export type SortOrder = "asc" | "desc";
export type StatusFilter = "all" | "independent" | "dependent";
export type RegionFilter =
  | "all"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania"
  | "Antarctic";

export interface CountriesParams {
  page?: number;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  search?: string;
  region?: RegionFilter;
  status?: StatusFilter;
}

export interface PaginatedCountries {
  countries: Country[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export async function getCountriesData(): Promise<Country[]> {
  try {
    const countries = await getCountriesAPI(
      {
        fields: [
          "name",
          "flags",
          "population",
          "area",
          "region",
          "independent",
          "cca3",
        ],
      },
      {
        next: { revalidate: 7 * 24 * 3600 },
        cache: "force-cache",
      },
    );

    return countries || [];
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export async function getCountriesByCodes(codes: string[]): Promise<Country[]> {
  try {
    const countries = await getCountryByCodeAPI(
      {
        codes,
        fields: [
          "name",
          "flags",
          "population",
          "area",
          "region",
          "capital",
          "subregion",
          "languages",
          "currencies",
          "continents",
          "borders",
        ],
      },
      {
        next: { revalidate: 7 * 24 * 3600 },
        cache: "force-cache",
      },
    );

    return countries || [];
  } catch (error) {
    console.error("Error fetching countries by codes:", error);
    return [];
  }
}

export function filterCountries(
  countries: Country[],
  params: CountriesParams,
): Country[] {
  let filtered = [...countries];

  // Search filter
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filtered = filtered.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm) ||
        country.region.toLowerCase().includes(searchTerm),
    );
  }

  // Region filter
  if (params.region && params.region !== "all") {
    filtered = filtered.filter((country) => country.region === params.region);
  }

  // Status filter
  if (params.status && params.status !== "all") {
    if (params.status === "independent") {
      filtered = filtered.filter((country) => country.independent === true);
    } else if (params.status === "dependent") {
      filtered = filtered.filter((country) => country.independent === false);
    }
  }

  return filtered;
}

export function sortCountries(
  countries: Country[],
  sortBy: SortField = "population",
  sortOrder: SortOrder = "desc",
): Country[] {
  return [...countries].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case "name":
        aValue = a.name.common.toLowerCase();
        bValue = b.name.common.toLowerCase();
        break;
      case "population":
        aValue = a.population || 0;
        bValue = b.population || 0;
        break;
      case "area":
        aValue = a.area || 0;
        bValue = b.area || 0;
        break;
      case "region":
        aValue = a.region.toLowerCase();
        bValue = b.region.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

export function paginateCountries(
  countries: Country[],
  page: number = 1,
  itemsPerPage: number = 10,
): PaginatedCountries {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    countries: countries.slice(startIndex, endIndex),
    totalCount: countries.length,
    totalPages: Math.ceil(countries.length / itemsPerPage),
    currentPage: page,
    itemsPerPage,
  };
}

export function processCountries(
  allCountries: Country[],
  params: CountriesParams,
): PaginatedCountries {
  // Filter countries
  const filtered = filterCountries(allCountries, params);

  // Sort countries
  const sorted = sortCountries(filtered, params.sortBy, params.sortOrder);

  // Paginate countries
  return paginateCountries(sorted, params.page);
}

export const REGIONS: RegionFilter[] = [
  "all",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
  "Antarctic",
];

export const STATUS_OPTIONS: StatusFilter[] = [
  "all",
  "independent",
  "dependent",
];

export const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "population", label: "Population" },
  { value: "name", label: "Name" },
  { value: "area", label: "Area" },
  { value: "region", label: "Region" },
];
