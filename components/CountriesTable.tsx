import CountryRows from "./CountryRow";

export default function CountriesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/30 border-b">
            <th className="p-4 text-left">Flag</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Population</th>
            <th className="p-4 text-left">Area</th>
            <th className="p-4 text-left">Region</th>
          </tr>
        </thead>
        <tbody>
          <CountryRows />
        </tbody>
      </table>
    </div>
  );
}
