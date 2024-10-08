import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from './AppBar';

const StatsSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { matchup } = location.state || {};

  const statCategories = [
    'Total Yards',
    'Passing Yards',
    'Rushing Yards',
    '3rd Down Efficiency',
    'Turnovers',
    'Sacks',
    'Field Goals Made',
    'Punts',
    'Time of Possession',
    'Penalties'
  ];

  const [selectedStats, setSelectedStats] = useState(Array(5).fill(null));
  const [isEditMode, setIsEditMode] = useState(false);
  const [allStatsSelected, setAllStatsSelected] = useState(false);

  useEffect(() => {
    setAllStatsSelected(selectedStats.every(stat => stat !== null));
  }, [selectedStats]);

  const handleStatClick = (statIndex) => {
    if (selectedStats.includes(statIndex)) return; // Prevent selecting the same stat twice

    const nextEmptySlot = selectedStats.findIndex(stat => stat === null);
    if (nextEmptySlot !== -1) {
      const newSelectedStats = [...selectedStats];
      newSelectedStats[nextEmptySlot] = statIndex;
      setSelectedStats(newSelectedStats);
    }
  };

  const handleDelete = (index) => {
    const newSelectedStats = [...selectedStats];
    newSelectedStats[index] = null;
    setSelectedStats(newSelectedStats);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const generateAISelections = () => {
  const aiSelections = {};
  
  const aiNames = [
    "Agile Innovators",
    "Apex Invaders",
    "Astonishing Impact",
    "Artic Intrepid",
    "Apex Intellects",
    "Adventurous Insiders"
  ];

  aiNames.forEach((aiName) => {
    aiSelections[aiName] = {
      "Teams Playing": matchup,
      "Stats Selected": {}
    };
    
    const selectedStats = new Set();
    for (let j = 1; j <= 5; j++) {
      let randomStatIndex;
      do {
        randomStatIndex = Math.floor(Math.random() * statCategories.length);
      } while (selectedStats.has(randomStatIndex));
      
      selectedStats.add(randomStatIndex);
      
      aiSelections[aiName]["Stats Selected"][j] = {
        "stat": statCategories[randomStatIndex],
        "stats_more": Math.random() < 0.5 ? 1 : 0,
        "points": 8 - (j - 1)
      };
    }
  });

  return aiSelections;
};;

  const handlePlayClick = () => {
    const statsData = {
      "Teams Playing": matchup,
      "Stats Selected": {}
    };
    
    selectedStats.forEach((statIndex, index) => {
      if (statIndex !== null) {
        statsData["Stats Selected"][index + 1] = {
          "stat": statCategories[Math.floor(statIndex / 2)],
          "stats_more": statIndex % 2 === 0 ? 1 : 0,
          "points": 8 - index
        };
      }
    });

    const aiSelections = generateAISelections();
    
    navigate('/simulated_game', { state: { human: statsData, ...aiSelections } });
  };

  const iconStyle = {
    fontFamily: '"Material Symbols Outlined"',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '24px',
    lineHeight: 1,
    letterSpacing: 'normal',
    textTransform: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
    direction: 'ltr',
    WebkitFontFeatureSettings: 'liga',
    WebkitFontSmoothing: 'antialiased',
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      boxSizing: 'border-box',
      backgroundColor: '#f0f0f0',
    }}>
      <AppBar/>
      <div style={{padding: '20px'}}>
      <div style={{
        width: '100%',
        marginBottom: '20px',
        alignSelf: 'center',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#000000' }}>
          {matchup || 'No matchup selected'}
        </h2>
        {selectedStats.map((statIndex, index) => (
          <div 
            key={index} 
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: statIndex !== null ? (statIndex % 2 === 0 ? '#e8f5e9' : '#ffebee') : 'white',
              color: statIndex !== null ? (statIndex % 2 === 0 ? '#2e7d32' : '#c62828') : 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>{index + 1}. {statIndex !== null ? statCategories[Math.floor(statIndex / 2)] : '--------'} ({8 - index} pts)</div>
            {statIndex !== null && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={iconStyle}>
                  {statIndex % 2 === 0 ? 'trending_up' : 'trending_down'}
                </span>
                {isEditMode && (
                  <span 
                    style={{...iconStyle, marginLeft: '10px', cursor: 'pointer'}} 
                    onClick={() => handleDelete(index)}
                  >
                    delete
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        <button 
          onClick={toggleEditMode}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isEditMode ? '#4CAF50' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          {isEditMode ? 'Save' : 'Edit'}
        </button>
      </div>
      
      <hr style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#000',
        border: 'none',
        margin: '0 0 20px 0',
        alignSelf: 'center',
      }} />
      
      <div style={{
        width: '100%',
        maxHeight: '40vh',
        overflowY: 'auto',
        flexGrow: 1,
        alignSelf: 'center',
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>{index * 2 + 1}. {category}</div>
            <span style={iconStyle}>trending_up</span>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>{index * 2 + 2}. {category}</div>
            <span style={iconStyle}>trending_down</span>
          </div>
        ])}
      </div>
      
      {allStatsSelected && !isEditMode && (
        <button 
          onClick={handlePlayClick}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: 'rgb(19, 109, 21)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          Let's Play!
        </button>
      )}
    </div>
    </div>
  );
};

export default StatsSelection;
