import { getCountriesByCodes } from "@/lib/countries";

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
    <div>
      <h1>{name.common}</h1>
      <p>{name.official}</p>
      <p>{population}</p>
      <p>{area}</p>
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
