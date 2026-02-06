import api from './api';

export const getIngredients = async () => {
  const { data } = await api.get('/ingredients');
  return data;
};

export const getIngredientById = async (id) => {
  const { data } = await api.get(`/ingredients/${id}`);
  return data;
};

export const createIngredient = async (payload) => {
  const { data } = await api.post('/ingredients', payload);
  return data;
};

export const updateIngredient = async (id, payload) => {
  const { data } = await api.put(`/ingredients/${id}`, payload);
  return data;
};

export const deleteIngredient = async (id) => {
  await api.delete(`/ingredients/${id}`);
};
