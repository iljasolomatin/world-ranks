import { getCountries as getCountriesAPI } from "@yusifaliyevpro/countries";

export interface Country {
  name: { common: string };
  flags: { svg: string };
  population: number;
  area: number;
  region: string;
}

export type SortField = "name" | "population" | "area";
export type SortOrder = "asc" | "desc";

export async function getCountriesData() {
  const countries = await getCountriesAPI(
    {
      fields: ["name", "flags", "population", "area", "region"],
    },
    {
      next: { revalidate: 7 * 24 * 3600 },
      cache: "force-cache",
    },
  );

  return countries || [];
}

export function sortCountries(
  countries: Country[],
  sortField: SortField,
  sortOrder: SortOrder,
): Country[] {
  return [...countries].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
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
  page: number,
  itemsPerPage: number = 10,
) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    countries: countries.slice(startIndex, endIndex),
    totalPages: Math.ceil(countries.length / itemsPerPage),
    totalCount: countries.length,
    currentPage: page,
  };
}
