import {useState} from "react";
import {useLocalStorage} from "./useLocalStorage";
import {User} from "./useAuth";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const {setItem} = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return {user, addUser, removeUser};
};