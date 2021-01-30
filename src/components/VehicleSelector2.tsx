import { Container, Paper, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { modelOptions } from '../services/MockData';
import { SearchableListProps, ListOption, SearchableList } from './common/SearchableList';
import update from 'immutability-helper';
import { DocumentNode, useQuery } from '@apollo/client';
import { VEHICLE_SELECTOR_MAKES, VEHICLE_SELECTOR_YEARS } from '../services/Query';

export const YearSelector = GqlVehicleSelectorItem<
  VehicleYearOption,
  GraphqlVehicleYearVariable,
  VehicleYearSelectorItemProps
>({
  title: 'Year',
  graphql: {
    query: VEHICLE_SELECTOR_YEARS,
    getQueryVariables: (props) => {
      return {
        uvdb_make_id: props.selectedVehicleMake?.id,
        uvdb_model_id: props.selectedVehicleModel?.id,
        limit: 1000,
      };
    },
    parseResponseBodies: (data) =>
      data.uvdb.vehicle_selector.uvdb_years.items.map(({ id }: UvdbYear) => {
        return {
          id: id,
        };
      }),
  },
  getOptionLabel: (option) => `${option.id}`,
});

export const MakeSelector = GqlVehicleSelectorItem<
  VehicleMakeOption,
  GraphqlVehicleMakeVariable,
  VehiceMakeSelectorItemProps
>({
  title: 'Make',
  graphql: {
    query: VEHICLE_SELECTOR_MAKES,
    getQueryVariables: (props) => {
      return {
        uvdb_year_id: props.selectedYear,
        query: props.searchQuery,
      };
    },
    parseResponseBodies: (data) => data.uvdb.vehicle_selector.uvdb_makes.items.map((model: UvdbMake) => model),
  },
  getOptionLabel: (option) => `${option.name}`,
});

export const ModelSelector = VehicleSelectorItem('Model', modelOptions, (option) => `${option.label}`);

export function VehicleSelector2(props: VehicleSelectorProps) {
  const onSearchQueryUpdated = (newQuery: any, index: number) => {
    const updatedState = update(state, {
      [index]: {
        searchQuery: { $set: newQuery },
      },
    });
    setState(updatedState);
  };

  const onSelectedOptionUpdated = (selectedOption: any, index: number) => {
    const updatedState = update(state, {
      [index]: {
        selectedOption: { $set: selectedOption },
      },
    });
    setState(updatedState);
  };

  const [state, setState] = useState(
    Array(props.children.length).fill({
      searchQuery: '',
      selectedOption: undefined,
      disabled: false,
    }),
  );

  const selectorItems = props.children.map((element, index) => {
    const selectorItemState = state[index];
    return (
      <Grid item xs>
        {React.cloneElement<SearchableListProps<any>>(element, {
          ...selectorItemState,
          onSearchQueryUpdated: (newQuery: any) => onSearchQueryUpdated(newQuery, index),
          onSelectedOptionUpdated: (selectedOption: any) => onSelectedOptionUpdated(selectedOption, index),
        })}
      </Grid>
    );
  });

  return (
    <Container maxWidth="lg">
      <Paper>
        <Grid container direction="row" justify="center" spacing={0}>
          {selectorItems}
        </Grid>
      </Paper>
    </Container>
  );
}

type VehicleSelectorProps = {
  children: React.ReactElement[];
};

function VehicleSelectorItem<T extends ListOption>(title: string, options: T[], getOptionLabel: (option: T) => string) {
  return (props: SearchableListProps<T> = {}) => {
    return <SearchableList {...props} title={title} options={options} getOptionLabel={getOptionLabel} />;
  };
}

function GqlVehicleSelectorItem<
  T extends ListOption,
  GraphqlQueryVariableType,
  VehicleSelectorItemPropsType extends SearchableListProps<T>
>({
  title,
  graphql,
  getOptionLabel,
}: GqlVehicleSelectorItemParameters<T, GraphqlQueryVariableType, VehicleSelectorItemPropsType>) {
  return function Comp(props: VehicleSelectorItemPropsType) {
    const { loading, error, data } = useQuery(graphql.query, {
      variables: graphql.getQueryVariables(props),
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const options = graphql.parseResponseBodies(data);

    return <SearchableList {...props} title={title} options={options} getOptionLabel={getOptionLabel} />;
  };
}

type GqlVehicleSelectorItemParameters<
  T extends ListOption,
  GraphqlQueryVariableType,
  VehicleSelectorItemPropsType extends SearchableListProps<T>
> = {
  title: string;
  graphql: {
    query: DocumentNode;
    getQueryVariables: (props: VehicleSelectorItemPropsType) => GraphqlQueryVariableType;
    parseResponseBodies: (response: any) => T[];
  };
  getOptionLabel: (option: T) => string;
};

type GraphqlVehicleYearVariable = {
  uvdb_make_id?: number;
  uvdb_model_id?: number;
  limit?: number;
  page?: number;
};

type GraphqlVehicleMakeVariable = {
  includeLocalization?: boolean;
  uvdb_year_id?: number;
  uvdb_year_min?: number;
  uvdb_year_max?: number;
  query?: string;
  limit?: number;
  page?: number;
};

interface VehicleYearSelectorItemProps extends SearchableListProps<VehicleYearOption> {
  selectedVehicleMake?: UvdbMake;
  selectedVehicleModel?: UvdbModel;
}

interface VehiceMakeSelectorItemProps extends SearchableListProps<VehicleMakeOption> {
  selectedYear?: number;
}

interface UvdbYear {
  id: number;
}

interface UvdbMake {
  id: number;
  name: string;
}

interface UvdbModel {
  id: number;
  name: string;
}

interface VehicleYearOption extends UvdbYear, ListOption {}

interface VehicleMakeOption extends UvdbModel, ListOption {}
