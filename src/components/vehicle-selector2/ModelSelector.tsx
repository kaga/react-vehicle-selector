import {
  GraphqlVehicleModelVariable,
  UvdbModel,
  VEHICLE_SELECTOR_MODELS,
} from '../../services/vehicle-selector/queries/VehicleModel';

import { SearchableListProps, ListOption } from '../common/SearchableList';
import { VehicleMakeOption } from './MakeSelector';
import { GqlVehicleSelectorItem } from './VehicleSelector2';
import { VehicleYearOption } from './YearSelector';

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
    parseResponseBodies: (data) => data.uvdb.vehicle_selector.uvdb_models.items.map((model: UvdbModel) => model),
  },
  getOptionLabel: (option) => `${option.name}`,
});

interface VehicleModelSelectorItemProps extends SearchableListProps<VehicleModelOption> {
  selectedYear?: VehicleYearOption;
  selectedMake?: VehicleMakeOption;
}

export interface VehicleModelOption extends UvdbModel, ListOption {}
