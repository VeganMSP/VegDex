import {NeonDialect} from "kysely-neon";
import {ColumnType, Generated, Kysely} from "kysely";
import {neonConfig} from "@neondatabase/serverless";

interface ContentPages {
  id: Generated<number>
  content: string
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}
interface Restaurant {
  id: Generated<number>
  name: string
  allVegan: boolean
  city: string
  description: string
  slug: string
  website: string
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}
interface LinkCategory {
  id: Generated<number>
  name: string
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}
interface Link {
  id: Generated<number>
  name: string
  url: string
  description: string
  slug: string
  categoryId: number
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}
interface FarmersMarket {
  id: Generated<number>
  name: string
  description: string
  slug: string
  website: string
  address: string
  hours: string
  phone: string
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}
interface VeganCompany {
  id: Generated<number>
  name: string
  description: string
  slug: string
  website: string
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}
interface BlogPost {
  id: Generated<number>
  title: string
  slug: string
  content: string
  category: string
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}

// Keys of this interface are table names.
export interface Database {
  contentPages: ContentPages
  restaurants: Restaurant
  linkCategories: LinkCategory
  links: Link
  farmersMarkets: FarmersMarket
  veganCompanies: VeganCompany
  blogPosts: BlogPost
}

// if we're running locally
if (!process.env.VERCEL_ENV) {
  // Set the WebSocket proxy to work with the local instance
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  // Disable all authentication and encryption
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL environment variable");
}

export const db = new Kysely<Database>({
  dialect: new NeonDialect({
    connectionString: process.env.POSTGRES_URL,
  }),
  log(event) {
    if (event.level === "query") {
      console.log(event.query.sql);
      console.log(event.query.parameters);
    }
  }
});
export { sql } from "kysely";
