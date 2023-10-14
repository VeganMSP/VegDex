export const getBlogPosts = async () => {
 return await fetch(`/api/v1/Blog`);
}

export const getBlogPostCategories = async () => {
 return await fetch("api/v1/Blog/Blog/Categories");
};
