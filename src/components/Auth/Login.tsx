import React from "react";
import {Button, Input, Label} from "reactstrap";
import {useAuth} from "../../hooks/useAuth";
import {Navigate} from "react-router-dom";

export const Login = () => {
  const {user, login} = useAuth();
  if (user) {
    return <Navigate to={"/"}/>;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("e: ", e);
    const target = e.target as HTMLFormElement;
    console.log("target: ", target);
    login({username: target.username.value, password: target.password.value});
  };
  return (<>
    <form onSubmit={handleSubmit}>
      <Label for={"username"}>Username:</Label>
      <Input id={"username"}/><br/>
      <Label for={"password"}>Password:</Label>
      <Input id={"password"} type={"password"}/>
      <Button color={"primary"}>Login</Button>
    </form>
  </>);
}