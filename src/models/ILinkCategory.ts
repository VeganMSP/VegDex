import {ILink} from "./ILink";

export interface ILinkCategory {
  id: number;
  name: string;
  slug: string;
  links: ILink[];
}