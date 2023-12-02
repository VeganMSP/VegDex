import {getLinksByCategory} from "@/services/LinksService";

export const GET = async () => Response.json(await getLinksByCategory());
