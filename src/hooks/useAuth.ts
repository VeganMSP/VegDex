import {useEffect} from "react";
import {BASE_URL} from "../config";
import sessionManager from "../functions/SessionManager";
import {useUser} from "./useUser";
import {useLocalStorage} from "./useLocalStorage";

export interface User {
  id: string;
  username: string;
  token?: string;
}

export const useAuth = () => {
  const {user, addUser, removeUser} = useUser();
  const {getItem} = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = async (data: { username: string; password: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/authenticate`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(data => {
          const {username, token, id} = data;
          sessionManager.setUserSession(username, token, id);
          const user: User = {
            id: id,
            username: username,
            token: token
          };
          addUser(user);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (data: { username: string; password: string; confirm_password: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/authenticate`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(data => {
          const {username, token, id} = data;
          sessionManager.setUserSession(username, token, id);
          const user: User = {
            id: id,
            username: username,
            token: token
          };
          addUser(user);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    removeUser();
  };

  return {user, login, logout, register};
};