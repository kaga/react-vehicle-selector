export interface VehicleSelectorItem<T> {
  createElement(props: T): JSX.Element;
  createInitialState(): T
  onOptionSelected(props: T, selectedOption: VehicleSelectorItemOption): T | undefined;
}

interface VehicleSelectorItemOption {
  type: string;
}
