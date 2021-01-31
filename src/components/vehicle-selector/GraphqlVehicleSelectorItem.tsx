import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { isUndefined } from 'lodash';
import React from 'react';
import { ListOption, SearchableList, SearchableListProps } from '../common/SearchableList';

export function GraphqlVehicleSelectorItem<
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
    const shouldSkip = props.disabled || isUndefined(queryVariables);

    const { data } = useQuery(graphql.query, {
      variables: queryVariables,
      skip: shouldSkip,
    });

    const options = data ? graphql.parseResponseBodies(data) : [];

    return (
      <SearchableList
        {...props}
        title={title}
        options={options}
        getOptionLabel={getOptionLabel}
      />
    );
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
    parseResponseBodies: (response: any) => T[];
  };
  getOptionLabel: (option: T) => string;
}
