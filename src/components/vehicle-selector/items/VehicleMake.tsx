import { SearchableListProps } from '../../common/SearchableList';
import {
  GraphqlVehicleMakeVariable,
  parseResponseBody,
  VEHICLE_SELECTOR_MAKES,
} from '../../../services/vehicle-selector/queries/VehicleMakes';
import { VehicleYearOption } from './VehicleYear';
import update from 'immutability-helper';
import React from 'react';
import { VehicleSelectorItem } from '../VehicleSelectorItem';
import { GqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';

export const VehicleMakeSelectorItem: VehicleSelectorItem<VehiceMakeSelectorItemProps> = {
  createInitialState: () => ({
    searchQuery: '',
    selectedOption: undefined,
    disabled: false,
  }),
  createElement: (props) => React.createElement(MakeSelector, props),
  onOptionSelected: (props, selectedOption) => {
    switch (selectedOption.type) {
      case 'YEAR':
        return update(props, {
          selectedYear: { $set: selectedOption as VehicleYearOption },
        });
    }
    return undefined;
  },
};

export const MakeSelector = GqlVehicleSelectorItem<
  VehicleMakeOption,
  GraphqlVehicleMakeVariable,
  VehiceMakeSelectorItemProps
>({
  title: 'Make',
  graphql: {
    query: VEHICLE_SELECTOR_MAKES,
    getQueryVariables: (props) => ({
      uvdb_year_id: props.selectedYear?.id,
      query: props.searchQuery,
    }),
    parseResponseBodies: (data) =>
      parseResponseBody(data).map((item) => ({
        type: 'MAKE',
        ...item,
      })),
  },
  getOptionLabel: (option) => option.name,
});

export interface VehiceMakeSelectorItemProps extends SearchableListProps<VehicleMakeOption> {
  selectedYear?: VehicleYearOption;
}

export type VehicleMakeOption = {
  type: 'MAKE';
  id: number;
  name: string;
};
