import {db} from "@/lib/kysely";

export const seedContentPages = async () => {
  const createTable = await db.schema
    .createTable("contentPages")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("content", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table contentPages");
  const addHomePage = await db
    .insertInto("contentPages")
    .values({
      content: "This is the home page content.",
    })
    .execute();
  console.log("Seed data added to table contentPages");
  return {
    createTable,
    addHomePage,
  };
};
