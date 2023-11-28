import {HTMLAttributes, ReactNode} from "react";
import {signInAction, signOutAction} from "@/actions/auth-actions";

export const SignIn = ({provider, children, ...props}:
                         { provider?: string, children?: ReactNode } & HTMLAttributes<any>) => {
  return (
    <form
      action={async () => await signInAction(provider)}
    >
      <button {...props}>
        {children ?? <>Sign in</>}
      </button>
    </form>
  );
};

export const SignOut = ({children, ...props}:
                          { children?: ReactNode } & HTMLAttributes<any>) => {
  return (
    <form
      action={async () => await signOutAction()}
      className={"inline"}
    >
      <button {...props}>
        {children ?? <>Sign out</>}
      </button>
    </form>
  );
};