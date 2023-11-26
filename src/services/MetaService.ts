"use server";
import {db} from "@/lib/kysely";
import {seedContentPages} from "@/lib/seed";
import {IPageInfo} from "@/models/IPageInfo";

export const fetchHomePageFromDb = async (): Promise<IPageInfo> => {
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
  return homepage as IPageInfo;
};

export const fetchAboutPageFromDb = async (): Promise<IPageInfo> => {
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
  return homepage as IPageInfo;
};

