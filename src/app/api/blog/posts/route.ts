import {getBlogPosts} from "@/services/BlogService";

export const GET = async () => Response.json(await getBlogPosts());
