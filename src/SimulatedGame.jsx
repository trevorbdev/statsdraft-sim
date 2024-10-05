import React from 'react';
import { useLocation } from 'react-router-dom';

const SimulatedGame = () => {
  const location = useLocation();
  const { matchup } = location.state || {};

  const statCategories = [
    '1st Down', '2 PT Conversion', '20+ Yard Passes',
    '3rd Down %', '40+ Yard Passes'
  ];

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
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
            textAlign: 'center',
          }}>
            {num}. --------
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
          <div key={`${index}-green`} style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '10px',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
          }}>
            {index * 2 + 1}. {category} (green)
          </div>,
          <div key={`${index}-red`} style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '10px',
            backgroundColor: '#ffebee',
            color: '#c62828',
          }}>
            {index * 2 + 2}. {category} (red)
          </div>
        ])}
      </div>
    </div>
  );
};

export default SimulatedGame;
