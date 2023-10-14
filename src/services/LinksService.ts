export const getLinksByCategory = async () => {
  return await fetch("/api/v1/Links");
}