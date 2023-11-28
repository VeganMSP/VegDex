"use server";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const signInAction = async (provider?: string) => {
  const url = await signIn(provider, { redirect: false });
  redirect(url.replace("signin", "api/auth/signin"));
};

export const signOutAction = async () => {
  await signOut();
};
