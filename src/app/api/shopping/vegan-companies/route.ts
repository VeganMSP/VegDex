import {getVeganCompanies} from "@/services/ShoppingService";

export const GET = async () => Response.json(await getVeganCompanies());
