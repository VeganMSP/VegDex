import {IAddress} from "./IAddress";

export interface IFarmersMarket {
  slug: string;
  name: string;
  website: string;
  address: IAddress;
  description: string;
}