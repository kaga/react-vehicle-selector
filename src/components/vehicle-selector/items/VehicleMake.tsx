import { SearchableListProps } from '../../common/SearchableList';
import { useVehicleMakesSelector } from '../../../services/vehicle-selector/queries/VehicleMakes';
import { VehicleYearOption } from './VehicleYear';
import update from 'immutability-helper';
import React from 'react';
import { FilterItem } from '../../filter-bar/FilterItem';
import { GraphqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';
import { indexOf, isUndefined } from 'lodash';

export const VehicleMakeFilterItem: FilterItem<VehicleMakeFilterItemProps> = {
  createInitialState: () => ({
    searchQuery: '',
    selectedOption: undefined,
    disabled: false,
  }),
  createElement: (props) => React.createElement(MakeSelector, props),
  onFilterItemUpdated: (filterBarState, updatedFilterItem, props) => {
    const updatedItemIndex = indexOf(filterBarState, updatedFilterItem);
    const currentItemIndex = indexOf(filterBarState, props);
    const selectedOption = updatedFilterItem.selectedOption;

    if (selectedOption && updatedItemIndex < currentItemIndex) {
      switch (selectedOption.type) {
        case 'YEAR':
          return update(props, {
            selectedYear: { $set: selectedOption as VehicleYearOption },
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

const MakeSelector = GraphqlVehicleSelectorItem<VehicleMakeOption, VehicleMakeFilterItemProps>({
  title: 'Make',
  useClient: (props) => {
    const { data } = useVehicleMakesSelector({
      shouldSkip: props.disabled || false,
      variables: {
        uvdb_year_id: props.selectedYear?.id,
        query: props.searchQuery,
      },
    });
    if (data) {
      return {
        data: data.map((item) => ({
          type: 'MAKE',
          optionLabel: `${item.name}-${item.id}`,
          ...item,
        })),
      };
    }
    return {
      data: undefined,
    };
  },
});

interface VehicleMakeFilterItemProps extends SearchableListProps<VehicleMakeOption> {
  selectedYear?: VehicleYearOption;
}

export type VehicleMakeOption = {
  type: 'MAKE';
  id: number;
  name: string;
  optionLabel: String;
};
