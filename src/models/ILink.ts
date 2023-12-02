import {ILinkCategory} from "@/models/ILinkCategory";

export interface ILink {
  slug: string;
  name: string;
  url: string;
  description: string;
  category: string;
}