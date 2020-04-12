import React from "react";
import { Redirect, RouteComponentProps } from "@reach/router";

export const RedirectToLogin: React.FC<RouteComponentProps> = ({
  location,
}: any) => {
  localStorage.setItem("redirectUri", `${location.pathname}${location.search}`);
  return <Redirect to="/login" noThrow />;
};
