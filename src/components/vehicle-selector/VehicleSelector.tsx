import React from 'react';
import { YearOption, YearsComponent } from './filter/Years';
import { MakesComponent, MakesOption } from './filter/Makes';
import { ModelOption, ModelsComponent } from './filter/Models';
import { Container, Grid, Paper } from '@material-ui/core';
export class VehicleSelector extends React.Component<VehicleSelectorProperties, State> {
  constructor(props: VehicleSelectorProperties) {
    super(props);
    this.state = {};
  }

  handleYearSelection(option: YearOption | null) {
    this.setState({
      selectedYear: option,
      selectedModel: undefined,
      selectedMake: undefined,
    });
  }

  handleMakeSelection(option: MakesOption | null) {
    this.setState({
      selectedMake: option,
      selectedModel: undefined,
    });
  }

  handleModelSelection(option: ModelOption | null) {
    this.setState({
      selectedModel: option,
    });
  }

  render() {
    const items = [];
    items.push(
      <Grid item xs>
        <YearsComponent onSelected={(option) => this.handleYearSelection(option)} state={this.state} />
      </Grid>,
    );
    items.push(
      <Grid item xs>
        <MakesComponent onSelected={(option) => this.handleYearSelection(option)} state={this.state} />
      </Grid>,
    );
    items.push(
      <Grid item xs>
        <ModelsComponent
          selectedMakeId={this.state.selectedMake?.id}
          onSelected={(option) => this.handleMakeSelection(option)}
        ></ModelsComponent>
      </Grid>,
    );

    return (
      <Container maxWidth="lg">
        <Paper>
          <Grid container direction="row" justify="center" spacing={0}>
            {items}
          </Grid>
        </Paper>
      </Container>
    );
  }
}

type VehicleSelectorProperties = {};

export type State = {
  selectedYear?: YearOption | null;
  selectedMake?: MakesOption | null;
  selectedModel?: ModelOption | null;
};
