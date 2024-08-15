import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import doctorImage from './Images/doctor.jpg';
import { auth } from './Firebase'; // Adjust the import if necessary
import chickenSaladImage from './Images/chicken_salad.jpg';
import quinoa from './Images/black-bean-quinoa-salad.jpg';
import avocado from './Images/avocado_toast.jpg';
import berry from './Images/berry_smoothie.jpg';
import vegetable from './Images/Stir-Fry-Vegetables.jpg';
import chia from './Images/Chia-Pudding.jpg';
import potato from './Images/sweet-potato-black-bean-tacos.jpg';
import yogurt from './Images/Greek-Yogurt-Parfait-Recipe.jpg';
import peppers from './Images/Stuffed-Bell-Peppers-close.jpg';
import salmon from './Images/oven-baked-salmon.jpg';

const recipes = [
  { id: 1, name: 'Grilled Chicken Salad', image: chickenSaladImage, description: 'A healthy and delicious grilled chicken salad with fresh veggies.' },
  { id: 2, name: 'Quinoa and Black Bean Bowl', image: quinoa, description: 'A protein-packed quinoa and black bean bowl with a lime dressing.' },
  { id: 3, name: 'Avocado Toast', image: avocado, description: 'Simple and tasty avocado toast with a sprinkle of chili flakes.' },
  { id: 4, name: 'Berry Smoothie', image: berry, description: 'A refreshing berry smoothie packed with antioxidants.' },
  { id: 5, name: 'Vegetable Stir Fry', image: vegetable, description: 'A quick and easy vegetable stir fry with a savory sauce.' },
  { id: 6, name: 'Chia Pudding', image: chia, description: 'A creamy chia pudding with fresh berries and honey.' },
  { id: 7, name: 'Sweet Potato and Black Bean Tacos', image: potato, description: 'Flavorful sweet potato and black bean tacos with avocado.' },
  { id: 8, name: 'Greek Yogurt Parfait', image: yogurt, description: 'A light and refreshing Greek yogurt parfait with granola and fruit.' },
  { id: 9, name: 'Stuffed Bell Peppers', image: peppers, description: 'Bell peppers stuffed with quinoa, black beans, and vegetables.' },
  { id: 10, name: 'Oven-Baked Salmon', image: salmon, description: 'Delicious oven-baked salmon with a lemon and dill seasoning.' },
];

const HealthyRecipes = () => {
  const navigate = useNavigate();
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      className={`min-h-screen bg-cover bg-center flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      style={{ backgroundImage: `url(${doctorImage})` }}
    >
      {/* Overlay */}
      <div className={`bg-black bg-opacity-50 flex flex-col flex-grow ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {/* Header */}
        <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'}`}>
          <div className="container mx-auto flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-white'}`}>Be Healthy</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><Link to="/lobby" className={`hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Lobby</Link></li>
                <li><a href="/" onClick={handleLogout} className={`hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Logout</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center py-8">
          <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>Healthy Meals</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className={`bg-white rounded-lg shadow-md overflow-hidden border ${isDarkMode ? 'border-gray-600' : 'border-green-500'}`}>
                <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
                <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>{recipe.name}</h2>
                  <p className="mt-2">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className={`p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-teal-500 text-white'}`}>
          <p>&copy; 2024 Be Healthy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HealthyRecipes;
