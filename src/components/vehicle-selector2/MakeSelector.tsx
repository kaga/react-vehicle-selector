import { SearchableListProps, ListOption } from '../common/SearchableList';
import { GqlVehicleSelectorItem } from './VehicleSelector2';
import {
  GraphqlVehicleMakeVariable,
  parseResponseBody,
  UvdbMake,
  VEHICLE_SELECTOR_MAKES,
} from '../../services/vehicle-selector/queries/VehicleMakes';
import { UvdbModel } from '../../services/vehicle-selector/queries/VehicleModel';
import { VehicleYearOption } from './YearSelector';

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
    parseResponseBody: parseResponseBody,
  },
  getOptionLabel: (option) => option.name,
});

interface VehiceMakeSelectorItemProps extends SearchableListProps<VehicleMakeOption> {
  selectedYear?: VehicleYearOption;
}

export interface VehicleMakeOption extends UvdbModel, ListOption {}
