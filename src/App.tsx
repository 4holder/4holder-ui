import React from 'react';
import { Router } from "@reach/router";
import { UserProvider } from "./auth/UserContext";
import './App.css';
import NotFound from "./components/app/NotFound";
import Dashboard from "./components/app/Dashboard";
import AuthenticatedPage from "./components/app/AuthenticatedPage";
import Callback from "./components/app/Auth/Callback";
import Home from "./components/app/Home";
import auth from "./auth/auth";

const AuthenticatedPages = () => {
  return (
    <Router className="fullScreen">
      <AuthenticatedPage path="/">
        <Dashboard path="dashboard" />
        <NotFound default path="not_found" />
      </AuthenticatedPage>
      <NotFound default path="/not_found" />
    </Router>
  );
};

const OpenPages = () => (
  <Router className="fullScreen">
    <Home path='/' />
    <Callback path='/callback' />
    <NotFound default path="/not_found" />
  </Router>
);

const App = () => {
  return auth.isAuthenticated() ? (
    <UserProvider>
      <AuthenticatedPages />
    </UserProvider>
  ) : (
    <OpenPages />
  );
};


export default App;
