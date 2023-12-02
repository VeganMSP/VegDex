"use server";
import {db} from "@/lib/kysely";
import {seedRestaurants} from "@/lib/seed";
import {Restaurant} from "@/models/Restaurant";

export const getRestaurantsByCity = async (): Promise<Restaurant[]> => {
  let restaurants;
  let startTime = Date.now();
  try {
    restaurants = await db
      .selectFrom("restaurants")
      .selectAll()
      .execute();
  } catch (e: any) {
    if (e.message === `relation "restaurants" does not exist`) {
      console.log("Table restaurants does not exist. Creating it...");
      await seedRestaurants();
      startTime = Date.now();
      restaurants = await db
        .selectFrom("restaurants")
        .selectAll()
        .execute();
    } else {
      throw e;
    }
  }
  const duration = Date.now() - startTime;
  console.log(`Query took ${duration}ms`);
  return restaurants as Restaurant[];
};
