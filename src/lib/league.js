// Check if running in Node.js
/*
const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;
*/

// Import necessary modules based on the environment
/*
let fs;
if (isNode) {
  fs = await import("fs/promises");
}
*/

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

  fixtures; //this is going to have a reference to index of the matches list inside league. rm this after matches is working
  matches;
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
    this.matches = [];
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

class Match {
  id;
  home;
  away;
  played;
  round;
  homeGoals;
  awayGoals;
  //homeOdds;
  //drawOdds;
  //awayOdds;

  constructor(id, home, away) {
    this.id = id;
    this.home = home;
    this.away = away;
    this.played = false;
  }

  setRound(round) {
    this.round = round;
  }

  setResult(homeGoals, awayGoals) {
    this.homeGoals = homeGoals;
    this.awayGoals = awayGoals;
    this.played = true;
  }
}

export class League {
  teams; // Map { id1: Team, id2: Team, ... }
  pots; // Array [ [id1, id2, ...], [id3, ...], ... ]
  table; // Array [ id1, id2, ... ]
  round; // int
  fixtures; // Array [ [ { home, away }, ... ], ... ] //rm when matches is working
  matches; // Map { id1: Match, id2: Match, ... } // NEW
  rounds;

  constructor(teamsJson) {
    this.teams = new Map();
    this.pots = null;
    this.table = [];
    this.round = 0;
    this.fixtures = null; //rm when matches is working, also these types of null lines inits are not needed
    this.matches = new Map(); // NEW
    this.rounds = Array.from({ length: NUMBER_WEEKS }, () => []); // NEW

    /*[
      [
        [17, 18],
        [15, 16],
      ],
      [
        [23, 24],
        [9, 10],
      ],
      [
        [21, 22],
        [11, 12],
      ],
      [
        [19, 20],
        [13, 14],
      ],
      [
        [18, 17],
        [16, 15],
      ],
      [
        [24, 23],
        [10, 9],
      ],
      [
        [22, 21],
        [12, 11],
      ],
      [
        [20, 19],
        [14, 13],
      ],
    ];
    */

    // Instantly populate the Map using the passed JSON data
    teamsJson.forEach((team) => {
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

    console.log("Constructor: teams populated =", this.teams);
  }

  initializeTable() {
    // Convert teams map to array and sort it by name
    let teamsArray = Array.from(this.teams.values());
    teamsArray.sort((a, b) => a.name.localeCompare(b.name));
    // Map to array of team IDs only
    this.table = teamsArray.map((team) => team.id);
    DEBUG && console.log("initializeTable(): table =", this.table);
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
    this.matches.clear(); // NEW
    for (let team of this.teams.values()) {
      team.fixtures = [];
      team.matches = []; // NEW
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
              home: loc === "Home" ? t1.id : t2.id,
              away: loc === "Home" ? t2.id : t1.id,
            });
            // NEW
            let home = loc === "Home" ? t1.id : t2.id;
            let away = loc === "Home" ? t2.id : t1.id;
            const matchid = this.matches.size;
            this.matches.set(matchid, new Match(matchid, home, away));
            t1.matches.push(matchid);
            t2.matches.push(matchid);
            // END NEW

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
    let matches_ = [...this.matches.values()];
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
        let availableFixtures = matches_.filter(
          (f) => !playingTeams.has(f.home) && !playingTeams.has(f.away)
        );
        // If no available fixtures, reset the current matchweek and try again
        if (availableFixtures.length === 0) {
          if (weekTries > 1000) {
            weeks = Array.from({ length: NUMBER_WEEKS }, () => []);
            this.rounds = Array.from({ length: NUMBER_WEEKS }, () => []);
            matches_ = [...this.matches.values()];
            week = 0;
            DEBUG &&
              console.log("scheduleFixtures(): resetting week =", week + 1);
          }
          weeks[week] = [];
          this.rounds[week] = [];
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
        this.rounds[week].push(fixture.id);
        playingTeams.add(fixture.home);
        playingTeams.add(fixture.away);
        match++;
      }
      // Remove extra fixtures from the copy
      matches_ = matches_.filter((f) => !weeks[week].includes(f));
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
    for (let week = 0; week < NUMBER_WEEKS; week++) {
      for (let matchid of this.rounds[week]) {
        this.matches.get(matchid).setRound(week + 1);
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
    let matchids = this.rounds[week - 1];
    // Simulate each match in the week
    for (let matchid of matchids) {
      // Play match and determine result
      this.playMatch(this.matches.get(matchid));
    }
    // Mark the matchweek as played
    this.round = week;
    this.updateTable();
  }

  playMatch(match) {
    const home = this.teams.get(match.home);
    const away = this.teams.get(match.away);

    // Calculate odds
    const homeBoost = 0.05,
      drawFactor = 0.02,
      drawLimit = 0.5;
    const homeProb =
      home.coefficient / (home.coefficient + away.coefficient) + homeBoost;
    const drawOdds = Math.min(
      drawFactor / Math.abs(2 * homeProb - 1),
      drawLimit
    );
    const homeOdds = homeProb * (1 - drawOdds);

    // Generate random number to determine winner
    const diff = Math.abs(2 * homeOdds + drawOdds - 1);
    const roll = Math.random();
    let homeGoals, awayGoals;
    if (roll < drawOdds) {
      // Draw - likely more goals if teams are evenly matched
      const maxGoals = Math.floor(7 * (1 - diff));
      homeGoals = awayGoals = Math.floor(
        Math.pow(Math.random(), 2) * (maxGoals + 1)
      );
      home.points++, away.points++;
      home.draws++, away.draws++;
    } else if (roll < drawOdds + homeOdds) {
      // Home win - difference of goals is bigger the bigger the difference of chances are
      const maxGoals = 1 + Math.floor(10 * diff);
      homeGoals = getRandomBetween(1, maxGoals);
      awayGoals = getRandomBetween(0, homeGoals * (1 - diff) - 1);
      home.points += 3;
      home.wins++, away.losses++;
    } else {
      // Away win
      const maxGoals = 1 + Math.floor(7 * diff);
      awayGoals = getRandomBetween(1, maxGoals);
      homeGoals = getRandomBetween(0, awayGoals * (1 - diff) - 1);
      away.points += 3;
      home.losses++, away.wins++;
    }
    match.setResult(homeGoals, awayGoals);
    home.matchesPlayed++, away.matchesPlayed++;
    (home.goalsFor += homeGoals), (away.goalsFor += awayGoals);
    (home.goalsAgainst += awayGoals), (away.goalsAgainst += homeGoals);
  }

  updateTable() {
    // Convert teams map to array and sort it by points, goal difference and goals scored
    let teamsArray = Array.from(this.teams.values());
    teamsArray.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.goalsFor - a.goalsAgainst !== b.goalsFor - b.goalsAgainst)
        return b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst);
      return b.goalsFor - a.goalsFor;
    });
    // Map to array of team IDs only
    this.table = teamsArray.map((team) => team.id);
    DEBUG && console.log("updateTable(): table =", this.table);
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
console.log(league);
*/
