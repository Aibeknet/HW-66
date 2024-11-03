import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MealList from './components/MealList/MealList.tsx';
import MealForm from './components/MealForm/MealForm.tsx';

const App: React.FC = () => {
  return (
    <Router>

      <div className="container">
        <h1 className="border-bottom border-black pb-3">Calorie tracker</h1>

        <Routes>
          <Route path="/" element={<MealList/>}/>
          <Route path="/add" element={<MealForm onSave={() => {}}/>}/>
          <Route path="/edit/:id" element={<MealForm onSave={() => {}}/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
