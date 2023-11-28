import {getAboutPageFromDb} from "@/services/MetaService";

export const GET = async () => Response.json(await getAboutPageFromDb());
