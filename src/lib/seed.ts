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
    .addColumn("description", "text")
    .addColumn("slug", "text", (cb) => cb.notNull())
    .addColumn("website", "text")
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table restaurants");
  const addRestaurants = await db
    .insertInto("restaurants")
    .values([
      {name: "J. Selby's", allVegan: true, city: "St. Paul", description: "Vegan comfort food.", slug: "j-selbys", website: "https://www.jselbys.com/"},
      {name: "The Herbivorous Butcher", allVegan: true, city: "Minneapolis", description: "Vegan butcher shop.", slug: "the-herbivorous-butcher", website: "https://www.theherbivorousbutcher.com/"},
      {name: "Fig + Farro", allVegan: true, city: "Minneapolis", description: "Vegan comfort food.", slug: "fig-farro", website: "https://www.figandfarro.com/"},
      {name: "Jasmine 26", allVegan: false, city: "Minneapolis", description: "Vietnamese food.", slug: "jasmine-26", website: "https://www.jasmine26.com/"},
      {name: "Hard Times Cafe", allVegan: false, city: "Minneapolis", description: "Vegetarian comfort food.", slug: "hard-times-cafe", website: "https://www.hardtimes.com/"},
    ])
    .execute();
  console.log("Seed data added to table restaurants");
  return {
    createTable,
    addRestaurants,
  };
};

const seedLinkCategories = async () => {
  const createTable = await db.schema
    .createTable("linkCategories")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (cb) => cb.notNull().defaultTo("now()"))
    .execute();
  console.log("Created table linkCategories");
  const addLinkCategories = await db
    .insertInto("linkCategories")
    .values([
      {name: "Vegan Companies"},
    ])
    .execute();
  console.log("Seed data added to table linkCategories");
  return {
    createTable,
    addLinkCategories,
  };
};

export const seedLinks = async () => {
  // make sure LinkCategories exists first
  await seedLinkCategories();
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
  const categoryId = await db
    .selectFrom("linkCategories")
    .select("id")
    .where("name", "=", "Vegan Companies")
    .executeTakeFirstOrThrow();
  const addLinks = await db
    .insertInto("links")
    .values([
      {name: "Compassionate Action for Animals", url: "https://www.exploreveg.org/", description: "Compassionate Action for Animals is a nonprofit organization with a staff of two and more than 100 volunteers. Our mission is to encourage people to embrace their empathy for farmed animals and move toward a vegan diet.", slug: "compassionate-action-for-animals", categoryId: categoryId.id},
      {name: "Animal Rights Coalition", url: "https://animalrightscoalition.com/", description: "The Animal Rights Coalition is a nonprofit animal rights organization based in Minneapolis, Minnesota. We are dedicated to ending the suffering, abuse, and exploitation of non-human animals through information, education, and advocacy.", slug: "animal-rights-coalition", categoryId: categoryId.id},
    ])
    .execute();
  console.log("Seed data added to table links");
  return {
    createTable,
    addLinks,
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
