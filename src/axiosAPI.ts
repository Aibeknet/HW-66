import axios from 'axios';
import { Meal } from './types.ts';

const axiosAPI = axios.create({
  baseURL: 'https://askaroff-hub-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const fetchMeals = async () => {
  const response = await axiosAPI.get('/meals.json');
  return response.data;
};

export const addMeal = async (meal: Meal ) => {
  const response = await axiosAPI.post('/meals.json', meal);
  return response.data;
};

export const updateMeal = async (id: string, meal: Meal ) => {
  const response = await axiosAPI.put(`/meals/${id}.json`, meal);
  return response.data;
};

export const deleteMeal = async (id: string) => {
  await axiosAPI.delete(`/meals/${id}.json`);
};
