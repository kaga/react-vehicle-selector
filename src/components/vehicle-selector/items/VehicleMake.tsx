import { SearchableListProps } from '../../common/SearchableList';
import {
  GraphqlVehicleMakeVariable,
  getResponseItems,
  VEHICLE_SELECTOR_MAKES,
} from '../../../services/vehicle-selector/queries/VehicleMakes';
import { VehicleYearOption } from './VehicleYear';
import update from 'immutability-helper';
import React from 'react';
import { FilterItem } from '../../filter-bar/FilterItem';
import { GqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';

export const VehicleMakeFilterItem: FilterItem<VehiceMakeFilterItemProps> = {
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

const MakeSelector = GqlVehicleSelectorItem<
  VehicleMakeOption,
  GraphqlVehicleMakeVariable,
  VehiceMakeFilterItemProps
>({
  title: 'Make',
  graphql: {
    query: VEHICLE_SELECTOR_MAKES,
    getQueryVariables: (props) => ({
      uvdb_year_id: props.selectedYear?.id,
      query: props.searchQuery,
    }),
    parseResponseBodies: (data) =>
      getResponseItems(data).map((item) => ({
        type: 'MAKE',
        ...item,
      })),
  },
  getOptionLabel: (option) => option.name,
});

interface VehiceMakeFilterItemProps extends SearchableListProps<VehicleMakeOption> {
  selectedYear?: VehicleYearOption;
}

export type VehicleMakeOption = {
  type: 'MAKE';
  id: number;
  name: string;
};
