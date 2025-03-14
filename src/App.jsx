import React, { useState, useRef } from 'react';
import './styles/StarWars.css';
import CharacterCard from './components/CharacterCard';
import FavoritesDropdown from './components/FavoritesDropdown';

const App = () => {
  const categories = {
    "Heroes": [
      { id: 'luke', name: 'Luke Skywalker', gender: 'male', hairColor: 'blond', eyeColor: 'blue', isFavorite: false },
      { id: 'leia', name: 'Leia Organa', gender: 'female', hairColor: 'brown', eyeColor: 'brown', isFavorite: false },
      { id: 'han', name: 'Han Solo', gender: 'male', hairColor: 'brown', eyeColor: 'brown', isFavorite: false }
    ],
    "Droids": [
      { id: 'c3po', name: 'C-3PO', gender: 'n/a', hairColor: 'n/a', eyeColor: 'yellow', isFavorite: false },
      { id: 'r2d2', name: 'R2-D2', gender: 'n/a', hairColor: 'n/a', eyeColor: 'red', isFavorite: false }
    ],
    "Villains": [
      { id: 'vader', name: 'Darth Vader', gender: 'male', hairColor: 'none', eyeColor: 'yellow', isFavorite: false }
    ]
  };

  const [favorites, setFavorites] = useState([]);
  const carouselRefs = {
    "Heroes": useRef(null),
    "Droids": useRef(null),
    "Villains": useRef(null)
  };

  const toggleFavorite = (id, category) => {
    const updatedCategories = { ...categories };
    updatedCategories[category] = updatedCategories[category].map(character =>
      character.id === id ? { ...character, isFavorite: !character.isFavorite } : character
    );

    if (!favorites.some(fav => fav.id === id)) {
      setFavorites([...favorites, { ...categories[category].find(c => c.id === id), isFavorite: true }]);
    } else {
      setFavorites(favorites.filter(fav => fav.id !== id));
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const scrollLeft = (category) => {
    if (carouselRefs[category].current) {
      carouselRefs[category].current.scrollBy({ left: -330, behavior: 'smooth' });
    }
  };

  const scrollRight = (category) => {
    if (carouselRefs[category].current) {
      carouselRefs[category].current.scrollBy({ left: 330, behavior: 'smooth' });
    }
  };


  return (
    <div className="container">
      <div className="navbar">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png" 
          alt="Star Wars Logo" 
          className="logo" 
        />
        <FavoritesDropdown favorites={favorites} removeFavorite={removeFavorite} />
      </div>
      
      {Object.keys(categories).map(category => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="carousel-container">
            <button className="carousel-button left" onClick={() => scrollLeft(category)}>
              &#10094;
            </button>
            <div className="carousel-track" ref={carouselRefs[category]}>
              {categories[category].map(character => (
                <div className="carousel-item" key={character.id}>
                  <CharacterCard 
                    character={character}
                    toggleFavorite={() => toggleFavorite(character.id, category)}
                  />
                </div>
              ))}
            </div>
            <button className="carousel-button right" onClick={() => scrollRight(category)}>
              &#10095;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;