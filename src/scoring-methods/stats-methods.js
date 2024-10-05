function totalYardsScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].offense.total_yards >
        gameStats.teams[1].offense.total_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].offense.total_yards >
        gameStats.teams[1].offense.total_yards
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function totalPassingYardsScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].offense.passing_yards >
        gameStats.teams[1].offense.passing_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].offense.passing_yards >
        gameStats.teams[1].offense.passing_yards
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function totalRushingYardsScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].offense.rushing_yards >
        gameStats.teams[1].offense.rushing_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].offense.rushing_yards >
        gameStats.teams[1].offense.rushing_yards
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function thirdDownEfficiencyScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      efficiencyCalc(gameStats.teams[0].offense.third_down_efficiency) >
        efficiencyCalc(gameStats.teams[1].offense.third_down_efficiency)
    ) {
      return points;
    } else if (
      !statsMore &&
      efficiencyCalc(gameStats.teams[0].offense.rushing_yards) >
        efficiencyCalc(gameStats.teams[1].offense.third_down_efficiency)
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function efficiencyCalc(efficiencyRatio) {
  return efficiencyRatio.split("/")[0] / efficiencyRatio.split("/")[1];
}

function turnoversScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].offense.turnovers >
        gameStats.teams[1].offense.turnovers
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].offense.turnovers >
        gameStats.teams[1].offense.turnovers
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function sacksScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].defense.sacks > gameStats.teams[1].defense.sacks
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].offense.sacks > gameStats.teams[1].offense.sacks
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function sacksScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].defense.sacks > gameStats.teams[1].defense.sacks
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].offense.sacks > gameStats.teams[1].offense.sacks
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function fieldGoalsMadeScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].special_teams.field_goals_made >
        gameStats.teams[1].special_teams.field_goals_made
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].special_teams.field_goals_made >
        gameStats.teams[1].special_teams.field_goals_made
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function puntsScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].special_teams.punts >
        gameStats.teams[1].special_teams.punts
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].special_teams.punts >
        gameStats.teams[1].special_teams.punts
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function timeOfPossessionScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      timeCalc(
        gameStats.teams[0].time_of_possession,
        gameStats.teams[1].time_of_possession
      )
    ) {
      return points;
    } else if (
      !statsMore &&
      timeCalc(
        gameStats.teams[0].time_of_possession,
        gameStats.teams[1].time_of_possession
      )
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function penaltiesScoring(gameStats, statsMore, points) {
  if (gameStats.teams[0].score > gamesStats.teams[1].score) {
    if (
      statsMore &&
      gameStats.teams[0].penalties > gameStats.teams[1].penalties
    ) {
      return points;
    } else if (
      !statsMore &&
      gameStats.teams[0].penalties > gameStats.teams[1].penalties
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

function timeCalc(firstTop, secondTop) {
  if (firstTop.split(":")[0] > secondTop.split(":")[0]) {
    return true;
  } else if (firstTop.split(":")[0] == secondTop.split(":")[0]) {
    if (firstTop.split(":")[1] > secondTop.split(":")[1]) {
      return true;
    }
  } else {
    return false;
  }
}
