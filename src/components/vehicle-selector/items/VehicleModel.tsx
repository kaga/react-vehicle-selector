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
import { GqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';

export const VehicleModelFilterItem: FilterItem<VehicleModelFilterItemProps> = {
  createInitialState: () => ({
    searchQuery: '',
    selectedOption: undefined,
    disabled: false,
  }),
  createElement: (props) => React.createElement(ModelSelector, props),
  onOptionSelected: (props, selectedOption) => {
    switch (selectedOption.type) {
      case 'MAKE':
        return update(props, {
          selectedMake: { $set: selectedOption as VehicleMakeOption },
        });
      case 'YEAR':
        return update(props, {
          selectedYear: { $set: selectedOption as VehicleYearOption },
        });
    }
    return undefined;
  },
};

const ModelSelector = GqlVehicleSelectorItem<
  VehicleModelOption,
  GraphqlVehicleModelsVariable,
  VehicleModelFilterItemProps
>({
  title: 'Model',
  graphql: {
    query: VEHICLE_SELECTOR_MODELS,
    getQueryVariables: ({ selectedMake, selectedYear }) => {
      if (selectedMake) {
        return {
          uvdb_year_id: selectedYear?.id,
          uvdb_make_id: selectedMake.id,
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
