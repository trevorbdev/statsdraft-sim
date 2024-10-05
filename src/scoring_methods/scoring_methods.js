export function totalYardsScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].offense.total_yards === gamesStats.game.teams[1].offense.total_yards) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].offense.total_yards >
        gamesStats.game.teams[1].offense.total_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].offense.total_yards <
        gamesStats.game.teams[1].offense.total_yards
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].offense.total_yards >
        gamesStats.game.teams[0].offense.total_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].offense.total_yards <
        gamesStats.game.teams[0].offense.total_yards
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function totalPassingYardsScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].offense.passing_yards === gamesStats.game.teams[1].offense.passing_yards) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].offense.passing_yards >
        gamesStats.game.teams[1].offense.passing_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].offense.passing_yards <
        gamesStats.game.teams[1].offense.passing_yards
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].offense.passing_yards >
        gamesStats.game.teams[0].offense.passing_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].offense.passing_yards <
        gamesStats.game.teams[0].offense.passing_yards
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function totalRushingYardsScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].offense.rushing_yards === gamesStats.game.teams[1].offense.rushing_yards) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].offense.rushing_yards >
        gamesStats.game.teams[1].offense.rushing_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].offense.rushing_yards <
        gamesStats.game.teams[1].offense.rushing_yards
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].offense.rushing_yards >
        gamesStats.game.teams[0].offense.rushing_yards
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].offense.rushing_yards <
        gamesStats.game.teams[0].offense.rushing_yards
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function thirdDownEfficiencyScoring(gamesStats, statsMore, points) {
  const team0Efficiency = efficiencyCalc(gamesStats.game.teams[0].offense.third_down_efficiency);
  const team1Efficiency = efficiencyCalc(gamesStats.game.teams[1].offense.third_down_efficiency);
  if (team0Efficiency === team1Efficiency) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      team0Efficiency > team1Efficiency
    ) {
      return points;
    } else if (
      !statsMore &&
      team0Efficiency < team1Efficiency
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      team1Efficiency > team0Efficiency
    ) {
      return points;
    } else if (
      !statsMore &&
      team1Efficiency < team0Efficiency
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function turnoversScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].offense.turnovers === gamesStats.game.teams[1].offense.turnovers) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].offense.turnovers >
        gamesStats.game.teams[1].offense.turnovers
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].offense.turnovers <
        gamesStats.game.teams[1].offense.turnovers
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].offense.turnovers >
        gamesStats.game.teams[0].offense.turnovers
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].offense.turnovers <
        gamesStats.game.teams[0].offense.turnovers
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function sacksScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].defense.sacks === gamesStats.game.teams[1].defense.sacks) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].defense.sacks > gamesStats.game.teams[1].defense.sacks
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].defense.sacks < gamesStats.game.teams[1].defense.sacks
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].defense.sacks > gamesStats.game.teams[0].defense.sacks
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].defense.sacks < gamesStats.game.teams[0].defense.sacks
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function fieldGoalsMadeScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].special_teams.field_goals_made === gamesStats.game.teams[1].special_teams.field_goals_made) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].special_teams.field_goals_made >
        gamesStats.game.teams[1].special_teams.field_goals_made
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].special_teams.field_goals_made <
        gamesStats.game.teams[1].special_teams.field_goals_made
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].special_teams.field_goals_made >
        gamesStats.game.teams[0].special_teams.field_goals_made
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].special_teams.field_goals_made <
        gamesStats.game.teams[0].special_teams.field_goals_made
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function puntsScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].special_teams.punts === gamesStats.game.teams[1].special_teams.punts) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].special_teams.punts >
        gamesStats.game.teams[1].special_teams.punts
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].special_teams.punts <
        gamesStats.game.teams[1].special_teams.punts
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].special_teams.punts >
        gamesStats.game.teams[0].special_teams.punts
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].special_teams.punts <
        gamesStats.game.teams[0].special_teams.punts
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function timeOfPossessionScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].time_of_possession === gamesStats.game.teams[1].time_of_possession) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      timeCalc(
        gamesStats.game.teams[0].time_of_possession,
        gamesStats.game.teams[1].time_of_possession
      )
    ) {
      return points;
    } else if (
      !statsMore &&
      !timeCalc(
        gamesStats.game.teams[0].time_of_possession,
        gamesStats.game.teams[1].time_of_possession
      )
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      timeCalc(
        gamesStats.game.teams[1].time_of_possession,
        gamesStats.game.teams[0].time_of_possession
      )
    ) {
      return points;
    } else if (
      !statsMore &&
      !timeCalc(
        gamesStats.game.teams[1].time_of_possession,
        gamesStats.game.teams[0].time_of_possession
      )
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function penaltiesScoring(gamesStats, statsMore, points) {
  if (gamesStats.game.teams[0].penalties === gamesStats.game.teams[1].penalties) {
    return 1;
  }
  if (gamesStats.game.teams[0].score > gamesStats.game.teams[1].score) {
    if (
      statsMore &&
      gamesStats.game.teams[0].penalties > gamesStats.game.teams[1].penalties
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[0].penalties < gamesStats.game.teams[1].penalties
    ) {
      return points;
    } else {
      return 0;
    }
  } else {
    if (
      statsMore &&
      gamesStats.game.teams[1].penalties > gamesStats.game.teams[0].penalties
    ) {
      return points;
    } else if (
      !statsMore &&
      gamesStats.game.teams[1].penalties < gamesStats.game.teams[0].penalties
    ) {
      return points;
    } else {
      return 0;
    }
  }
}

export function efficiencyCalc(efficiencyRatio) {
  return efficiencyRatio.split("/")[0] / efficiencyRatio.split("/")[1];
}

export function timeCalc(firstTop, secondTop) {
  if (firstTop.split(":")[0] > secondTop.split(":")[0]) {
    return true;
  } else if (firstTop.split(":")[0] == secondTop.split(":")[0]) {
    if (firstTop.split(":")[1] > secondTop.split(":")[1]) {
      return true;
    }
  }
  return false;
}
