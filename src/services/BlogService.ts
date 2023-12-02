"use server";
import {db} from "@/lib/kysely";
import {seedBlogPosts} from "@/lib/seed";
import {BlogPost} from "@/models/BlogPost";

export const getBlogPosts = async () => {
  let blogPosts;
  let startTime = Date.now();
  try {
    blogPosts = await db.selectFrom("blogPosts")
      .selectAll()
      .execute();
  } catch (e: any) {
    if (e.message === `relation "blogPosts" does not exist`) {
      console.log("Creating blogPosts table...");
      await seedBlogPosts();
      startTime = Date.now();
      blogPosts = await db
        .selectFrom("blogPosts")
        .selectAll().execute();
    } else {
      throw e;
    }
  }
  return blogPosts as BlogPost[];
};

export const getBlogPostCategories = async () => {
 return await fetch("api/v1/Blog/Blog/Categories");
};
