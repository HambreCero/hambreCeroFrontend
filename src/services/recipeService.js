import api from './api';

// GET ALL
export const getRecipes = async () => {
  const { data } = await api.get('/recipes');
  return data;
};

// GET BY ID
export const getRecipeById = async (id) => {
  const { data } = await api.get(`/recipes/${id}`);
  return data;
};

// POST
export const createRecipe = async (payload) => {
  const { data } = await api.post('/recipes', payload);
  return data;
};

// PUT
export const updateRecipe = async (id, payload) => {
  const { data } = await api.put(`/recipes/${id}`, payload);
  return data;
};

// DELETE
export const deleteRecipe = async (id) => {
  await api.delete(`/recipes/${id}`);
};