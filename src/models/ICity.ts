import {IRestaurant} from "./IRestaurant";

export interface ICity {
  slug: string;
  name: string;
  restaurants: IRestaurant[];
}