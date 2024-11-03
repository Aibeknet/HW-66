import axios from 'axios';
import { Meal } from './types';

const axiosAPI = axios.create({
  baseURL: 'https://askaroff-hub-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const fetchMeals = async () => {
  try {
    const response = await axiosAPI.get('/meals.json');
    return response.data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
};

export const addMeal = async (meal: Meal) => {
  try {
    const response = await axiosAPI.post('/meals.json', meal);
    return response.data;
  } catch (error) {
    console.error("Error adding meal:", error);
    throw error;
  }
};

export const updateMeal = async (id: string, meal: Meal) => {
  try {
    const response = await axiosAPI.put(`/meals/${id}.json`, meal);
    return response.data;
  } catch (error) {
    console.error("Error updating meal:", error);
    throw error;
  }
};

export const deleteMeal = async (id: string) => {
  try {
    await axiosAPI.delete(`/meals/${id}.json`);
  } catch (error) {
    console.error("Error deleting meal:", error);
    throw error;
  }
};
