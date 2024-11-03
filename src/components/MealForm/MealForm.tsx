import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addMeal, fetchMeals, updateMeal } from '../../axiosAPI';
import { Meal } from '../../types';

interface MealFormProps {
  onSave: () => void;
}

const MealForm: React.FC<MealFormProps> = ({ onSave }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal>({ time: 'Breakfast', description: '', calories: 0, date: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMeal = async () => {
      if (id) {
        try {
          const data = await fetchMeals();
          const mealData = Object.keys(data).find(key => key === id);
          if (mealData) {
            setMeal({ id: mealData, ...data[mealData] });
          }
        } catch (err) {
          console.error("Failed to fetch meal:", err);
          setError("Failed to load meal data.");
        }
      }
    };
    getMeal();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newMeal: Meal = { ...meal, date: new Date().toISOString().split('T')[0] };

    try {
      if (id) {
        await updateMeal(id, newMeal);

      } else {
        await addMeal(newMeal);
        onSave();
        navigate('/');
      }
    } catch (err) {
      console.error("Failed to save meal:", err);
      setError("Failed to save meal data.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <h3 style={{margin: '0 10px', color: !id ? 'green' : 'inherit', fontWeight: !id ? 'bold' : 'normal'}}>
            Add Meal
          </h3>
          <div style={{width: '1px', height: '30px', backgroundColor: 'gray', margin: '0 10px'}}></div>
          <h3 style={{margin: '0 10px', color: id ? 'green' : 'inherit', fontWeight: id ? 'bold' : 'normal'}}>
            Edit Meal
          </h3>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
          <div className="mb-3">
            <label className="form-label">Meal Time</label>
            <select
              className="form-select"
              value={meal.time}
              onChange={(e) => setMeal({...meal, time: e.target.value as 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner'})}
              required
            >
              <option value="" disabled>Select meal time</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Snack">Snack</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Meal description</label>
            <input
              type="text"
              className="form-control"
              value={meal.description}
              onChange={(e) => setMeal({...meal, description: e.target.value})}
              placeholder="Meal description"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Calories</label>
            <input
              type="number"
              className="form-control"
              value={meal.calories}
              onChange={(e) => setMeal({...meal, calories: Number(e.target.value)})}
              placeholder="Calories"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealForm;
