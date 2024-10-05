import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
  const gameData = location.state;
  const [gameStats, setGameStats] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Determine which JSON file to use based on the selected matchup
    const getGameStats = () => {
      switch(gameData["Teams Playing"]) {
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
  }, [gameData]);

  useEffect(() => {
    if (gameStats) {
      try {
        calculateTotalPoints();
      } catch (err) {
        setError(`Error calculating points: ${err.message}`);
      }
    }
  }, [gameStats]);

  const calculateTotalPoints = () => {
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
      const statData = gameData["Stats Selected"][i];
      if (statData) {
        const scoringFunction = scoringFunctions[statData.stat];
        if (scoringFunction) {
          points += scoringFunction(gameStats, statData.stats_more, statData.points);
        } else {
          console.warn(`No scoring function found for stat: ${statData.stat}`);
        }
      }
    }

    setTotalPoints(points);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!gameStats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Simulated Game</h1>
      <h2>{gameData["Teams Playing"]}</h2>
      <h3>Selected Stats:</h3>
      <ul>
        {Object.entries(gameData["Stats Selected"]).map(([key, value]) => (
          <li key={key}>
            {value.stat} - {value.stats_more ? 'More' : 'Less'} ({value.points} points)
          </li>
        ))}
      </ul>
      <h3>Total Points: {totalPoints}</h3>
      <pre>{JSON.stringify(gameStats, null, 2)}</pre>
    </div>
  );
};

export default SimulatedGame;
