import React from 'react';
import { ListOption, SearchableList, SearchableListProps } from '../common/SearchableList';
import { FilterBarItemProps, FilterBarItemState } from '../filter-bar/FilterItem';
import update from 'immutability-helper';

export function GraphqlVehicleSelectorItem<
  T extends ListOption & OptionLabel,
  VehicleSelectorItemPropsType extends FilterBarItemState & SearchableListProps<T>
>({
  title,
  useClient,
}: {
  title: string;
  useClient: (props: VehicleSelectorItemPropsType) => { data: T[] | undefined };
}) {
  return function Component(props: FilterBarItemProps<VehicleSelectorItemPropsType>) {
    const { data } = useClient(props.state);
    const state = props.state
    return (
      <SearchableList
        {...state}
        title={title}
        options={data}
        getOptionLabel={(item) => item.optionLabel}
        onSearchQueryUpdated={(searchQuery) => {
          const updatedItemState = update(state as FilterBarItemState, {
            searchQuery: { $set: searchQuery },
          });
          props.onStateUpdated(updatedItemState as any);
        }}
        onSelectedOptionUpdated={(selectedOption) => {
          const updatedItemState = update(state as SearchableListProps<T>, {
            selectedOption: { $set: selectedOption },
          }) as FilterBarItemState;
          props.onStateUpdated(updatedItemState as any);
        }}
      />
    );
  };
}

interface OptionLabel {
  optionLabel: String;
}
