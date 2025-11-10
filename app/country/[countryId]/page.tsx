import { getCountriesByCodes } from "@/lib/countries";
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
  // FETCH WITH .ALL TO GET FLAGS OF BORDER COUNTRIES
  console.log(country);
  return (
    <div className="bg-muted relative z-20 mx-auto -mt-28 mb-8 flex max-w-2xl flex-col gap-6 rounded-lg px-4 py-6 shadow-lg md:-mt-14 md:px-6">
      <div className="-mt-16">
        <Image
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          // 50x38 ratio
          width={250}
          height={189}
          className="mx-auto rounded-lg object-cover"
        />
      </div>
      <div>
        <h1 className="text-center text-3xl font-semibold">{name.common}</h1>
        <p className="text-center">{name.official}</p>
      </div>
      <div className="flex items-center justify-around">
        <p>Population | {population}</p>
        <p>Area | {area}</p>
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
