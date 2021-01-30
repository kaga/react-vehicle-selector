import { SearchableListProps, ListOption } from '../common/SearchableList';
import { GqlVehicleSelectorItem } from './VehicleSelector2';
import {
  GraphqlVehicleYearVariable,
  parseResponseBody,
  UvdbYear,
  VEHICLE_SELECTOR_YEARS,
} from '../../services/vehicle-selector/queries/VehicleYears';
import { VehicleMakeOption } from './MakeSelector';
import { VehicleModelOption } from './ModelSelector';

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
    parseResponseBody: parseResponseBody
  },
  getOptionLabel: (option) => `${option.id}`,
});

interface VehicleYearSelectorItemProps extends SearchableListProps<VehicleYearOption> {
  selectedMake?: VehicleMakeOption;
  selectedModel?: VehicleModelOption;
}

export interface VehicleYearOption extends UvdbYear, ListOption {}
