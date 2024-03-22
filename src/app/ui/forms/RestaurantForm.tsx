import {Restaurant} from "@/models/Restaurant";
import {IFormProps} from "@/models/formProps";
import { Switch } from "@headlessui/react";
import {DetailedHTMLProps} from "react";
import {classNames} from "@/functions/HtmlUtils";

export const RestaurantForm = (props: IFormProps<Restaurant>) => {
  const {currentObj, changeFunc, submitFunc, isAddMode} = props;

  return (
    <div>
      <InputElement
        name={"name"}
        id={"name"}
        label={"Restaurant Name"}
        placeholderText={"Fig + Farro"}
        onChange={changeFunc}
      />
      <InputElement
        type={"textarea"}
        name={"description"}
        id={"description"}
        label={"Description"}
        placeholderText={"A plant-based restaurant in Minneapolis"}
        onChange={changeFunc}
      />
      <InputElement
        name={"city"}
        id={"city"}
        label={"City"}
        placeholderText={"Minneapolis"}
        onChange={changeFunc}
        />
      <InputElement
        name={"website"}
        id={"website"}
        label={"Website"}
        placeholderText={"https://figandfarro.com"}
        onChange={changeFunc}
        />
      <InputElement
        type={"switch"}
        name={"allVegan"}
        id={"allVegan"}
        label={"All Vegan"}
        checked={currentObj?.allVegan}
        onChange={changeFunc}
        />
    </div>
  );
};

const InputElement = (props: DetailedHTMLProps<any, any>) => {
  const {name, id, label, placeholderText, type, checked, onChange} = props;

  if (type === "switch") {
    return (
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={checked}
          onChange={onChange}
          className={classNames(
            checked ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          )}
        >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
        </Switch>
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">Annual billing</span>{" "}
          <span className="text-gray-500">(Save 10%)</span>
        </Switch.Label>
      </Switch.Group>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mt-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <textarea
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholderText}
          onChange={onChange}
        />
      </div>
    );
  }
  return (
    <div className="mt-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholderText}
        onChange={onChange}
      />
    </div>
  );
};
