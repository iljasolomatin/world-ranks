import Image from "next/image";
import { Country } from "@/lib/countries";

interface CountriesTableProps {
  countries: Country[];
}

export default function CountriesTable({ countries }: CountriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/30 border-b">
            <th className="p-4 text-left">Flag</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Population</th>
            <th className="p-4 text-left">Area (km²)</th>
            <th className="p-4 text-left">Region</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr
              key={country.name.common}
              className="hover:bg-muted/50 border-b"
            >
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
                {country.area ? `${country.area.toLocaleString()}` : "N/A"}
              </td>
              <td className="p-4 text-left">{country.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
