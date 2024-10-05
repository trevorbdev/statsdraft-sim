import React from 'react';
import { useLocation } from 'react-router-dom';

const SimulatedGame = () => {
  const location = useLocation();
  const gameData = location.state;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h1>Simulated Game</h1>
      <h2>{gameData["Teams Playing"]}</h2>
      <h3>Selected Stats:</h3>
      <ul>
        {Object.entries(gameData["Stats Selected"]).map(([key, value]) => (
          <li key={key}>
            {value.stat} - {value.stats_more ? 'More' : 'Less'}
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(gameData, null, 2)}</pre>
    </div>
  );
};

export default SimulatedGame;
