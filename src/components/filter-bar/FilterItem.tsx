import { FilterBarState } from "./FilterBar";

export interface FilterItem<StateType> {
  createInitialState(): StateType;
  createElement(props: StateType): JSX.Element;
  updateFilterItemState(filterBarState: FilterBarState, props: StateType): StateType;
  onOptionSelected(props: StateType, selectedOption: FilterItemOption): StateType | undefined;
}

interface FilterItemOption {
  type: string;
}
