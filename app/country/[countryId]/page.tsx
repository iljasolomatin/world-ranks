import { getCountriesByCodes } from "@/lib/countries";

interface Params {
  params: { countryId: string };
}

async function page({ params }: Params) {
  const { countryId } = await params;
  const country = await getCountriesByCodes(countryId.split(","));
  console.log(country);
  return <div>{country[0].name.common}</div>;
}

export default page;
