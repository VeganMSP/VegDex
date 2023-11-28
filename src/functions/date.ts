export const formatDate = (date?: Date) => {
  return new Date(date as Date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
