import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { FilterBar } from './components/filter-bar/FilterBar';
import { VehicleYearFilterItem } from './components/vehicle-selector/items/VehicleYear';
import { VehicleMakeFilterItem } from './components/vehicle-selector/items/VehicleMake';
import { VehicleModelFilterItem } from './components/vehicle-selector/items/VehicleModel';

function App() {
  const client = new ApolloClient({
    uri: 'https://api.parts-pal.com/node-api/graphql',
    cache: new InMemoryCache(),
  });

  const onSelectFilterOptions = (selectedOptions: any[]) => {
    console.log(`You selected: ${JSON.stringify(selectedOptions)}`);
  };

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <Grid container spacing={1} direction="column" justify="center">
          <Grid item>
            <FilterBar
              filters={[VehicleYearFilterItem, VehicleMakeFilterItem, VehicleModelFilterItem]}
              onSelectedAllFilterItems={(selectedOption) => onSelectFilterOptions(selectedOption)}
            ></FilterBar>
          </Grid>

          <Grid item>
            <FilterBar
              filters={[VehicleMakeFilterItem, VehicleModelFilterItem, VehicleYearFilterItem]}
              onSelectedAllFilterItems={(selectedOption) => onSelectFilterOptions(selectedOption)}
            ></FilterBar>
          </Grid>
        </Grid>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
