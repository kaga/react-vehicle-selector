import { Container, Paper, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { SearchableListProps } from '../common/SearchableList';
import update from 'immutability-helper';
import { reduce } from 'lodash';
import { FilterItem } from './FilterItem';

/**
 * TODO: When a user changes a previous selection. All other selections that are
 * dependent on that selection should either reset or otherwise inform the
 * user of the now invalid selections. For example, if the user has selected
 * "Toyota" for make and "Corolla" for model and then changes their
 * selection for make to "Honda" the previous make selection is no longer
 * valid.
 *
 * TODO: If the second or third options only has one possible selection.
 * Automatically select it for the user.
 *
 */

export function FilterBar(props: FilterBarProps) {
  const [state, setState] = useState(initialFilterItemState(props.filters));

  const filterItemElements = props.filters.map((element, index) => {
    const filterItemState = state.get(index);
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
  return reduce(
    filters,
    (results, filter, index) => results.set(index, filter.createInitialState()),
    new Map<number, SearchableListProps<any>>(),
  );
}

function onSearchQueryUpdated(setState: SetFilterBarState, newQuery: any, index: number) {
  setState((previousState) => {
    const updatedSelectorState = new Map(previousState);
    const previousItemState = previousState.get(index);
    const updatedItemState = update(previousItemState, {
      searchQuery: { $set: newQuery },
    }) as SearchableListProps<any>;

    updatedSelectorState.set(index, updatedItemState);
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
    const updatedSelectorState = new Map(previousState);
    const previousItemState = previousState.get(index);
    const updatedItemState = update(previousItemState, {
      selectedOption: { $set: selectedOption },
    }) as SearchableListProps<any>;

    updatedSelectorState.set(index, updatedItemState);
    return updatedSelectorState;
  });

  props.filters.forEach((element, elementIndex) => {
    setState((previousState) => {
      const updatedSelectorState = new Map(previousState);
      const previousItemState = previousState.get(elementIndex);
      const updatedItemState = element.onOptionSelected(previousItemState, selectedOption);

      if (updatedItemState) {
        updatedSelectorState.set(elementIndex, updatedItemState);
      }

      return updatedSelectorState;
    });
  });
}

type SetFilterBarState = React.Dispatch<React.SetStateAction<Map<number, SearchableListProps<any>>>>;

type FilterBarProps = {
  filters: FilterItem<any>[];
};