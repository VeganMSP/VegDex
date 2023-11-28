"use server";

import {db} from "@/lib/kysely";
import {ILink} from "@/models/ILink";
import {seedLinks} from "@/lib/seed";

export const getLinksByCategory = async (): Promise<ILink[]> => {
  let links;
  let startTime = Date.now();
  try {
    links = await db
      .selectFrom("links")
      .innerJoin("linkCategories", "links.categoryId", "linkCategories.id")
      .select(["links.name", "links.url", "links.description", "linkCategories.name as category"])
      .orderBy("links.name")
      .orderBy("linkCategories.name")
      .execute();
  } catch (e: any) {
    if (e.message === `relation "links" does not exist`
    || e.message === `relation "linkCategories" does not exist`) {
      console.log("Creating links table...");
      await seedLinks();
      startTime = Date.now();
      links = await db
        .selectFrom("links")
        .selectAll()
        .execute();
    } else {
      throw e;
    }
  }
  const duration = Date.now() - startTime;
  console.log(`Query took ${duration}ms`);
  console.log(links);
  return links as ILink[];
};