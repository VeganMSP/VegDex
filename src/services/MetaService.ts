"use server";
import {db} from "@/lib/kysely";
import {seedContentPages} from "@/lib/seed";
import {PageInfo} from "@/models/PageInfo";

export const getHomePageFromDb = async (): Promise<PageInfo> => {
  let homepage;
  let startTime = Date.now();
  console.log("db: ", db);
  try {
    homepage = await db
      .selectFrom("contentPages")
      .selectAll()
      .where("id", "=", 1)
      .executeTakeFirst();
  } catch (e: any) {
    if (e.message === `relation "contentPages" does not exist`) {
      console.log("Tables does not exist, creating and seeding it with dummy data now...");
      await seedContentPages();
      startTime = Date.now();
      homepage = await db
        .selectFrom("contentPages")
        .selectAll()
        .where("id", "=", 1)
        .executeTakeFirst();
    } else {
      throw e;
    }
  }
  console.log(homepage);
  const duration = Date.now() - startTime;
  console.log(`Query took ${duration}ms`);
  return homepage as PageInfo;
};

export const updateHomePage = async (content: string) => {
  let updatePage = await db
    .updateTable("contentPages")
    .set({
      content: content,
      updatedAt: new Date(Date.now())
    } as PageInfo)
    .where("id", "=", 1)
    .execute();
  console.log("updatePage: ", updatePage);
  return updatePage;
};

export const getAboutPageFromDb = async (): Promise<PageInfo> => {
  let homepage;
  let startTime = Date.now();
  try {
    homepage = await db
      .selectFrom("contentPages")
      .selectAll()
      .where("id", "=", 2)
      .executeTakeFirst();
  } catch (e: any) {
    if (e.message === `relation "contentPages" does not exist`) {
      console.log("Tables does not exist, creating and seeding it with dummy data now...");
      await seedContentPages();
      startTime = Date.now();
      homepage = await db
        .selectFrom("contentPages")
        .selectAll()
        .where("id", "=", 2)
        .executeTakeFirst();
    } else {
      throw e;
    }
  }
  console.log(homepage);
  const duration = Date.now() - startTime;
  console.log(`Query took ${duration}ms`);
  return homepage as PageInfo;
};

export const updateAboutPage = async (content: string) => {
  let updatePage = await db
    .updateTable("contentPages")
    .set({
      content: content,
      updatedAt: new Date(Date.now())
    } as PageInfo)
    .where("id", "=", 2)
    .executeTakeFirst();
  console.log("updatePage: ", updatePage);
  return updatePage;
};

