import { useQuery } from "@apollo/client";
import { ChangeEvent } from "react";
import { ComponentProps } from "./Component";
import { VEHICLE_SELECTOR_MAKES } from "./Query";

export function MakesComponent({ onSelected }: ComponentProps) {
  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_MAKES, {});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const onSelectedUi = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelected(Number.parseInt(event.target.value))
  }

  return (
    <select onChange={ onSelectedUi }>
      {data.uvdb.vehicle_selector.uvdb_makes.items.map(
        ({ id, name }: { id: number; name: string }) => (
          <option key={id} value={id}>
            {name}
          </option>
        )
      )}
    </select>
  );
}
