import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SimulatedGame = () => {
  const location = useLocation();
  const { matchup } = location.state || {};

  const statCategories = [
    '1st Down', '2 PT Conversion', '20+ Yard Passes',
    '3rd Down %', '40+ Yard Passes'
  ];

  const [selectedStats, setSelectedStats] = useState(Array(5).fill(null));

  const handleStatClick = (statIndex) => {
    if (selectedStats.includes(statIndex)) return; // Prevent selecting the same stat twice

    const nextEmptySlot = selectedStats.findIndex(stat => stat === null);
    if (nextEmptySlot !== -1) {
      const newSelectedStats = [...selectedStats];
      newSelectedStats[nextEmptySlot] = statIndex;
      setSelectedStats(newSelectedStats);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box',
      backgroundColor: '#f0f0f0',
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '10px',
        textAlign: 'center',
      }}>
        StatsDraft
      </h1>
      <hr style={{
        width: '100%',
        maxWidth: '300px',
        height: '1px',
        backgroundColor: '#000',
        border: 'none',
        margin: '0 0 20px 0',
      }} />
      
      <div style={{
        width: '100%',
        maxWidth: '400px',
        marginBottom: '20px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
          {matchup || 'No matchup selected'}
        </h2>
        {selectedStats.map((statIndex, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
            textAlign: 'center',
            backgroundColor: statIndex !== null ? (statIndex % 2 === 0 ? '#e8f5e9' : '#ffebee') : 'white',
            color: statIndex !== null ? (statIndex % 2 === 0 ? '#2e7d32' : '#c62828') : 'black',
          }}>
            {index + 1}. {statIndex !== null ? statCategories[Math.floor(statIndex / 2)] : '--------'}
          </div>
        ))}
      </div>
      
      <hr style={{
        width: '100%',
        maxWidth: '300px',
        height: '1px',
        backgroundColor: '#000',
        border: 'none',
        margin: '0 0 20px 0',
      }} />
      
      <div style={{
        width: '100%',
        maxWidth: '400px',
      }}>
        {statCategories.flatMap((category, index) => [
          <div 
            key={`${index}-green`} 
            onClick={() => handleStatClick(index * 2)}
            style={{
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '10px',
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              cursor: 'pointer',
              opacity: selectedStats.includes(index * 2) ? 0.5 : 1,
            }}
          >
            {index * 2 + 1}. {category}
          </div>,
          <div 
            key={`${index}-red`} 
            onClick={() => handleStatClick(index * 2 + 1)}
            style={{
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '10px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              cursor: 'pointer',
              opacity: selectedStats.includes(index * 2 + 1) ? 0.5 : 1,
            }}
          >
            {index * 2 + 2}. {category}
          </div>
        ])}
      </div>
    </div>
  );
};

export default SimulatedGame;
