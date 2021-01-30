import { Container, Paper, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { SearchableListProps } from '../common/SearchableList';
import update from 'immutability-helper';
import { reduce } from 'lodash';
import { VehicleSelectorItem } from './VehicleSelectorItem';

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

export function VehicleSelector(props: VehicleSelectorProps) {
  const [state, setState] = useState(initialVehicleSelectorState(props.filters));

  const selectorItems = props.filters.map((element, index) => {
    const selectorItemState = state.get(index);
    return (
      <Grid item xs>
        {element.createElement({
          ...selectorItemState,
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
          {selectorItems}
        </Grid>
      </Paper>
    </Container>
  );
}

function initialVehicleSelectorState(filters: VehicleSelectorItem<any>[]) {
  return reduce(
    filters,
    (results, filter, index) => {
      results.set(index, filter.createInitialState());
      return results;
    },
    new Map<number, SearchableListProps<any>>(),
  );
}

function onSearchQueryUpdated(setState: SetVehicleSelectorState, newQuery: any, index: number) {
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
  props: VehicleSelectorProps,
  setState: SetVehicleSelectorState,
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
      const previousItemState = previousState.get(index);
      const updatedItemState = element.onOptionSelected(previousItemState, selectedOption);

      if (updatedItemState) {
        updatedSelectorState.set(elementIndex, updatedItemState);
      }

      return updatedSelectorState;
    });
  });
}

type SetVehicleSelectorState = React.Dispatch<React.SetStateAction<Map<number, SearchableListProps<any>>>>;

type VehicleSelectorProps = {
  filters: VehicleSelectorItem<any>[];
}