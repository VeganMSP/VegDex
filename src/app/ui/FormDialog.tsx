import {Fragment, ReactElement, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {getId} from "@/functions/objects";
import {AvailableObjects} from "@/lib/objects";
import {RestaurantForm} from "@/app/ui/forms/RestaurantForm";
import {Restaurant} from "@/models/Restaurant";

export interface IFormDialogProps {
  isOpen: boolean;
  currentObj: any;
  currentObjType: any;
  onClose: any;
  changeFunc: any;
  submitFunc: any;
}

export default function ObjectFormDialog(props: IFormDialogProps) {
  const {isOpen, currentObj, currentObjType, onClose} = props;
  const isAddMode = !getId(currentObj, currentObjType);

  const cancelButtonRef = useRef(null);

  const thisObj: {
    dialogTitle: string,
    formName: string,
    form: ReactElement
  } | undefined = (() => {
    const {currentObj, ...rest} = props;
    switch (currentObjType) {
      case AvailableObjects.Restaurant:
        return {
          dialogTitle: isAddMode ? "Add new restaurant" : "Edit restaurant",
          formName: "restaurant",
          form: <RestaurantForm
            {...rest}
            currentObj={currentObj as Restaurant}
            isAddMode={isAddMode}
          />
        };
    }
  })();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className={"relative z-20"} initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PencilSquareIcon className="h-6 w-6 text-blue-600" aria-hidden="true"/>
                    </div>
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {thisObj?.dialogTitle}
                      </Dialog.Title>
                      <div className="mt-2">
                        {thisObj?.form}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    form={thisObj?.formName}
                  >
                    {isAddMode ? "Add" : "Save"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
