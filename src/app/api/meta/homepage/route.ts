import {getHomePageFromDb} from "@/services/MetaService";

export const GET = async () => Response.json(await getHomePageFromDb());
