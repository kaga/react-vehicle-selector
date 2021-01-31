import { FilterBarState } from './FilterBar';

export interface FilterItem<StateType extends FilterBarItemState> {
  createInitialState(): StateType;
  createElement(props: StateType): JSX.Element;
  updateFilterItemState(filterBarState: FilterBarState, props: StateType): StateType;
  onFilterItemUpdated(
    filterBarState: FilterBarState,
    updatedFilterItem: FilterBarItemState,
    props: StateType,
  ): StateType | undefined;
}

export type FilterBarItemState = {
  disabled?: boolean;
  selectedOption?: FilterItemOption;
  searchQuery?: string;
};
interface FilterItemOption {
  type: string;
}
