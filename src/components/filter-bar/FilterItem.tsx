export interface FilterItem<T> {
  createInitialState(): T
  createElement(props: T): JSX.Element;
  onOptionSelected(props: T, selectedOption: FilterItemOption): T | undefined;
}

interface FilterItemOption {
  type: string;
}
