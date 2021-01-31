import { getResponseItems } from '../../../services/vehicle-selector/queries/VehicleModels';
import {
  GraphqlVehicleModelsVariable,
  VEHICLE_SELECTOR_MODELS,
} from '../../../services/vehicle-selector/queries/VehicleModels';

import { SearchableListProps } from '../../common/SearchableList';
import { VehicleMakeOption } from './VehicleMake';
import { VehicleYearOption } from './VehicleYear';
import update from 'immutability-helper';
import React from 'react';
import { FilterItem } from '../../filter-bar/FilterItem';
import { GraphqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';
import { indexOf, isUndefined } from 'lodash';

export const VehicleModelFilterItem: FilterItem<VehicleModelFilterItemProps> = {
  createInitialState: () => ({
    searchQuery: '',
    selectedOption: undefined,
    disabled: false,
  }),
  createElement: (props) => React.createElement(ModelSelector, props),
  onOptionSelected: (filterBarState, updatedFilterItem, props) => {
    const updatedItemIndex = indexOf(filterBarState, updatedFilterItem);
    const currentitemIndex = indexOf(filterBarState, props);
    const selectedOption = updatedFilterItem.selectedOption;

    if (selectedOption && updatedItemIndex < currentitemIndex) {
      switch (selectedOption.type) {
        case 'MAKE':
          return update(props, {
            selectedMake: { $set: selectedOption as VehicleMakeOption },
            selectedOption: { $set: undefined }
          });
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
    let disabled = isUndefined(props.selectedMake);
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

const ModelSelector = GraphqlVehicleSelectorItem<
  VehicleModelOption,
  GraphqlVehicleModelsVariable,
  VehicleModelFilterItemProps
>({
  title: 'Model',
  graphql: {
    query: VEHICLE_SELECTOR_MODELS,
    getQueryVariables: ({ selectedMake, selectedYear, searchQuery }) => {
      if (selectedMake) {
        return {
          uvdb_year_id: selectedYear?.id,
          uvdb_make_id: selectedMake.id,
          query: searchQuery
        };
      }
      return undefined;
    },
    parseResponseBodies: (data) =>
      getResponseItems(data).map((item) => ({
        type: 'MODEL',
        ...item,
      })),
  },
  getOptionLabel: (option) => option.name,
});

interface VehicleModelFilterItemProps extends SearchableListProps<VehicleModelOption> {
  selectedYear?: VehicleYearOption;
  selectedMake?: VehicleMakeOption;
}

export type VehicleModelOption = {
  type: 'MODEL';
  id: number;
  name: string;
};
