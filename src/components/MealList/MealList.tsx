import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteMeal, fetchMeals } from '../../axiosAPI';
import Loader from '../Loader/Loader';
import { Meal } from '../../types';

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCalories, setTotalCalories] = useState(0);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const getMeals = async () => {
      setLoading(true);
      try {
        const data = await fetchMeals();
        const mealsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setMeals(mealsArray);
        calculateTotalCalories(mealsArray);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
      setLoading(false);
    };
    getMeals();
  }, []);

  const calculateTotalCalories = (mealsArray: Meal[]) => {
    const todayCalories = mealsArray
      .filter(meal => meal.date && new Date(meal.date).toDateString() === new Date().toDateString())
      .reduce((acc, meal) => acc + meal.calories, 0);
    setTotalCalories(todayCalories);
  };

  const handleDelete = async (id: string) => { // id теперь только string
    setLoadingId(id);
    try {
      await deleteMeal(id);
      setMeals(meals.filter(meal => meal.id !== id));
    } catch (error) {
      console.error("Failed to delete meal:", error);
    }
    setLoadingId(null);
  };

  return (
    <div className="container mt-4">
      {loading ? <Loader /> : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Total Calories: {totalCalories}</h2>
            <Link to="/add" className="btn btn-primary">Add new meal</Link>
          </div>

          <ul className="list-group shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            {meals.map(meal => (
              <li key={meal.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{meal.time}</strong>: {meal.description} - {meal.calories} kcal
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(meal.id!)} // Используем оператор '!'
                    disabled={loadingId === meal.id}
                  >
                    {loadingId === meal.id ? <Loader /> : "Delete"}
                  </button>
                  <Link to={`/edit/${meal.id}`}>
                    <button className="btn btn-warning btn-sm">Edit</button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MealList;
