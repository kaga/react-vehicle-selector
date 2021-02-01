import { Container, Paper, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { every, isEqual, isObject, reduce } from 'lodash';
import { FilterBarItemState, FilterItem } from './FilterItem';

//TODO it is doing extra API ?
export function FilterBar(props: FilterBarProps) {
  const [state, setState] = useState(initialFilterItemState(props.filters));
  const allSelectedOptions = state.map((filterItemState) => filterItemState.selectedOption);

  useEffect(() => {
    const updatedState = updateFilterItemsState(props, state);
    if (updatedState) {
      setState(updatedState);
    }
  }, [props, state]);

  useEffect(() => {
    if (every(allSelectedOptions, isObject)) {
      props.onSelectedAllFilterItems(allSelectedOptions);
    }
  }, [props, allSelectedOptions]);

  return (
    <Container maxWidth="lg">
      <Paper>
        <Grid container direction="row" justify="center" spacing={0}>
          {props.filters.map((element, index) => {
            const filterItemState = state[index];
            return (
              <Grid item xs key={`filter-bar-item-grid-${index}`}>
                {element.createElement({
                  state: {
                    ...filterItemState,
                  },
                  onStateUpdated: (newFilterItemState) => {
                    setState((previousState) => {
                      const updatedState = [...previousState];
                      updatedState[index] = newFilterItemState;
                      return onFilterItemStateUpdated(props, updatedState, newFilterItemState);
                    });
                  },
                })}
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Container>
  );
}

function initialFilterItemState(filters: FilterItem<any>[]) {
  const initialState = reduce(
    filters,
    (results, filter) => {
      results.push(filter.createInitialState());
      return results;
    },
    new Array<FilterBarItemState>(),
  );

  filters.forEach((element, elementIndex) => {
    const previousItemState = initialState[elementIndex];
    const updatedItemState = element.updateFilterItemState(initialState, previousItemState);
    initialState[elementIndex] = updatedItemState;
  });
  return initialState;
}

function updateFilterItemsState(props: FilterBarProps, state: FilterBarState) {
  let updatedState: FilterBarState | undefined = undefined;
  props.filters.forEach((element, elementIndex) => {
    const previousItemState = state[elementIndex];
    const updatedItemState = element.updateFilterItemState(state, previousItemState);

    if (updatedItemState && !isEqual(previousItemState, updatedItemState)) {
      if (!updatedState) {
        updatedState = [...state];
      }
      updatedState[elementIndex] = updatedItemState;
    }
  });
  return updatedState;
}

function onFilterItemStateUpdated(
  props: FilterBarProps,
  previousState: FilterBarState,
  updatedSelectedItemState: FilterBarItemState,
) {
  return reduce(
    props.filters,
    (result, element, elementIndex) => {
      const previousItemState = previousState[elementIndex];
      const updatedItemState = element.onFilterItemUpdated(result, updatedSelectedItemState, previousItemState);

      if (updatedItemState) {
        result[elementIndex] = updatedItemState;
      }
      return result;
    },
    previousState,
  );
}

export type FilterBarState = FilterBarItemState[];

type FilterBarProps = {
  filters: FilterItem<FilterBarItemState>[];
  onSelectedAllFilterItems: (selectedOption: any[]) => void;
};
