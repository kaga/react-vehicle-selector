import { SearchableListProps } from '../../common/SearchableList';
import {
  GraphqlVehicleYearVariable,
  parseResponseBody,
  VEHICLE_SELECTOR_YEARS,
} from '../../../services/vehicle-selector/queries/VehicleYears';
import { VehicleMakeOption } from './VehicleMake';
import { VehicleModelOption } from './VehicleModel';
import update from 'immutability-helper';
import React from 'react';
import { VehicleSelectorItem } from '../VehicleSelectorItem';
import { GqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';

export const VehicleYearSelectorItem: VehicleSelectorItem<VehicleYearSelectorItemProps> = {
  createInitialState: () => ({
    searchQuery: '',
    selectedOption: undefined,
    disabled: false,
  }),
  createElement: (props) => React.createElement(YearSelector, props),
  onOptionSelected: (props, selectedOption) => {
    switch (selectedOption.type) {
      case 'MAKE':
        return update(props, {
          selectedMake: { $set: selectedOption as VehicleMakeOption },
        });
      case 'MODEL':
        return update(props, {
          selectedModel: { $set: selectedOption as VehicleModelOption },
        });
    }
    return undefined;
  },
};

export const YearSelector = GqlVehicleSelectorItem<
  VehicleYearOption,
  GraphqlVehicleYearVariable,
  VehicleYearSelectorItemProps
>({
  title: 'Year',
  graphql: {
    query: VEHICLE_SELECTOR_YEARS,
    getQueryVariables: (props) => ({
      uvdb_make_id: props.selectedMake?.id,
      uvdb_model_id: props.selectedModel?.id,
      limit: 1000,
    }),
    parseResponseBodies: (data) => {
      return parseResponseBody(data).map((item) => ({
        type: 'YEAR',
        ...item,
      }));
    },
  },
  getOptionLabel: (option) => `${option.id}`,
});

export interface VehicleYearSelectorItemProps extends SearchableListProps<VehicleYearOption> {
  selectedMake?: VehicleMakeOption;
  selectedModel?: VehicleModelOption;
}

export type VehicleYearOption = {
  type: 'YEAR';
  id: number;
};
