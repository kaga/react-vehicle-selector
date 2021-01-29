import { Container, Paper, Grid, Button } from '@material-ui/core';
import React, { useState } from 'react';
import update from 'immutability-helper';
import { every, isObject, slice, take } from 'lodash';

export function VehicleSelector(props: VehicleSelectorProps) {
  const [filterItemSelectedOptions, setFilterItemSelectedOptions] = useState<Array<SelectedOption | undefined>>(
    Array(props.children.length).fill(null),
  );

  const children = props.children.map((element: React.ReactElement, index: number) => {
    const hasSelected = every(take(filterItemSelectedOptions, index), (option) => isObject(option));
    let disabled = index > 0 && !hasSelected;
    const elementProps: FilterItemProps = {
      disabled: disabled,
      onSelected: (selectedOption) => {
        
        if (selectedOption) {
          const updatedItem = update(filterItemSelectedOptions, {
            [index]: { $set: selectedOption },
          });
          setFilterItemSelectedOptions(updatedItem);
        } else {
          setFilterItemSelectedOptions(Array(props.children.length).fill(null));
        }
      },
    };

    return (
      <Grid item xs>
        {React.cloneElement<FilterItemProps>(element, elementProps)}
      </Grid>
    );
  });

  return (
    <Container maxWidth="lg">
      <Paper>
        <Grid container direction="row" justify="center" spacing={0}>
          {children}
        </Grid>
        <Button>Clear</Button>
      </Paper>
    </Container>
  );
}

type VehicleSelectorProps = {
  children: React.ReactElement[];
  onSelectedBaseVehicle: (selectedVehicle: BaseVehicle) => void;
};

export interface BaseVehicle {}

interface SelectedOption {}

export interface FilterItemProps {
  disabled?: boolean;
  onSelected?: (selectedOption: SelectedOption | null | undefined) => void;
}
