export interface FilterItem<T> {
  createInitialState(): T
  createElement(props: T): JSX.Element;
  onViewUpdated(props: T): T | undefined;
  onOptionSelected(props: T, selectedOption: FilterItemOption): T | undefined;
}

interface FilterItemOption {
  type: string;
}
