function CountriesTable() {
  return (
    <table className="w-full table-auto border-collapse text-left">
      <thead>
        <tr className="">
          <th>Flag</th>
          <th>Name</th>
          <th>Population</th>
          <th>Area</th>
          <th>Region</th>
        </tr>
      </thead>
      <tbody>{/* Table rows will be populated here */}</tbody>
    </table>
  );
}

export default CountriesTable;
