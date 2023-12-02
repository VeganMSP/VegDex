"use client";
import {ChangeEvent, FormEvent, useState} from "react";
import {Restaurant} from "@/models/Restaurant";
import ObjectFormDialog from "@/app/ui/FormDialog";
import {AvailableObjects} from "@/lib/objects";

const RestaurantsDashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentObject, setCurrentObject] = useState<Restaurant | null>(null);
  const [formState, setFormState] = useState<{[key: string]: string | string[]}>({});

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {target} = e;
    setFormState(prevState => {
      prevState[target.name] = target.value;
      return prevState;
    });
    console.log(formState);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div>
      <h1
        className={"text-lg font-semibold"}
      >Restaurants Dashboard Page</h1>
      <button
        type={"button"}
        className={"block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
        onClick={() => {
          setCurrentObject(null);
          setShowModal(true);
        }}
      >
        Add Restaurant
      </button>
      <ObjectFormDialog
        isOpen={showModal}
        currentObj={currentObject}
        currentObjType={AvailableObjects.Restaurant}
        onClose={() => setShowModal(false)}
        changeFunc={changeHandler}
        submitFunc={submitHandler}
        />
    </div>
  );
};
export default RestaurantsDashboardPage;