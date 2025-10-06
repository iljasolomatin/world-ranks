export async function getCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?sort=population",
    {
      // // Revalidate every 24 hours
      // next: { revalidate: 86400 },
    },
  );
  const data = await res.json();

  return data;
}
