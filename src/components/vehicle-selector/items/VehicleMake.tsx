import { SearchableListProps } from '../../common/SearchableList';
import {
  GraphqlVehicleMakesVariable,
  getResponseItems,
  VEHICLE_SELECTOR_MAKES,
} from '../../../services/vehicle-selector/queries/VehicleMakes';
import { VehicleYearOption } from './VehicleYear';
import update from 'immutability-helper';
import React from 'react';
import { FilterItem } from '../../filter-bar/FilterItem';
import { GqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';
import { indexOf, isUndefined } from 'lodash';

export const VehicleMakeFilterItem: FilterItem<VehiceMakeFilterItemProps> = {
  createInitialState: () => ({
    searchQuery: '',
    selectedOption: undefined,
    disabled: false,
  }),
  createElement: (props) => React.createElement(MakeSelector, props),
  onOptionSelected: (filterBarState, updatedFilterItem, props) => {
    const updatedItemIndex = indexOf(filterBarState, updatedFilterItem);
    const currentitemIndex = indexOf(filterBarState, props);
    const selectedOption = updatedFilterItem.selectedOption;

    if (selectedOption && updatedItemIndex < currentitemIndex) {
      switch (selectedOption.type) {
        case 'YEAR':
          return update(props, {
            selectedYear: { $set: selectedOption as VehicleYearOption },
            selectedOption: { $set: undefined }
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

const MakeSelector = GqlVehicleSelectorItem<VehicleMakeOption, GraphqlVehicleMakesVariable, VehiceMakeFilterItemProps>({
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
