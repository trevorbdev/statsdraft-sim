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

const gifMapping = {
  "2019 Chiefs": "../src/assets/2019chiefs.gif",
  "2023 Chiefs": "../src/assets/23chiefs.gif",
  "1968 KU": "../src/assets/1968jayhawk.gif",
  "1995 KU": "../src/assets/95ku.gif",
  "2018 Chiefs": "../src/assets/18chiefs.gif",
  "2015 Patriots": "../src/assets/2015pats.gif",
  "2008 KU": "../src/assets/2008jayhawk.gif",
  "1998 KState": "../src/assets/wildcat.gif",
};

const getGifsForTeams = (teamsPlaying) => {
  const teams = teamsPlaying.split(' vs ');
  return teams.map(team => gifMapping[team.trim()]).filter(Boolean);
};

const SimulatedGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allPlayersData = location.state;
  const [gameStats, setGameStats] = useState(null);
  const [allPlayerScores, setAllPlayerScores] = useState({});
  const [userStatScores, setUserStatScores] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFinal, setIsModalOpenFinal] = useState(false);
  const [getPlayerData, setPlayerData] = useState({});

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
    setPlayerData(playerData)
    let points = 0;
    const statScores = {};
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
          const statScore = scoringFunction(gameStats, statData.stats_more, statData.points);
          points += statScore;
          statScores[statData.stat + " " + statData.stats_more] = statScore;
        } else {
          console.warn(`No scoring function found for stat: ${statData.stat}`);
          statScores[statData.stat + " " + statData.stats_more] = 0;
        }
      }
    }
    return { totalPoints: points, statScores };
  };

  const calculateAllPlayerScores = () => {
    const scores = {};
    for (const [player, data] of Object.entries(allPlayersData)) {
      const { totalPoints, statScores } = calculatePlayerScore(data);
      scores[player] = totalPoints;
      if (player === 'human') {
        setUserStatScores(statScores);
      }
    }
    setAllPlayerScores(scores);
  };

  const handlePlayAgain = () => {
    navigate('/');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleModalFinal = () => {
    setIsModalOpenFinal(!isModalOpenFinal);
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000000' }}>
          {allPlayersData.human["Teams Playing"]}
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{color: '#000000'}}>Final Scores:</h3>
          <button 
            onClick={toggleModal}
            style={{
              padding: '10px',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginRight: '5px',
              cursor: 'pointer',
            }}
          >
            Explain my Score
          </button>
          <button 
            onClick={toggleModalFinal}
            style={{
              padding: '10px',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Final Team Scores
          </button>
        </div>

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
              color: '#000000'
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
              backgroundColor: 'rgb(19, 109, 21)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Play Again
          </button>
          <div style={{margin: '0 auto', textAlign: 'center'}}>
            <img 
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.statsdraft.app&pcampaignid=web_share', '_blank')}
              src="https://static.wixstatic.com/media/7c6199_1ffc951b203f48adb314cdc5d922a3c7~mv2.png/v1/fill/w_306,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/googleplay.png" 
              alt="googleplay.png" 
              style={{width:'185px',height:'60px'}} 
              width="185" 
              height="60"
            />
            <img 
              onClick={() => window.open('https://apps.apple.com/us/app/statsdraft/id6451419726', '_blank')}
              src="https://static.wixstatic.com/media/7c6199_e3b0e86d110f4962b07ae4f5f9089f58~mv2.png/v1/fill/w_303,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Apple.png" 
              alt="Apple.png" 
              style={{width:'185px',height:'60px'}} 
              width="185" 
              height="60"
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            maxWidth: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
          }}>
            <h2 style={{color:'#000000'}}>Your Score Explanation</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              
            {Object.entries(userStatScores).map(([stat, score]) => {
              // Extract the last character of the stat as a number (boolean-like value)
              const booleanValue = parseInt(stat.slice(-1), 10);
              // Remove the last character from the stat to display only the stat text
              const statText = stat.slice(0, -2);

              return (
                <li key={stat} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  padding: '5px',
                  borderRadius: '5px',
                  color: booleanValue === 1 ? 'green' : 'red',  // Set color based on boolean value
                }}>
                  <span>{statText}</span>
                  <span>{score} pts</span>
                </li>
              );
            })}

            </ul>
            <button 
              onClick={toggleModal}
              style={{
                padding: '10px',
                fontSize: '14px',
                fontWeight: 'bold',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}


{isModalOpenFinal && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '80%',
      maxHeight: '80%',
      overflowY: 'auto',
    }}>
      <h2>Final Game Score!</h2>
      <ul style={{ listStyleType: 'none', padding: 0 , color:'#000000' }}>
        <li style={{color:'#000000'}}>{gameStats.game.teams[0].team_name} score: {gameStats.game.teams[0].score}</li>
        <li style={{color:'#000000'}}>{gameStats.game.teams[1].team_name} score: {gameStats.game.teams[1].score}</li>
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {getGifsForTeams(getPlayerData['Teams Playing']).map((gif, index) => (
          <img key={index} src={gif} alt={gif} style={{ width: '150px', height: 'auto', margin: '0 10px' }} />
        ))}
      </div>
      <button 
        onClick={toggleModalFinal}
        style={{
          padding: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Close
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default SimulatedGame;
