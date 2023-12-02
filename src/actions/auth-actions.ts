"use server";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const signInAction = async (provider?: string) => {
  await signIn(provider);
};

export const signOutAction = async () => {
  await signOut();
};
