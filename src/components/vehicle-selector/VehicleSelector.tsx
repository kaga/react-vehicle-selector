import React from 'react';
import { YearOption, YearsComponent } from './filter/Years';
import { MakesComponent, MakesOption } from './filter/Makes';
import { ModelOption, ModelsComponent } from './filter/Models';
import { Container, Grid, Paper } from '@material-ui/core';
export class VehicleSelector extends React.Component<VehicleSelectorProperties, State> {
  constructor(props: VehicleSelectorProperties) {
    super(props);
    this.state = {} as State;
  }

  handleYearSelection(option: YearOption) {
    this.setState((previousState) => ({
      ...previousState,
      selectedYearId: option.id,
      selectedModelId: null,
      selectedMakeId: null,
    }));
  }

  handleMakeSelection(option: MakesOption) {
    this.setState((previousState) => ({
      ...previousState,
      selectedMakeId: option.id,
      selectedModelId: null
    }));
  }

  handleModelSelection(option: ModelOption) {
    this.setState((previousState) => ({
      ...previousState,
      selectedModelId: option.id,
    }));
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Paper>
          <Grid container direction="row" justify="center" spacing={0}>
            <Grid item xs>
              <YearsComponent onSelected={(option) => this.handleYearSelection(option)}/>
            </Grid>

            <Grid item xs>
              <MakesComponent onSelected={(option) => this.handleMakeSelection(option)}/>
            </Grid>
            
            <Grid item xs>
              <ModelsComponent selectedMakeId={this.state.selectedMakeId} onSelected={(option) => this.handleMakeSelection(option)}></ModelsComponent>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

type VehicleSelectorProperties = {};

export type State = {
  selectedYearId: number | null;
  selectedMakeId: number | null;
  selectedModelId: number | null;
};
