import { useQuery } from '@apollo/client';
import { VEHICLE_SELECTOR_MODELS } from '../Query';
import { AutocompleteOptions, Option } from './Sample';

export function ModelsComponent(props: ModelsProps) {
  const hasSelectedMakeId = props.selectedMakeId != null;
  let options: ModelOption[] = [];

  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_MODELS, {
    variables: {
      uvdb_make_id: props.selectedMakeId,
    },
    skip: !hasSelectedMakeId,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    options = data.uvdb.vehicle_selector.uvdb_models.items.map(({ id, name }: { id: number; name: string }) => {
      return {
        id: id,
        label: name,
        key: `${id}`,
      };
    });
  }

  return (
    <AutocompleteOptions
      disabled={!hasSelectedMakeId}
      title="Models"
      options={options}
      onSelected={(option) => props.onSelected(option)}
    />
  );
}

type ModelsProps = {
  selectedMakeId: number | null | undefined;
  onSelected: (selectedOption: ModelOption | null) => void;
};

export interface ModelOption extends Option {
  id: number;
}
