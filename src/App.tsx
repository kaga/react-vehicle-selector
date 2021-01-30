import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { BaseVehicle, VehicleSelector } from './components/VehicleSelector';
import { VehicleYear } from './components/VehicleYear';
import { VehicleMake } from './components/VehicleMake';
import { VehicleModel } from './components/VehicleModel';
import { VehicleSelector2 } from './components/vehicle-selector2/VehicleSelector2';
import { YearSelector } from './components/vehicle-selector2/YearSelector';
import { MakeSelector } from './components/vehicle-selector2/MakeSelector';
import { ModelSelector } from './components/vehicle-selector2/ModelSelector';

function App() {
  const client = new ApolloClient({
    uri: 'https://api.parts-pal.com/node-api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <Grid container spacing={1} direction="column" justify="center">
          <Grid item>
            <VehicleSelector
              onSelectedBaseVehicle={(baseVehicle: BaseVehicle) => {
                console.log(baseVehicle);
              }}
            >
              <VehicleYear></VehicleYear>
              <VehicleMake></VehicleMake>
              <VehicleModel></VehicleModel>
            </VehicleSelector>
          </Grid>

          {/* <Grid item>
            <VehicleSelector
              onSelectedBaseVehicle={(baseVehicle: BaseVehicle) => {
                console.log(baseVehicle);
              }}
            >
              <VehicleMake></VehicleMake>
              <VehicleModel></VehicleModel>
              <VehicleYear></VehicleYear>
            </VehicleSelector>
          </Grid> */}

          <Grid item>
            <VehicleSelector2>
              <YearSelector></YearSelector>
              <MakeSelector></MakeSelector>
              <ModelSelector></ModelSelector>
            </VehicleSelector2>
          </Grid>

          {/* <Grid item>
            <VehicleSelector2>
              <MakeSelector></MakeSelector>
              <ModelSelector></ModelSelector>
              <YearSelector></YearSelector>
            </VehicleSelector2>
          </Grid> */}
        </Grid>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
