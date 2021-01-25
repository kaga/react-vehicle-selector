import { useQuery } from '@apollo/client';
import { VEHICLE_SELECTOR_MODELS } from './Query';

export function ModelsComponent(pros: ModelsProps) {
  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_MODELS, {
    variables: {
      uvdb_make_id: pros.selectedMakeId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <select>
      {data.uvdb.vehicle_selector.uvdb_models.items.map(
        ({ id, name }: { id: number; name: string }) => (
          <option key={id} value={name}>
            {name}
          </option>
        )
      )}
    </select>
  );
}

type ModelsProps = {
  selectedMakeId: number | null;
};
