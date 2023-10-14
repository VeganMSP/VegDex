import React from "react";
import {useAuth} from "../../hooks/useAuth";
import {Navigate} from "react-router-dom";

export const Logout = () => {
  const {logout} = useAuth();
  logout();
  return <Navigate to={"/"}/>;
}