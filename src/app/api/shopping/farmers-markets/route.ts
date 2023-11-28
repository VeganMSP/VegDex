import {getFarmersMarkets} from "@/services/ShoppingService";

export const GET = async () => Response.json(await getFarmersMarkets());
