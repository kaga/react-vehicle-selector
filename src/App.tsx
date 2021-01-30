import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { VehicleSelector } from './components/vehicle-selector/VehicleSelector';
import { VehicleYearSelectorItem } from './components/vehicle-selector/items/VehicleYear';
import { VehicleMakeSelectorItem } from './components/vehicle-selector/items/VehicleMake';
import { VehicleModelSelectorItem } from './components/vehicle-selector/items/VehicleModel';

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
              filters={[VehicleYearSelectorItem, VehicleMakeSelectorItem, VehicleModelSelectorItem]}
            ></VehicleSelector>
          </Grid>

          <Grid item>
            <VehicleSelector
              filters={[VehicleMakeSelectorItem, VehicleModelSelectorItem, VehicleYearSelectorItem]}
            ></VehicleSelector>
          </Grid>
        </Grid>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
