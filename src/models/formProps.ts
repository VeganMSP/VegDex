import {ChangeEvent, FormEvent} from "react";

export interface IFormProps<Type> {
  currentObj: Type | null;
  changeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
  submitFunc: (e: FormEvent<HTMLFormElement>, isAddMode: boolean) => void;
  isAddMode: boolean;
}