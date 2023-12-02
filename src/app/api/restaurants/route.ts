import {getRestaurantsByCity} from "@/services/RestaurantService";

export const GET = async () => Response.json(await getRestaurantsByCity());
