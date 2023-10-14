export const fetchAboutPage = async () => {
  return await fetch(`/api/v1/Meta/About`)
    .then(response => response.json());
};

export const fetchHomePage = async () => {
  return await fetch(`/api/v1/Meta`)
    .then(response => response.json());
};