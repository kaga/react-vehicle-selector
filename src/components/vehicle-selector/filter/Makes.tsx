import { useQuery } from '@apollo/client';
import { VEHICLE_SELECTOR_MAKES } from '../Query';
import { State } from '../VehicleSelector';
import { AutocompleteOptions, Option } from './Sample';

export function MakesComponent(props: MakesProps) {
  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_MAKES, {});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const options: MakesOption[] = data.uvdb.vehicle_selector.uvdb_makes.items.map(({ id, name }: { id: number; name: string }) => {
    return {
      id: id,
      label: name,
      key: `${id}`,
    };
  });

  return <AutocompleteOptions title="Makes" options={options} selectedOption={props.state.selectedMake} onSelected={(option) => props.onSelected(option)}  />;
}

type MakesProps = {
  onSelected: (selectedOption: MakesOption | null) => void;
  state: State
};

export interface MakesOption extends Option {
  id: number;
}
