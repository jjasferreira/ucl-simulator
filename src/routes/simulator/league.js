import { base } from "$app/paths";

// Check if running in Node.js
const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

// Import necessary modules based on the environment
let fs;
//if (isNode) {
//  fs = await import("fs/promises");
//}

const NUMBER_TEAMS = 36;
const NUMBER_POTS = 4;
const NUMBER_WEEKS = 8;
const FIXTURES_PER_POT = NUMBER_WEEKS / NUMBER_POTS;
const FIXTURES_PER_WEEK = NUMBER_TEAMS / 2;
const LOCATIONS = ["Home", "Away"];

const DEBUG = false;

const getRandom = (array) => {
  false && console.log("getRandom(array): array =", array);
  const index = Math.floor(Math.random() * array.length);
  const random = array[index];
  false && console.log("getRandom(array): random =", random);
  return random;
};

const getRandomBetween = (min, max) => {
  false && console.log("getRandomBetween(min, max): min =", min, "max =", max);
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  false && console.log("getRandomBetween(min, max): random =", random);
  return random;
};

class Team {
  id;
  name;
  country;
  ground;
  color;
  coefficient;
  pot;

  fixtures;
  matchesPlayed;
  wins;
  draws;
  losses;
  goalsFor;
  goalsAgainst;
  points;

  constructor(id, name, country, ground, color, coefficient, pot) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.ground = ground;
    this.color = color;
    this.coefficient = coefficient;
    this.pot = pot;

    this.fixtures = [];
    this.matchesPlayed = 0;
    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.points = 0;
  }

  isDrawableTo(other) {
    // Not if this team is the same as the other
    if (this == other) return false;
    // Not if there is already a fixture between this team and the other
    if (this.fixtures.some((fixture) => fixture.id === other.id)) return false;
    // Not if this team is from the same country as the other
    if (this.country === other.country) return false;
    // Not if this team has already 2 fixtures with teams of the same pot as the other
    if (
      this.fixtures.filter((fixture) => fixture.pot === other.pot).length ==
      FIXTURES_PER_POT
    )
      return false;
    // Not if both teams have one fixture with a team of the same pot as the other with the same location
    if (
      this.fixtures.some((thisfix) =>
        other.fixtures.some(
          (otherfix) =>
            thisfix.pot === other.pot &&
            this.pot === otherfix.pot &&
            thisfix.location === otherfix.location
        )
      )
    )
      return false;
    // Else
    return true;
  }

  getLocationForFixture(other) {
    let fixture;
    // If this team has one fixture with a team of the same pot as the other
    if ((fixture = this.fixtures.find((fixture) => fixture.pot === other.pot)))
      return LOCATIONS.filter((location) => location !== fixture.location)[0];
    // If the other team has one fixture with a team of the same pot as this
    if ((fixture = other.fixtures.find((fixture) => fixture.pot === this.pot)))
      return LOCATIONS.filter((location) => location === fixture.location)[0];
    // Else
    return getRandom(LOCATIONS);
  }
}

export class League {
  teamsPath;
  teams;
  pots;
  fixtures;
  matchweekPlayed;

  constructor(teamsPath) {
    this.teamsPath = teamsPath;
    this.teams = null;
    this.pots = null;
    this.fixtures = null;
    this.matchweekPlayed = Array.from({ length: NUMBER_WEEKS }, () => false);
    //this.loadTeams();
    //this.generatePots();
    //this.generateFixtures();
    //this.scheduleFixtures();
  }

  async loadTeams() {
    this.teams = new Map();
    let json;
    //if (isNode) {
    //  const data = await fs.readFile(this.teamsPath, "utf-8");
    //  json = JSON.parse(data);
    //} else {
    const response = await fetch(`${base}${this.teamsPath}`);
    json = await response.json();
    //}
    json.forEach((team) => {
      this.teams.set(
        team.id,
        new Team(
          team.id,
          team.name,
          team.country,
          team.ground,
          team.color,
          team.coefficient,
          team.pot
        )
      );
    });
    DEBUG && console.log("loadTeams(): teams =", this.teams);
  }

  generatePots() {
    this.pots = Array.from({ length: NUMBER_POTS }, () => []);
    for (let team of this.teams.values()) {
      this.pots[team.pot - 1].push(team.id);
    }
    DEBUG && console.log("generatePots(): pots =", this.pots);
  }

  attemptGenerateFixtures() {
    let pots_ = JSON.parse(JSON.stringify(this.pots));
    this.fixtures = [];
    for (let team of this.teams.values()) {
      team.fixtures = [];
    }
    // For each pot i
    for (let i = 0; i < NUMBER_POTS; i++) {
      DEBUG && console.log("generateFixtures(): drawing pot =", i + 1);
      // While there are teams in pot i
      while (pots_[i].length > 0) {
        // Get a drawing team from pot i
        let t1id = getRandom(pots_[i]);
        let t1 = this.teams.get(t1id);
        DEBUG && console.log("generateFixtures(): drawing team =", t1.id);
        // For each pot j after and including pot i
        for (let j = i; j < NUMBER_POTS; j++) {
          // Draw teams until number of fixtures of pot j is two
          while (t1.fixtures.filter((f) => f.pot === j + 1).length < 2) {
            let drawableTeams = pots_[j]
              .map((tid) => this.teams.get(tid))
              .filter((t) => t.isDrawableTo(t1));
            if (drawableTeams.length === 0) {
              // No drawable teams available for drawing team in pot j
              return false;
            }
            DEBUG &&
              console.log(
                "generateFixtures(): drawable teams =",
                drawableTeams.map((t) => t.id)
              );
            let t2 = getRandom(drawableTeams);
            let loc = t1.getLocationForFixture(t2);
            t1.fixtures.push({
              id: t2.id,
              pot: t2.pot,
              location: loc,
            });
            t2.fixtures.push({
              id: t1.id,
              pot: t1.pot,
              location: LOCATIONS.filter((l) => l !== loc)[0],
            });
            this.fixtures.push({
              home: loc === LOCATIONS[0] ? t1.id : t2.id,
              away: loc === LOCATIONS[0] ? t2.id : t1.id,
            });
            DEBUG &&
              console.log(
                "generateFixtures(): drawn team =",
                t2.id,
                t2.pot,
                loc
              );
          }
        }
        // Remove drawing team from pot i
        pots_[i].splice(pots_[i].indexOf(t1id), 1);
      }
    }
    // For each team, sort pots of fixtures by location, with Home first
    for (let team of this.teams.values()) {
      for (let i = 0; i < team.fixtures.length; i += FIXTURES_PER_POT) {
        team.fixtures.splice(
          i,
          2,
          ...team.fixtures
            .slice(i, i + 2)
            .sort((a, b) => (a.location === "Away" ? 1 : -1))
        );
      }
    }
    // Fixtures generated successfully
    return true;
  }

  async generateFixtures() {
    let tries = 1;
    while (!this.attemptGenerateFixtures()) {
      tries++;
    }
    // It is taking on average 55 tries (from 15 attempts)
    DEBUG && console.log("generateFixtures(): number of tries =", tries);
    DEBUG && console.log("generateFixtures(): fixtures =", this.fixtures);
  }

  attemptScheduleFixtures() {
    let tries = 1;
    let weeks = Array.from({ length: NUMBER_WEEKS }, () => []);
    let fixtures_ = JSON.parse(JSON.stringify(this.fixtures));
    let week = 0;
    // For each matchweek
    while (week < NUMBER_WEEKS) {
      DEBUG && console.log("scheduleFixtures(): week =", week + 1);
      let weekTries = 0;
      let playingTeams = new Set();
      let match = 0;
      // For 18 fixtures
      while (match < FIXTURES_PER_WEEK) {
        // Choose a random fixture whose teams are not already playing in the current week
        let availableFixtures = fixtures_.filter(
          (f) => !playingTeams.has(f.home) && !playingTeams.has(f.away)
        );
        // If no available fixtures, reset the current matchweek and try again
        if (availableFixtures.length === 0) {
          if (weekTries > 1000) {
            weeks = Array.from({ length: NUMBER_WEEKS }, () => []);
            fixtures_ = JSON.parse(JSON.stringify(this.fixtures));
            week = 0;
            DEBUG &&
              console.log("scheduleFixtures(): resetting week =", week + 1);
          }
          weeks[week] = [];
          playingTeams.clear();
          match = 0;
          weekTries++;
          tries++;
          continue;
        }
        DEBUG &&
          console.log(
            "scheduleFixtures(): available fixtures =",
            availableFixtures
          );
        let fixture = getRandom(availableFixtures);
        DEBUG && console.log("scheduleFixtures(): chosen fixture =", fixture);
        weeks[week].push(fixture);
        playingTeams.add(fixture.home);
        playingTeams.add(fixture.away);
        match++;
      }
      // Remove extra fixtures from the copy
      fixtures_ = fixtures_.filter((f) => !weeks[week].includes(f));
      week++;
    }
    // Add matchweeks of fixtures to the teams
    for (let week = 0; week < NUMBER_WEEKS; week++) {
      for (let fixture of weeks[week]) {
        let home = this.teams.get(fixture.home);
        let away = this.teams.get(fixture.away);
        home.fixtures.find((f) => f.id === away.id).matchweek = week + 1;
        away.fixtures.find((f) => f.id === home.id).matchweek = week + 1;
      }
    }
    // Fixtures generated successfully
    this.fixtures = weeks;
    return tries;
  }

  scheduleFixtures() {
    let tries = this.attemptScheduleFixtures();
    // It is taking on average 2042 tries (from 15 attempts)
    DEBUG && console.log("scheduleFixtures(): number of tries =", tries);
    DEBUG && console.log("scheduleFixtures(): fixtures =", this.fixtures);
  }

  playMatchweek(week) {
    DEBUG && console.log("playMatchweek(week): week =", week);
    // Get the fixtures for the specific week
    let matchweekFixtures = this.fixtures[week - 1];
    // Simulate each match in the week
    for (let fixture of matchweekFixtures) {
      let home = this.teams.get(fixture.home);
      let away = this.teams.get(fixture.away);
      // Play match and determine result
      this.playMatch(home, away);
    }
    // Mark the matchweek as played
    this.matchweekPlayed[week - 1] = true;
  }

  playMatch(home, away) {
    DEBUG &&
      console.log("playMatch(home, away): home =", home.id, "away =", away.id);
    // Calculate win probabilities with 10% boost for home team
    let homeAdvantage = 1.1;
    let homeProbability =
      (home.coefficient * homeAdvantage) /
      (home.coefficient * homeAdvantage + away.coefficient);
    let awayProbability = 1 - homeProbability;
    DEBUG &&
      console.log(
        "playMatch(home, away): homeProbability =",
        homeProbability,
        "awayProbability =",
        awayProbability
      );
    // Generate random number to determine winner
    let random = Math.random();
    let homeGoals, awayGoals;
    if (random < homeProbability) {
      // Home team wins
      awayGoals = getRandomBetween(0, 2);
      homeGoals = getRandomBetween(awayGoals + 1, awayGoals + 3);
    } else {
      // Away team wins
      homeGoals = getRandomBetween(0, 2);
      awayGoals = getRandomBetween(homeGoals + 1, homeGoals + 3);
    }
    DEBUG &&
      console.log(
        "playMatch(home, away): random =",
        random,
        "homeGoals =",
        homeGoals,
        "awayGoals =",
        awayGoals
      );
    // Create result and update both teams stats accordingly
    home.fixtures.find((f) => f.id === away.id).result = [homeGoals, awayGoals];
    away.fixtures.find((f) => f.id === home.id).result = [homeGoals, awayGoals];
    home.matchesPlayed++;
    away.matchesPlayed++;
    if (homeGoals > awayGoals) {
      home.wins++;
      away.losses++;
      home.points += 3;
    } else if (homeGoals < awayGoals) {
      home.losses++;
      away.wins++;
      away.points += 3;
    } else {
      home.draws++;
      away.draws++;
      home.points++;
      away.points++;
    }
    home.goalsFor += homeGoals;
    home.goalsAgainst += awayGoals;
    away.goalsFor += awayGoals;
    away.goalsAgainst += homeGoals;
  }
}

// Node.js testing:
/*
const teamsPath = "../../../static/teams.json";
let league = new League(teamsPath);
await league.loadTeams();
league.generatePots();
await league.generateFixtures();
league.scheduleFixtures();
league.playMatchweek(1);
*/
