import React, {createContext, ReactNode, useContext} from "react";
import {useAuth, User} from "../hooks/useAuth";

interface AuthContext {
  user: User | null;
  login?: (data: { username: string; password: string }) => void;
  logout?: () => void;
  register?: (data: { username: string; password: string; confirm_password: string }) => void;
}

const AuthContext = createContext<AuthContext>({
  user: null,
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = (props: { children: ReactNode }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>);
};

export {AuthProvider, useAuthContext};