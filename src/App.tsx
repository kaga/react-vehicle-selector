import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { VehicleSelector } from './components/vehicle-selector/VehicleSelector';
import { Grid } from '@material-ui/core';

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
            <VehicleSelector></VehicleSelector>
          </Grid>
          {/* <Grid item>
            <VehicleSelector></VehicleSelector>
          </Grid> */}
        </Grid>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
