import { gql } from '@apollo/client';
import { IdentifiableModel } from '../../IdentifiableModel';
import { FRAGEMENT_LEGACY_PAGINATION_CURSOR, FRAGMENT_UVDB_I18N } from './Fragments';

export interface GraphqlVehicleMakeVariable {
  includeLocalization?: boolean;
  uvdb_year_id?: number;
  uvdb_year_min?: number;
  uvdb_year_max?: number;
  query?: string;
  limit?: number;
  page?: number;
}

export interface UvdbMake extends IdentifiableModel<number> {
  id: number;
  name: string;
}

export function parseResponseBody(data: {
  uvdb: {
    vehicle_selector: {
      uvdb_makes: {
        items: UvdbMake[];
      };
    };
  };
}) {
  return data.uvdb.vehicle_selector.uvdb_makes.items;
}

export const VEHICLE_SELECTOR_MAKES = gql`
  query VehicleSelectorMakeOptions(
    $includeLocalization: Boolean = false
    $uvdb_year_id: Int
    $uvdb_year_min: Int
    $uvdb_year_max: Int
    $query: String
    $limit: Int
    $page: Int
  ) {
    uvdb {
      vehicle_selector {
        uvdb_makes(
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
  ${FRAGEMENT_LEGACY_PAGINATION_CURSOR}
  ${FRAGMENT_UVDB_I18N}
`;
