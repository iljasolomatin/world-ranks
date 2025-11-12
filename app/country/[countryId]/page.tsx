import { getBorderCountries, getCountriesByCodes } from "@/lib/countries";
import Image from "next/image";

interface Params {
  params: { countryId: string };
}

async function page({ params }: Params) {
  const { countryId } = await params;
  const country = await getCountriesByCodes(countryId.split(","));
  const {
    name,
    flags,
    currencies,
    capital,
    region,
    subregion,
    languages,
    borders,
    area,
    population,
    continents,
  } = country[0];
  const borderCountries = await getBorderCountries(borders || []);
  console.log(borderCountries);
  return (
    <div className="bg-muted relative z-20 mx-auto -mt-28 mb-8 flex max-w-2xl flex-col gap-6 rounded-lg px-4 py-6 shadow-lg md:-mt-14 md:px-6">
      <div className="-mt-16">
        <Image
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          // 50x38 ratio - 1.32:1
          width={250}
          height={189}
          className="mx-auto rounded-lg object-cover"
        />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">{name.common}</h1>
        <p>{name.official}</p>
      </div>
      <div className="flex items-center justify-around">
        <p>Population | {population?.toLocaleString()}</p>
        <p>Area | {area?.toLocaleString()}</p>
      </div>
      <p>{capital}</p>
      <p>{subregion}</p>
      {/* <p>
        {Object.values(languages).map((language, index, array) =>
          index === array.length - 1 ? `${language}` : `${language}, `,
        )}
      </p> */}
      <p>{Object.values(languages ?? {}).join(", ")}</p>
      <p>
        {Object.values(currencies ?? {})
          .map((currency) => currency.name)
          .join(", ")}
      </p>
      <p>{continents?.join(", ")}</p>
      <p>{borders?.join(", ") || "N/A"}</p>
    </div>
  );
}

export default page;
