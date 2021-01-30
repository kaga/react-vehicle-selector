import { Container, Paper, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { SearchableListProps, ListOption, SearchableList } from '../common/SearchableList';
import update from 'immutability-helper';
import { DocumentNode, useQuery } from '@apollo/client';
import { isUndefined } from 'lodash';

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

interface VehicleSelectorProps {
  children: React.ReactElement[];
}

export function GqlVehicleSelectorItem<
  T extends ListOption,
  GraphqlQueryVariableType,
  VehicleSelectorItemPropsType extends SearchableListProps<T>
>({
  title,
  graphql,
  getOptionLabel,
}: GqlVehicleSelectorItemParameters<T, GraphqlQueryVariableType, VehicleSelectorItemPropsType>) {
  return function Component(props: VehicleSelectorItemPropsType) {
    const queryVariables = graphql.getQueryVariables(props);
    const shouldSkip = isUndefined(queryVariables);

    const { loading, error, data } = useQuery(graphql.query, {
      variables: queryVariables,
      skip: shouldSkip,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const options = data ? graphql.parseResponseBody(data) : [];

    return <SearchableList {...props} title={title} options={options} getOptionLabel={getOptionLabel} />;
  };
}

interface GqlVehicleSelectorItemParameters<
  T extends ListOption,
  GraphqlQueryVariableType,
  VehicleSelectorItemPropsType extends SearchableListProps<T>
> {
  title: string;
  graphql: {
    query: DocumentNode;
    getQueryVariables: (props: VehicleSelectorItemPropsType) => GraphqlQueryVariableType | undefined;
    parseResponseBody: (response: any) => T[];
  };
  getOptionLabel: (option: T) => string;
}
