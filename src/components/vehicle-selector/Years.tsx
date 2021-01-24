import { useQuery, gql } from "@apollo/client";

const VEHICLE_SELECTOR_YEARS = gql`
  query {
    uvdb {
      vehicle_selector {
        uvdb_years {
          items {
            id
          }
        }
      }
    }
  }
`;

export function YearsComponent() {
  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_YEARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <select>
      {data.uvdb.vehicle_selector.uvdb_years.items.map(
        ({ id }: { id: number }) => (
          <option key={id} value={id}>
            {id}
          </option>
        )
      )}
    </select>
  );
}
