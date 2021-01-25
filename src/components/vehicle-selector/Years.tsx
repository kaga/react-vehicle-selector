import { useQuery } from '@apollo/client';
import { VEHICLE_SELECTOR_YEARS } from './Query';

export function YearsComponent(_props: YearsProps) {
  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_YEARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <select>
      {data.uvdb.vehicle_selector.uvdb_years.items.map(({ id }: { id: number }) => (
        <option key={id} value={id}>
          {id}
        </option>
      ))}
    </select>
  );
}

type YearsProps = {
  onSelected: (yearId: number) => void;
};
