import { gql } from "@apollo/client";

const FRAGEMENT_LEGACY_PAGINATION_CURSOR = `
fragment legacyPaginationCursor on LegacyPaginationCursor {
    currentPage
    perPage
    total
}
`;

const FRAGMENT_UVDB_I18N = `
fragment uvdbI18n on UvdbI18n {
    pl {
        name
    }
    pt {
        name
    }
    ro {
        name
    }
}
`;

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
  ${FRAGEMENT_LEGACY_PAGINATION_CURSOR}
  ${FRAGMENT_UVDB_I18N}
`;

export const VEHICLE_SELECTOR_YEARS = gql`
  query VehicleSelectorYearOptions(
    $uvdb_make_id: Int
    $uvdb_model_id: Int
    $limit: Int
    $page: Int
  ) {
    uvdb {
      vehicle_selector {
        uvdb_years(
          uvdb_make_id: $uvdb_make_id
          uvdb_model_id: $uvdb_model_id
          limit: $limit
          page: $page
        ) {
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
  ${FRAGEMENT_LEGACY_PAGINATION_CURSOR}
`;
