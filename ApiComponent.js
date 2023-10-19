import React, { useState, useEffect } from 'react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  maxWidth: '50%',
  margin: '0 auto',
  border: '2px solid black',
};

const buttonStyle = {
  background: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px', 
};

function ApiComponent() {
  const [pokemonData, setPokemonData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const changePokemon = () => {
    const nextIndex = currentIndex < 893 ? currentIndex + 1 : 1;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${currentIndex}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        console.error('Error al cargar los datos del Pokémon', error);
      });
  }, [currentIndex]);
  
  return (
    
  

    <div style={containerStyle}>

      <button style={buttonStyle} onClick={changePokemon}>Cambiar Pokémon</button>
      {pokemonData ? (
        <div>
          <h1>{pokemonData.name}</h1>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
          <h2>Tipos:</h2>
          <ul>
            {pokemonData.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
          <h2>Habilidades:</h2>
          <ul>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <h2>Estadísticas:</h2>
          <ul>
            {pokemonData.stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}



export default ApiComponent;
