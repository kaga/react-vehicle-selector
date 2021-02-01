import React from 'react';
import { ListOption, SearchableList, SearchableListProps } from '../common/SearchableList';

export function GraphqlVehicleSelectorItem<
  T extends ListOption & OptionLabel,
  VehicleSelectorItemPropsType extends SearchableListProps<T>
>({
  title,
  useClient,
}: {
  title: string;
  useClient: (props: VehicleSelectorItemPropsType) => { data: T[] | undefined };
}) {
  return function Component(props: VehicleSelectorItemPropsType) {
    const { data } = useClient(props);

    return (
      <SearchableList {...props} title={title} options={data} getOptionLabel={(item) => item.optionLabel} />
    );
  };
}

interface OptionLabel {
  optionLabel: String;
}
