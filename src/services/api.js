import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";


export const getRecipeById = async (id) => {
  const res = await axios.get(`/api/recipes/${id}`);
  return res.data;
};


export const getAllRecipes = async ({ page = 1, search = "" }) => {
  const res = await axios.get(`${API_BASE_URL}/recipes`, {
    params: { page, search },
  });

  return res.data; 
};

export const getReviewsByRecipe = async (recipeId) => {
  const res = await axios.get(`/api/reviews/${recipeId}`);
  return res.data;
};

