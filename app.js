const NUMBER_TEAMS = 36;
const NUMBER_POTS = 4;
const NUMBER_FIXTURES = 8;
const TEAMS_PER_POT = NUMBER_TEAMS / NUMBER_POTS;
const FIXTURES_PER_POT = NUMBER_FIXTURES / NUMBER_POTS;
const LOCATIONS = ["Home", "Away"];

const DEBUG = false;

getRandom = (array) => {
  false && console.log("getRandom(array): array =", array);
  const index = Math.floor(Math.random() * array.length);
  const element = array[index];
  false && console.log("getRandom(array): element =", element);
  return element;
};

class Team {
  name;
  country;
  coefficient;
  pot;
  fixtures;

  constructor(name, country, coefficient, pot) {
    this.name = name;
    this.country = country;
    this.coefficient = coefficient;
    this.pot = pot;
    this.fixtures = [];
  }

  addFixture(fixture) {
    this.fixtures.push(fixture);
  }

  isDrawableTo(other) {
    // Not if this team is the same as the other
    if (this == other) return false;
    // Not if there is already a fixture between this team and the other
    if (this.fixtures.some((fixture) => fixture.team === other.name))
      return false;
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

class League {
  teams;
  pots;
  fixtures;
  matchweeks;

  constructor() {
    this.loadTeams();
    this.generatePots();
    this.generateFixtures();
    //this.scheduleFixtures();
  }

  loadTeams() {
    // Load teams from JSON file and create Team objects
    this.teams = new Map();
    let json = require("./teams.json");
    json.forEach((team) => {
      this.teams.set(
        team.name,
        new Team(team.name, team.country, team.coefficient, team.pot)
      );
    });
    DEBUG && console.log("loadTeams(): teams =", this.teams);
  }

  generatePots() {
    this.pots = Array.from({ length: NUMBER_POTS }, () => []);
    for (let team of this.teams.values()) {
      this.pots[team.pot - 1].push(team);
    }
    DEBUG &&
      console.log(
        "generatePots(): pots =",
        this.pots.map((pot) => pot.map((team) => team.name))
      );
  }

  addFixture(fixture) {
    this.fixtures.push(fixture);
  }

  attemptGenerateFixtures() {
    this.fixtures = [];
    // For each pot i
    for (let i = 0; i < NUMBER_POTS; i++) {
      DEBUG && console.log("Drawing pot =", i + 1);
      // While there are teams in pot i
      while (this.pots[i].length > 0) {
        // Get a drawing team from pot i
        let t1 = getRandom(this.pots[i]);
        DEBUG && console.log("Drawing team =", t1.name);
        // For each pot j after and including pot i
        for (let j = i; j < NUMBER_POTS; j++) {
          // Draw teams until number of fixtures of pot j is two
          while (t1.fixtures.filter((f) => f.pot === j + 1).length < 2) {
            let drawableTeams = this.pots[j].filter((t) => t.isDrawableTo(t1));
            if (drawableTeams.length === 0) {
              // No drawable teams available for drawing team in pot j
              return false;
            }
            DEBUG &&
              console.log(
                "Options to draw =",
                drawableTeams.map((t) => t.name)
              );
            let t2 = getRandom(drawableTeams);
            let loc = t1.getLocationForFixture(t2);
            t1.addFixture({
              team: t2.name,
              pot: t2.pot,
              location: loc,
            });
            t2.addFixture({
              team: t1.name,
              pot: t1.pot,
              location: LOCATIONS.filter((l) => l !== loc)[0],
            });
            this.addFixture({
              home: loc === LOCATIONS[0] ? t1.name : t2.name,
              away: loc === LOCATIONS[0] ? t2.name : t1.name,
            });
            DEBUG && console.log("Drawn team =", t2.name, t2.pot, loc);
          }
        }
        // Remove drawing team from pot i
        this.pots[i].splice(this.pots[i].indexOf(t1), 1);
      }
    }
    // Fixtures generated successfully
    return true;
  }

  generateFixtures() {
    let tries = 1;
    while (!this.attemptGenerateFixtures()) {
      // While it fails, delete fixtures in teams and repopulate pots
      this.loadTeams();
      this.generatePots();
      tries++;
    }
    // It takes on average 35 tries for it to generate fixtures successfully
    DEBUG && console.log("generateFixtures(): number of tries =", tries);
    DEBUG && console.log("generateFixtures(): fixtures =", this.fixtures);
  }
}

let league = new League();
