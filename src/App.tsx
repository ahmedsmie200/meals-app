import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/Home';
import MealDetailsPage from './Pages/MealDetails';
import IngredientsPage from './Pages/Ingredientspage';
import AreaPage from './Pages/AreaPage';
import Snowfall from 'react-snowfall';
import RamadanBanner from './Components/RamadanBanner'; // ✅ استورد الـ component

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('meals');
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('meal');
    if (mealId) {
      setSelectedMealId(mealId);
      setCurrentPage('details');
    }
  }, []);

  const handleMealClick = (mealId: any) => {
    setSelectedMealId(mealId);
    setCurrentPage('details');
    window.history.pushState({}, '', `?meal=${mealId}`);
  };

  const handleBackToHome = () => {
    setCurrentPage('meals');
    setSelectedMealId(null);
    window.history.pushState({}, '', '/');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedMealId(null);
    window.history.pushState({}, '', '/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'meals':
        return (
          <HomePage
            onMealClick={handleMealClick}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        );
      case 'ingredients':
        return (
          <IngredientsPage
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onMealClick={handleMealClick}
          />
        );
      case 'area':
        return (
          <AreaPage
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onMealClick={handleMealClick}
          />
        );
      case 'details':
        return (
          <MealDetailsPage mealId={selectedMealId} onBack={handleBackToHome} />
        );
      default:
        return (
          <HomePage
            onMealClick={handleMealClick}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Snowfall color="#82C3D9" />
      <RamadanBanner /> {/* ✅ حطها هنا فوق الـ Navbar مباشرةً */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}