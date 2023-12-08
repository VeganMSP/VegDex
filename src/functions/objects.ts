import {AvailableObjects} from "@/lib/objects";
import {Restaurant} from "@/models/Restaurant";

export const getId = (
  obj: any,
  requestedObject: AvailableObjects) => {
  if (obj === undefined || obj === null) return null;
  switch (requestedObject) {
    case AvailableObjects.Restaurant:
      return (obj as Restaurant).id;
    default:
      return null;
  }
};
