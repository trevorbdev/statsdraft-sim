import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import StatsSelection from './StatsSelection';
import SimulatedGame from './SimulatedGame';
import AppBar from './AppBar';

const matchups = [
  "2019 Chiefs vs 2023 Chiefs",
  "1968 KU vs 1995 KU",
  "2018 Chiefs vs 2015 Patriots",
  "1998 KState vs 2008 KU"
];

const AppContent = () => {
  const [selectedMatchup, setSelectedMatchup] = useState(null);
  const navigate = useNavigate();

  const handleMatchupClick = (index) => {
    setSelectedMatchup(index === selectedMatchup ? null : index);
  };

  const handlePlayClick = () => {
    if (selectedMatchup !== null) {
      navigate('/picking_stats', { state: { matchup: matchups[selectedMatchup] } });
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      boxSizing: 'border-box',
      backgroundColor: '#f0f0f0',
    }}>
      <AppBar/>
      <div>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
        }}>
          {matchups.map((matchup, index) => (
            <div 
              key={index} 
              onClick={() => handleMatchupClick(index)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '25px',
                padding: '20px 15px',
                margin: '10px',
                textAlign: 'center',
                fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: selectedMatchup === index ? '#161635' : 'white',
                color: selectedMatchup === index ? 'white' : 'black',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {matchup}
            </div>
          ))}
        </div>
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
        <button 
          onClick={handlePlayClick}
          style={{
            backgroundColor: '#136D15',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            marginBottom: '10px'
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/picking_stats" element={<StatsSelection />} />
        <Route path="/simulated_game" element={<SimulatedGame />} />
      </Routes>
    </Router>
  );
};

export default App;
