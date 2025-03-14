import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FavoritesDropdown = ({ favorites, removeFavorite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          !event.target.classList.contains('favorite-btn')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="favorites-dropdown" ref={dropdownRef}>
      <button 
        className="favorites-btn" 
        onClick={toggleDropdown}
      >
        Favorites <span id="favorite-count">{favorites.length}</span> {isOpen ? '▲' : '▼'}
      </button>
      
      {isOpen && (
        <div className="dropdown-content show">
          {favorites.length > 0 ? (
            favorites.map(character => (
              <a key={character.id} href={`#${character.id}`}>
                {character.name}
                <span 
                  className="delete-icon" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFavorite(character.id);
                  }}
                >
                 <FontAwesomeIcon icon={faTrash} style={{color:'red'}} />
                </span>
              </a>
            ))
          ) : (
            <a href="#">No favorites yet</a>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesDropdown;