import React from 'react';
import { Router } from "@reach/router";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import NotFound from "./components/domain/NotFound";
import Dashboard from "./components/domain/Dashboard";
import Callback from "./components/domain/Auth/Callback";
import Home from "./components/domain/Home";
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { IncomeList, NewIncome } from "./components/domain/IncomeManagement";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router className="fullScreen">
        <Dashboard path="/dashboard" />
        <IncomeList path="/incomes" />
        <NewIncome path="/incomes/new" />
        <Home path='/' />
        <Callback path='/callback' />
        <NotFound default path="/not_found" />
      </Router>
    </MuiThemeProvider>
  );
};


export default App;
