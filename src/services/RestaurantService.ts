export const getRestaurantsByCity = async () => {
  return await fetch("/api/v1/Restaurants");
}