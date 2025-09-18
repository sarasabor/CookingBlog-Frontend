import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
baseURL: API_BASE_URL,
withCredentials: true,
});

export default api;

export const getRecipeById = async (id) => {
const res = await api.get(`/recipes/${id}`);
return res.data;
};

export const getAllRecipes = async ({ page = 1, search = "", mood = "" }) => {
  const res = await api.get(`/recipes`, {
    params: {
      page,
      search,
      ...(mood && { mood }), // ✅ mood فقط إلا كانت موجودة
    },
  });
  return res.data;
};

export const getReviewsByRecipe = async (recipeId) => {
const res = await api.get(`/reviews/${recipeId}`);
return res.data;
};