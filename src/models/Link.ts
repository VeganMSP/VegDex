import {LinkCategory} from "@/models/LinkCategory";

export interface Link {
  slug: string;
  name: string;
  url: string;
  description: string;
  category: string;
}