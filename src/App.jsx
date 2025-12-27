import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/Home';
import MealDetailsPage from './Pages/MealDetails';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMealId, setSelectedMealId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('meal');
    if (mealId) {
      setSelectedMealId(mealId);
      setCurrentPage('details');
    }
  }, []);

  const handleMealClick = (mealId) => {
    setSelectedMealId(mealId);
    setCurrentPage('details');
    window.history.pushState({}, '', `?meal=${mealId}`);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedMealId(null);
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {currentPage === 'home' ? (
          <HomePage onMealClick={handleMealClick} />
        ) : (
          <MealDetailsPage mealId={selectedMealId} onBack={handleBackToHome} />
        )}
      </main>
      <Footer />
    </div>
  );
}
