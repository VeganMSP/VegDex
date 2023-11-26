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

export const seedRestaurants = async () => {
  const createTable = await db.schema
    .createTable("restaurants")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "text", (cb) => cb.notNull())
    .addColumn("allVegan", "boolean", (cb) => cb.notNull().defaultTo(false))
    .addColumn("city", "text", (cb) => cb.notNull())
    .addColumn("description", "text", (cb) => cb.notNull())
    .addColumn("slug", "text", (cb) => cb.notNull())
    .addColumn("website", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table restaurants");
  return {
    createTable,
  };
};

export const seedLinkCategories = async () => {
  const createTable = await db.schema
    .createTable("linkCategories")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table linkCategories");
  return {
    createTable,
  };
};

export const seedLinks = async () => {
  const createTable = await db.schema
    .createTable("links")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "text", (cb) => cb.notNull())
    .addColumn("url", "text", (cb) => cb.notNull())
    .addColumn("description", "text")
    .addColumn("slug", "text", (cb) => cb.notNull())
    .addColumn("categoryId", "integer", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table links");
  return {
    createTable,
  };
};

export const seedFarmersMarkets = async () => {
  const createTable = await db.schema
    .createTable("farmersMarkets")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "text", (cb) => cb.notNull())
    .addColumn("description", "text", (cb) => cb.notNull())
    .addColumn("slug", "text", (cb) => cb.notNull())
    .addColumn("website", "text", (cb) => cb.notNull())
    .addColumn("address", "text", (cb) => cb.notNull())
    .addColumn("hours", "text", (cb) => cb.notNull())
    .addColumn("phone", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table farmersMarkets");
  return {
    createTable,
  };
};

export const seedVeganCompanies = async () => {
  const createTable = await db.schema
    .createTable("veganCompanies")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "text", (cb) => cb.notNull())
    .addColumn("description", "text", (cb) => cb.notNull())
    .addColumn("slug", "text", (cb) => cb.notNull())
    .addColumn("website", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table veganCompanies");
  return {
    createTable,
  };
};

export const seedBlogPosts = async () => {
  const createTable = await db.schema
    .createTable("blogPosts")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("title", "text", (cb) => cb.notNull())
    .addColumn("content", "text", (cb) => cb.notNull())
    .addColumn("slug", "text", (cb) => cb.notNull())
    .addColumn("category", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table blogPosts");
  return {
    createTable,
  };
};
