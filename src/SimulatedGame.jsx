import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import all JSON files
import Chiefs19vs23 from './ai-json-data/19Chiefs23Chiefs.json';
import KU68vs95 from './ai-json-data/68KU95KU.json';
import Chiefs18vsPatriots15 from './ai-json-data/18Chiefs15Patriots.json';
import KSU98vsKU08 from './ai-json-data/98KSU08KU.json';
// Import all the scoring functions
import {
  totalYardsScoring,
  totalPassingYardsScoring,
  totalRushingYardsScoring,
  thirdDownEfficiencyScoring,
  turnoversScoring,
  sacksScoring,
  fieldGoalsMadeScoring,
  puntsScoring,
  timeOfPossessionScoring,
  penaltiesScoring
} from './scoring_methods/scoring_methods.js';

const SimulatedGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allPlayersData = location.state;
  const [gameStats, setGameStats] = useState(null);
  const [allPlayerScores, setAllPlayerScores] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGameStats = () => {
      switch(allPlayersData.human["Teams Playing"]) {
        case "2019 Chiefs vs 2023 Chiefs":
          return Chiefs19vs23;
        case "1968 KU vs 1995 KU":
          return KU68vs95;
        case "2018 Chiefs vs 2015 Patriots":
          return Chiefs18vsPatriots15;
        case "1998 KState vs 2008 KU":
          return KSU98vsKU08;
        default:
          setError("No matching game stats found");
          return null;
      }
    };
    setGameStats(getGameStats());
  }, [allPlayersData]);

  useEffect(() => {
    if (gameStats) {
      try {
        calculateAllPlayerScores();
      } catch (err) {
        setError(`Error calculating points: ${err.message}`);
      }
    }
  }, [gameStats]);

  const calculatePlayerScore = (playerData) => {
    let points = 0;
    const scoringFunctions = {
      'Total Yards': totalYardsScoring,
      'Passing Yards': totalPassingYardsScoring,
      'Rushing Yards': totalRushingYardsScoring,
      '3rd Down Efficiency': thirdDownEfficiencyScoring,
      'Turnovers': turnoversScoring,
      'Sacks': sacksScoring,
      'Field Goals Made': fieldGoalsMadeScoring,
      'Punts': puntsScoring,
      'Time of Possession': timeOfPossessionScoring,
      'Penalties': penaltiesScoring
    };

    for (let i = 1; i <= 5; i++) {
      const statData = playerData["Stats Selected"][i];
      if (statData) {
        const scoringFunction = scoringFunctions[statData.stat];
        if (scoringFunction) {
          points += scoringFunction(gameStats, statData.stats_more, statData.points);
        } else {
          console.warn(`No scoring function found for stat: ${statData.stat}`);
        }
      }
    }
    return points;
  };

  const calculateAllPlayerScores = () => {
    const scores = {};
    for (const [player, data] of Object.entries(allPlayersData)) {
      scores[player] = calculatePlayerScore(data);
    }
    setAllPlayerScores(scores);
  };

  const handlePlayAgain = () => {
    navigate('/');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!gameStats || Object.keys(allPlayerScores).length === 0) {
    return <div>Loading...</div>;
  }

  const rankedScores = Object.entries(allPlayerScores)
    .sort(([, a], [, b]) => b - a)
    .map(([player, score], index) => ({ rank: index + 1, player, score }));

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '800px',
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
        margin: '0 auto 20px',
      }} />
      
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {allPlayersData.human["Teams Playing"]}
      </h2>
      
      <h3>Final Scores:</h3>
      <ol style={{ 
        listStyleType: 'none', 
        padding: 0,
        margin: '0 0 20px 0'
      }}>
        {rankedScores.map(({ rank, player, score }) => (
          <li key={player} style={{
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: player === 'human' ? '#e8f5e9' : '#f5f5f5',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>{rank}. {player === 'human' ? 'You' : player}</span>
            <span>{score} points</span>
          </li>
        ))}
      </ol>
      
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <button 
          onClick={handlePlayAgain}
          style={{
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Play Again
        </button>
        <button 
          onClick={() => window.open('https://apps.apple.com/your-app-store-link', '_blank')}
          style={{
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Download in App Store
        </button>
        <button 
          onClick={() => window.open('https://play.google.com/store/your-play-store-link', '_blank')}
          style={{
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#3DDC84',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Download in Google Play
        </button>
      </div>
    </div>
  );
};

export default SimulatedGame;
