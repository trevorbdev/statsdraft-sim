import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import all JSON files
import Chiefs19vs23 from './ai-json-data/19Chiefs23Chiefs.json';
import KU68vs95 from './ai-json-data/68KU95KU.json';
import Chiefs18vsPatriots15 from './ai-json-data/18Chiefs15Patriots.json';
import KSU98vsKU08 from './ai-json-data/98KSU08KU.json';
import AppBar from './AppBar';
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
      boxSizing: 'border-box',
      backgroundColor: '#f0f0f0',
    }}>
      <AppBar/>
      <div style={{padding: '20px'}}>
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
        <div style={{margin: '0 auto'}}>
        <img 
          onClick={() => window.open('https://play.google.com/store/apps/details?id=com.statsdraft.app&pcampaignid=web_share', '_blank')}
          src="https://static.wixstatic.com/media/7c6199_1ffc951b203f48adb314cdc5d922a3c7~mv2.png/v1/fill/w_306,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/googleplay.png" alt="googleplay.png" style={{width:'185px',height:'60px'}} width="185" height="60"
        />
        <img 
          onClick={() => window.open('https://apps.apple.com/us/app/statsdraft/id6451419726', '_blank')}
          src="https://static.wixstatic.com/media/7c6199_e3b0e86d110f4962b07ae4f5f9089f58~mv2.png/v1/fill/w_303,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Apple.png" alt="Apple.png" style={{width:'185px',height:'60px'}} width="185" height="60"
        />
        </div>
      </div>
      </div>
    </div>
  );
};

export default SimulatedGame;
