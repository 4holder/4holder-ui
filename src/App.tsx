import React from 'react';
import { Router } from "@reach/router";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import NotFound from "./components/domain/NotFound";
import Dashboard from "./components/domain/Dashboard";
import Callback from "./components/domain/Auth/Callback";
import Home from "./components/domain/LandingPage";
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { IncomeList, NewIncome } from "./components/domain/IncomeManagement";
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from "./clients/publicApiClient";
import IncomeDetails from "./components/domain/IncomeManagement/IncomeDetails";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
      <Router className="fullScreen">
        <Dashboard path="/dashboard" />
        <IncomeList path="/incomes" />
        <NewIncome path="/incomes/new" />
        <IncomeDetails path="/incomeDetails/:id" />
        <Home path='/' />
        <Callback path='/callback' />
        <NotFound default path="/not_found" />
      </Router>
      </ApolloProvider>
    </MuiThemeProvider>
  );
};


export default App;
