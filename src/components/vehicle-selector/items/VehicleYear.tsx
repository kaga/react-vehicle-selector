import { SearchableListProps } from '../../common/SearchableList';
import {
  GraphqlVehicleYearsVariable,
  getResponseItems,
  VEHICLE_SELECTOR_YEARS,
} from '../../../services/vehicle-selector/queries/VehicleYears';
import { VehicleMakeOption } from './VehicleMake';
import { VehicleModelOption } from './VehicleModel';
import update from 'immutability-helper';
import React from 'react';
import { FilterItem } from '../../filter-bar/FilterItem';
import { GraphqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';
import { indexOf, isUndefined } from 'lodash';

export const VehicleYearFilterItem: FilterItem<VehicleYearFilterItemProps> = {
  createInitialState: () => ({
    searchQuery: '',
    selectedOption: undefined,
    disabled: false,
  }),
  createElement: (props) => React.createElement(YearSelector, props),
  onFilterItemUpdated: (filterBarState, updatedFilterItem, props) => {
    const updatedItemIndex = indexOf(filterBarState, updatedFilterItem);
    const currentItemIndex = indexOf(filterBarState, props);
    const selectedOption = updatedFilterItem.selectedOption;

    if (selectedOption && updatedItemIndex < currentItemIndex) {
      switch (selectedOption.type) {
        case 'MAKE':
          return update(props, {
            selectedMake: { $set: selectedOption as VehicleMakeOption },
            selectedOption: { $set: undefined },
          });
        case 'MODEL':
          return update(props, {
            selectedModel: { $set: selectedOption as VehicleModelOption },
            selectedOption: { $set: undefined },
          });
      }
    }

    return undefined;
  },
  updateFilterItemState: (filterBarState, props) => {
    let disabled = false;
    const currentItemIndex = indexOf(filterBarState, props);

    if (currentItemIndex > 0) {
      const previousFilterItem = filterBarState[currentItemIndex - 1];
      disabled = disabled || isUndefined(previousFilterItem.selectedOption);
    }

    return update(props, {
      disabled: { $set: disabled },
    });
  },
};

const YearSelector = GraphqlVehicleSelectorItem<VehicleYearOption, GraphqlVehicleYearsVariable, VehicleYearFilterItemProps>(
  {
    title: 'Year',
    graphql: {
      query: VEHICLE_SELECTOR_YEARS,
      getQueryVariables: (props) => ({
        uvdb_make_id: props.selectedMake?.id,
        uvdb_model_id: props.selectedModel?.id,
        limit: 1000, //TODO implement pagination 
      }),
      parseResponseBodies: (data) =>
        getResponseItems(data).map((item) => ({
          type: 'YEAR',
          ...item,
        })),
    },
    getOptionLabel: (option) => `${option.id}`,
  },
);

interface VehicleYearFilterItemProps extends SearchableListProps<VehicleYearOption> {
  selectedMake?: VehicleMakeOption;
  selectedModel?: VehicleModelOption;
}

export type VehicleYearOption = {
  type: 'YEAR';
  id: number;
};
