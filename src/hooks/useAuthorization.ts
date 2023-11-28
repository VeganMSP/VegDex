import {useSession} from "next-auth/react";
import {admin_users} from "@/auth";

export const useAuthorization = () => {
  const {data, status, update} = useSession();

  let isAdmin = admin_users.includes(data?.user?.email ?? "");

  return {isAdmin, data, status, update};
};