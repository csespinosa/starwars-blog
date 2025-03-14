import React from 'react';

const CharacterCard = ({ character, toggleFavorite }) => {
  const { id, name, gender, hairColor, eyeColor, isFavorite } = character;
  
  return (
    <div className="character-card" id={id}>
      <div className="character-image">400 x 200</div>
      <div className="character-info">
        <h2 className="character-name">{name}</h2>
        <p className="character-detail">Gender: {gender}</p>
        <p className="character-detail">Hair Color: {hairColor}</p>
        <p className="character-detail">Eye-Color: {eyeColor}</p>
        <div className="buttons-row">
          <button className="learn-more">Learn more!</button>
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
            onClick={toggleFavorite}
          >
            ❤
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;