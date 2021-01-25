import React from 'react';
import { YearsComponent } from './Years';
import { MakesComponent } from './Makes';
import { ModelsComponent } from './Models';

export class VehicleSelector extends React.Component<
  VehicleSelectorProperties,
  State
> {
  constructor(props: VehicleSelectorProperties) {
    super(props);
    this.state = {} as State;
  }

  handleYearSelection(yearId: number) {
    this.setState((previousState) => ({
      ...previousState,
      selectedYearId: yearId,
    }));
  }

  handleMakeSelection(makesId: number) {
    this.setState((previousState) => ({
      ...previousState,
      selectedMakeId: makesId,
    }));
  }

  render() {
    return (
      <div>
        <YearsComponent
          onSelected={(id) => this.handleYearSelection(id)}
        ></YearsComponent>
        <MakesComponent
          onSelected={(id) => this.handleMakeSelection(id)}
        ></MakesComponent>
        {this.state.selectedMakeId && (
          <ModelsComponent
            selectedMakeId={this.state.selectedMakeId}
          ></ModelsComponent>
        )}
      </div>
    );
  }
}

type VehicleSelectorProperties = {};

type State = {
  selectedYearId: number | null;
  selectedMakeId: number | null;
};
