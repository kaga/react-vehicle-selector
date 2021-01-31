import { Container, Paper, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { isEqual, reduce } from 'lodash';
import { FilterBarItemState, FilterItem } from './FilterItem';

//TODO check output of 2021 SUZUKI
//TODO inform the user selected a vehicle
//TODO it is doing extra API ?

export function FilterBar(props: FilterBarProps) {
  const [state, setState] = useState(initialFilterItemState(props.filters));

  useEffect(() => {
    props.filters.forEach((element, elementIndex) => {
      const previousItemState = state[elementIndex];
      const updatedItemState = element.updateFilterItemState(state, previousItemState);

      if (updatedItemState && !isEqual(previousItemState, updatedItemState)) {
        const updatedSelectorState = [...state];
        updatedSelectorState[elementIndex] = updatedItemState;
        setState(updatedSelectorState);
      }
    });
  }, [props.filters, state]);

  const filterItemElements = props.filters.map((element, index) => {
    const filterItemState = state[index];
    return (
      <Grid item xs key={`filter-bar-item-grid-${index}`}>
        {element.createElement({
          ...filterItemState,
          onSearchQueryUpdated: (newQuery: any) => onSearchQueryUpdated(setState, newQuery, index),
          onSelectedOptionUpdated: (selectedOption: any) =>
            onSelectedOptionUpdated(props, setState, selectedOption, index),
        })}
      </Grid>
    );
  });

  return (
    <Container maxWidth="lg">
      <Paper>
        <Grid container direction="row" justify="center" spacing={0}>
          {filterItemElements}
        </Grid>
      </Paper>
    </Container>
  );
}

function initialFilterItemState(filters: FilterItem<any>[]) {
  const initialState = reduce(
    filters,
    (results, filter, index) => {
      results[index] = filter.createInitialState();
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

function onSearchQueryUpdated(setState: SetFilterBarState, newQuery: any, index: number) {
  setState((previousState) => {
    const updatedSelectorState = [...previousState];
    const previousItemState = previousState[index];
    const updatedItemState = update(previousItemState, {
      searchQuery: { $set: newQuery },
    }) as FilterBarItemState;

    updatedSelectorState[index] = updatedItemState;
    return updatedSelectorState;
  });
}

function onSelectedOptionUpdated(
  props: FilterBarProps,
  setState: SetFilterBarState,
  selectedOption: any,
  index: number,
) {
  setState((previousState) => {
    const updatedSelectorState = [...previousState];
    const previousItemState = previousState[index];
    const updatedSelectedItemState = update(previousItemState, {
      selectedOption: { $set: selectedOption },
    }) as FilterBarItemState;

    updatedSelectorState[index] = updatedSelectedItemState;

    props.filters.forEach((element, elementIndex) => {
      const previousItemState = previousState[elementIndex];
      const updatedItemState = element.onOptionSelected(
        updatedSelectorState,
        updatedSelectedItemState,
        previousItemState,
      );

      if (updatedItemState) {
        updatedSelectorState[elementIndex] = updatedItemState;
      }
    });

    return updatedSelectorState;
  });
}

export type FilterBarState = FilterBarItemState[];

type SetFilterBarState = React.Dispatch<React.SetStateAction<FilterBarState>>;

type FilterBarProps = {
  filters: FilterItem<any>[];
};
