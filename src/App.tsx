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
import { YearsComponent } from "./components/vehicle-selector/Years";
import { MakesComponent } from "./components/vehicle-selector/Makes";
import { ModelsComponent } from "./components/vehicle-selector/Models";

function App() {
  const client = new ApolloClient({
    uri: "https://api.parts-pal.com/node-api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <YearsComponent></YearsComponent>
      <MakesComponent></MakesComponent>
      <ModelsComponent></ModelsComponent>
    </ApolloProvider>
  );
}

export default App;
