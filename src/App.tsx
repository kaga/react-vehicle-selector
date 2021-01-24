import React from "react";
import "./App.css";
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { VehicleSelector } from "./components/vehicle-selector/VehicleSelector";


function App() {
  const client = new ApolloClient({
    uri: "https://api.parts-pal.com/node-api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <VehicleSelector></VehicleSelector>
    </ApolloProvider>
  );
}

export default App;
