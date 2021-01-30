import { parseResponseBody } from '../../../services/vehicle-selector/queries/VehicleModel';
import {
  GraphqlVehicleModelVariable,
  VEHICLE_SELECTOR_MODELS,
} from '../../../services/vehicle-selector/queries/VehicleModel';

import { SearchableListProps } from '../../common/SearchableList';
import { VehicleMakeOption } from './VehicleMake';
import { VehicleYearOption } from './VehicleYear';
import update from 'immutability-helper';
import React from 'react';
import { VehicleSelectorItem } from '../VehicleSelectorItem';
import { GqlVehicleSelectorItem } from '../GraphqlVehicleSelectorItem';

export const VehicleModelSelectorItem: VehicleSelectorItem<VehicleModelSelectorItemProps> = {
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

export const ModelSelector = GqlVehicleSelectorItem<
  VehicleModelOption,
  GraphqlVehicleModelVariable,
  VehicleModelSelectorItemProps
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
      parseResponseBody(data).map((item) => ({
        type: 'MODEL',
        ...item,
      })),
  },
  getOptionLabel: (option) => option.name,
});

export interface VehicleModelSelectorItemProps extends SearchableListProps<VehicleModelOption> {
  selectedYear?: VehicleYearOption;
  selectedMake?: VehicleMakeOption;
}

export type VehicleModelOption = {
  type: 'MODEL';
  id: number;
  name: string;
};
