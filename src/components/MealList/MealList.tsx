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
    const sumCalories = mealsArray.reduce((acc, meal) => acc + meal.calories, 0);
    setTotalCalories(sumCalories);
  };

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      await deleteMeal(id);
      const updatedMeals = meals.filter(meal => meal.id !== id);
      setMeals(updatedMeals);

      calculateTotalCalories(updatedMeals);
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
            <Link to="/add" className="btn btn-primary">
              <svg
                className="w-6 h-6 me-2"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 -960 960 960"
                fill="currentColor">
                <path
                  d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
              </svg>
              Add new meal
            </Link>
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
                    onClick={() => handleDelete(meal.id!)}
                    disabled={loadingId === meal.id}
                  >
                    <svg
                      className="w-6 h-6 text-white me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                            clipRule="evenodd"/>
                    </svg>
                    {loadingId === meal.id ? <Loader/> : "Delete"}
                  </button>
                  <Link to={`/edit/${meal.id}`}>
                    <button
                      className="btn btn-warning btn-sm">
                      <svg
                        className="h-6 w-6 me-2"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor">
                        <path
                          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                      </svg>
                      Edit
                    </button>
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
