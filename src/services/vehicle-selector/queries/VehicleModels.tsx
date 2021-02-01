import { gql } from '@apollo/client';
import { IdentifiableModel } from '../../IdentifiableModel';
import { VehicleSelectorClient, unionById } from '../Client';
import { FRAGMENT_LEGACY_PAGINATION_CURSOR, FRAGMENT_UVDB_I18N } from './Fragments';

export interface GraphqlVehicleModelsVariable {
  includeLocalization?: number;
  uvdb_make_id: number;
  uvdb_year_id?: number;
  uvdb_year_min?: number;
  uvdb_year_max?: number;
  query?: string;
  limit?: number;
  page?: number;
}

export interface UvdbModel extends IdentifiableModel<number> {
  id: number;
  name: string;
}

export const VEHICLE_SELECTOR_MODELS = gql`
  query VehicleSelectorModelOptions(
    $includeLocalization: Boolean = false
    $uvdb_make_id: Int!
    $uvdb_year_id: Int
    $uvdb_year_min: Int
    $uvdb_year_max: Int
    $query: String
    $limit: Int
    $page: Int
  ) {
    uvdb {
      vehicle_selector {
        uvdb_models(
          uvdb_make_id: $uvdb_make_id
          uvdb_year_id: $uvdb_year_id
          uvdb_year_min: $uvdb_year_min
          uvdb_year_max: $uvdb_year_max
          q: $query
          limit: $limit
          page: $page
        ) {
          items {
            id
            name
            i18n @include(if: $includeLocalization) {
              ...uvdbI18n
            }
          }
          cursor {
            ...legacyPaginationCursor
          }
        }
      }
    }
  }
  ${FRAGMENT_LEGACY_PAGINATION_CURSOR}
  ${FRAGMENT_UVDB_I18N}
`;

type ResponseBody = {
  uvdb: {
    vehicle_selector: {
      uvdb_models: {
        items: UvdbModel[];
      };
    };
  };
}

export const useVehicleModelsSelector = VehicleSelectorClient<GraphqlVehicleModelsVariable | undefined, UvdbModel[]>({
  query: VEHICLE_SELECTOR_MODELS,
  parseResponse: (data: ResponseBody) => {
    const items = data.uvdb.vehicle_selector.uvdb_models.items;
    return unionById(items);
  },
});
