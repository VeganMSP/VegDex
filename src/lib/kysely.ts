import {ColumnType, Generated} from "kysely";
import {createKysely} from "@vercel/postgres-kysely";

interface ContentPages {
  id: Generated<number>
  content: string
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, never>
}

// Keys of this interface are table names.
export interface Database {
  contentPages: ContentPages
}

export const db = createKysely<Database>();
export { sql } from "kysely";
