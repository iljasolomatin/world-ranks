import { getCountries } from "@yusifaliyevpro/countries";
import Image from "next/image";

async function CountryRows() {
  const countries = await getCountries(
    {
      fields: ["name", "flags", "population", "area", "region"],
    },
    {
      next: { revalidate: 7 * 24 * 3600 },
      cache: "force-cache",
    },
  );

  const limitedCountries = countries?.slice(0, 10) || [];

  return (
    <>
      {limitedCountries?.map((country) => (
        <tr key={country.name.common} className="hover:bg-muted/50 border-b">
          <td className="p-4">
            <Image
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              width={32}
              height={24}
              className="rounded-xs object-cover"
            />
          </td>
          <td className="p-4 font-medium">{country.name.common}</td>
          <td className="p-4 text-left">
            {country.population?.toLocaleString() || "N/A"}
          </td>
          <td className="p-4 text-left">
            {country.area ? `${country.area.toLocaleString()} km²` : "N/A"}
          </td>
          <td className="p-4 text-left">{country.region}</td>
        </tr>
      ))}
    </>
  );
}

export default CountryRows;
