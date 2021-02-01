import { gql } from '@apollo/client';
import { IdentifiableModel } from '../../IdentifiableModel';
import { unionById, VehicleSelectorClient } from '../Client';
import { FRAGMENT_LEGACY_PAGINATION_CURSOR } from './Fragments';

export interface GraphqlVehicleYearsVariable {
  uvdb_make_id?: number;
  uvdb_model_id?: number;
  limit?: number;
  page?: number;
}

export interface UvdbYear extends IdentifiableModel<number> {
  id: number;
}

export const VEHICLE_SELECTOR_YEARS = gql`
  query VehicleSelectorYearOptions($uvdb_make_id: Int, $uvdb_model_id: Int, $limit: Int, $page: Int) {
    uvdb {
      vehicle_selector {
        uvdb_years(uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id, limit: $limit, page: $page) {
          items {
            id
          }
          cursor {
            ...legacyPaginationCursor
          }
        }
      }
    }
  }
  ${FRAGMENT_LEGACY_PAGINATION_CURSOR}
`;

type ResponseBody = {
  uvdb: {
    vehicle_selector: {
      uvdb_years: {
        items: UvdbYear[];
      };
    };
  };
};

export const useVehicleYearsSelector = VehicleSelectorClient<GraphqlVehicleYearsVariable | undefined, UvdbYear[]>({
  query: VEHICLE_SELECTOR_YEARS,
  parseResponse: (data: ResponseBody) => {
    const items = data.uvdb.vehicle_selector.uvdb_years.items;
    return unionById(items);
  },
});
