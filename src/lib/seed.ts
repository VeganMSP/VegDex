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
      content: `It’s easy being vegan in Minneapolis and St. Paul, but it can be hard to know where to start, or where to look for information and answers. We aim to fix that.

At VeganMSP.com you will find restaurant and food guides, shopping guides, and other information to help you on your vegan journey.`,
    })
    .execute();
  const addAboutPage = await db
    .insertInto("contentPages")
    .values({
      content: `VeganMSP.com is a new project from <a href="https://jrgnsn.net" target="_blank">Matthew Jorgensen</a>. Inspired by <a href="https://veganmilwaukee.com/" target="_blank">VeganMKE.com</a>, this site aims to be a complete-as-possible guide to being vegan in and around the Minneapolis/St. Paul area. But we're always welcome to suggestions! Find something wrong? Feel free to <a href="https://github.com/VeganMSP/VeganMSP.com/issues">open a ticket</a> on our tracker.`,
    })
    .execute();
  console.log("Seed data added to table contentPages");
  return {
    createTable,
    addHomePage,
    addAboutPage,
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
      {
        name: "J. Selby's",
        allVegan: true,
        city: "St. Paul",
        description: "Vegan comfort food.",
        slug: "j-selbys",
        website: "https://www.jselbys.com/"
      },
      {
        name: "The Herbivorous Butcher",
        allVegan: true,
        city: "Minneapolis",
        description: "Vegan butcher shop.",
        slug: "the-herbivorous-butcher",
        website: "https://www.theherbivorousbutcher.com/"
      },
      {
        name: "Fig + Farro",
        allVegan: true,
        city: "Minneapolis",
        description: "Vegan comfort food.",
        slug: "fig-farro",
        website: "https://www.figandfarro.com/"
      },
      {
        name: "Jasmine 26",
        allVegan: false,
        city: "Minneapolis",
        description: "Vietnamese food.",
        slug: "jasmine-26",
        website: "https://www.jasmine26.com/"
      },
      {
        name: "Hard Times Cafe",
        allVegan: false,
        city: "Minneapolis",
        description: "Vegetarian comfort food.",
        slug: "hard-times-cafe",
        website: "https://www.hardtimes.com/"
      },
      {
        name: "Wok in the Park",
        allVegan: false,
        city: "St. Louis Park",
        description: "Asian fusion.",
        slug: "wok-in-the-park",
        website: "http://wokintheparkrestaurant.com/"
      },
      {
        name: "The Yard House",
        allVegan: false,
        city: "St. Louis Park",
        description: "American food.",
        slug: "the-yard-house",
        website: "https://www.yardhouse.com/locations/mn/saint-louis-park/st-louis-park-the-shops-at-west-end/8354"
      },
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
      {name: "Vegan and Animal Rights Organizations in MSP"},
      {name: "Other Local Information"},
      {name: "Vegan Recipes"},
      {name: "Vegan Beer and Wine"},
      {name: "Greater Minneapolis Area"},
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
  const veganAndRightsOrgsId = await db
    .selectFrom("linkCategories")
    .select("id")
    .where("name", "=", "Vegan and Animal Rights Organizations in MSP")
    .executeTakeFirstOrThrow();
  const otherLocalInfo = await db
    .selectFrom("linkCategories")
    .select("id")
    .where("name", "=", "Other Local Information")
    .executeTakeFirstOrThrow();
  const veganRecipes = await db
    .selectFrom("linkCategories")
    .select("id")
    .where("name", "=", "Vegan Recipes")
    .executeTakeFirstOrThrow();
  const veganBeerAndWine = await db
    .selectFrom("linkCategories")
    .select("id")
    .where("name", "=", "Vegan Beer and Wine")
    .executeTakeFirstOrThrow();
  const addLinks = await db
    .insertInto("links")
    .values([
      {
        name: "Compassionate Action for Animals",
        url: "https://www.exploreveg.org/",
        description: "Compassionate Action for Animals is a nonprofit organization with a staff of two and more than 100 volunteers. Our mission is to encourage people to embrace their empathy for farmed animals and move toward a vegan diet.",
        slug: "compassionate-action-for-animals",
        categoryId: veganAndRightsOrgsId.id
      },
      {
        name: "Animal Rights Coalition",
        url: "https://animalrightscoalition.com/",
        description: "The Animal Rights Coalition is a nonprofit animal rights organization based in Minneapolis, Minnesota. We are dedicated to ending the suffering, abuse, and exploitation of non-human animals through information, education, and advocacy.",
        slug: "animal-rights-coalition",
        categoryId: veganAndRightsOrgsId.id
      },
      {
        name: "SoulSpace Farm Sanctuary",
        url: "https://www.soulspacesanctuary.org/",
        description: "SoulSpace Farm Sanctuary is a place of refuge for animals rescued from abuse, neglect, slaughter and exploitation. We help heal the bodies and hearts of our animal friends by providing a safe space for them to recover and thrive.",
        slug: "soulspace-farm-sanctuary",
        categoryId: (await db
          .selectFrom("linkCategories")
          .select("id")
          .where("name", "=", "Greater Minneapolis Area")
          .executeTakeFirstOrThrow()).id
      },
      {
        name: "Minneapolis Farmers Markets",
        url: "http://www.mplsfarmersmarket.com/",
        description: "Information on three farmers markets in Minneapolis: Lyndale Market, Government Center Market, Nicollet Mall Market.",
        slug: "minneapolis-farmers-markets",
        categoryId: otherLocalInfo.id
      },
      {
        name: "St. Paul Farmers Markets",
        url: "http://www.stpaulfarmersmarket.com/",
        description: "This site has a lot of information on upcoming markets in St. Paul and surrounding areas. It even includes markets as far North as Andover.",
        slug: "st-paul-farmers-markets",
        categoryId: otherLocalInfo.id
      },
      {
        name: "Minimalist Baker",
        url: "https://minimalistbaker.com/recipes/vegan",
        description: "great recipes using the minimum amount of ingredients possible",
        slug: "minimalist-baker",
        categoryId: veganRecipes.id
      },
      {
        name: "Post Punk Kitchen",
        url: "https://www.theppk.com/recipes/",
        description: "tons of great vegan recipes, filter by ingredient or type of food!",
        slug: "post-punk-kitchen",
        categoryId: veganRecipes.id
      },
      {
        name: "Thug Kitchen",
        url: "https://www.thugkitchen.com/recipes",
        description: "fun recipes with a lot of attitude",
        slug: "thug-kitchen",
        categoryId: veganRecipes.id
      },
      {
        name: "Barnivore",
        url: "https://www.barnivore.com/",
        description: "Barnivore is an online directory of vegan and vegetarian beer, wine, and liquor.",
        slug: "barnivore",
        categoryId: veganBeerAndWine.id
      },
      {
        name: "VegNews Ultimate Guide to Vegan Beer",
        url: "https://vegnews.com/vegan-guides/vegan-beer-guide",
        description: "\"Our ultimate, up-to-date guides to vegan products give you everything you need to know.\"",
        slug: "vegnews-ultimate-guide-to-vegan-beer",
        categoryId: veganBeerAndWine.id
      }
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
