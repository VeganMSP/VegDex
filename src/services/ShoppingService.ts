export const getShoppingData = async () => {
  return await fetch("/api/v1/Shopping");
}