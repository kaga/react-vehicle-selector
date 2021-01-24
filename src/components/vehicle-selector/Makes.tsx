import { useQuery, gql } from "@apollo/client";
import { VEHICLE_SELECTOR_MAKES } from "./query";

export function MakesComponent() {
  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_MAKES, {});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <select>
      {data.uvdb.vehicle_selector.uvdb_makes.items.map(
        ({ id, name }: { id: number; name: string }) => (
          <option key={id} value={name}>
            {name}
          </option>
        )
      )}
    </select>
  );
}
