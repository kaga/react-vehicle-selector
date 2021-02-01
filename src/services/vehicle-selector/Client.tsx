import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { unionBy } from 'lodash';
import { IdentifiableModel } from '../IdentifiableModel';

export function VehicleSelectorClient<GraphqlQueryVariableType, ResponseType>({
  query,
  parseResponse,
}: {
  query: DocumentNode;
  parseResponse: (response: any) => ResponseType;
}) {
  return function _VehicleSelectorClient({ variables, shouldSkip = false }: VehicleSelectorQuery<GraphqlQueryVariableType>) {
    const { data } = useQuery(query, {
      variables: variables,
      skip: shouldSkip,
    });

    let response: ResponseType | undefined = undefined;
    if (data) {
      response = parseResponse(data);
    }

    return { data: response };
  };
}

export interface VehicleSelectorQuery<GraphqlQueryVariableType> {
  shouldSkip: boolean;
  variables: GraphqlQueryVariableType;
}

export function unionById<T extends IdentifiableModel<any>>(items: T[]) {
    return unionBy(items, 'id');
} 