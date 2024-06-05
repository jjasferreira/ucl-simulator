const NUMBER_TEAMS = 36;
const NUMBER_POTS = 4;
const NUMBER_FIXTURES = 8;
const TEAMS_PER_POT = NUMBER_TEAMS / NUMBER_POTS;
const FIXTURES_PER_POT = NUMBER_FIXTURES / NUMBER_POTS;
const LOCATIONS = ["Home", "Away"];

const DEBUG = false;

getRandom = (array) => {
  DEBUG && console.log("getRandom array:", array);
  const index = Math.floor(Math.random() * array.length);
  const element = array[index];
  DEBUG && console.log("getRandom element:", element);
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

  constructor() {
    this.loadTeams();
    this.generatePots();
    this.generateFixtures();
  }

  loadTeams() {
    // Load teams from JSON file and create Team objects
    this.teams = [];
    let json = require("./teams.json");
    for (let i = 0; i < json.length; i++) {
      this.teams.push(
        new Team(
          json[i]["name"],
          json[i]["country"],
          json[i]["coefficient"],
          json[i]["pot"]
        )
      );
    }
  }

  generatePots() {
    this.pots = Array.from({ length: NUMBER_POTS }, () => []);
    let teamIndex = 0;
    for (let i = 0; i < NUMBER_POTS; i++) {
      for (let j = 0; j < TEAMS_PER_POT; j++) {
        let team = this.teams[teamIndex];
        this.pots[i].push(team);
        teamIndex++;
      }
    }
    DEBUG &&
      console.log(
        "Pot 1: ",
        this.pots[0].map((t) => t.name)
      );
    DEBUG &&
      console.log(
        "Pot 2: ",
        this.pots[1].map((t) => t.name)
      );
    DEBUG &&
      console.log(
        "Pot 3: ",
        this.pots[2].map((t) => t.name)
      );
    DEBUG &&
      console.log(
        "Pot 4: ",
        this.pots[3].map((t) => t.name)
      );
  }

  attemptGenerateFixtures() {
    // For each pot i
    for (let i = 0; i < NUMBER_POTS; i++) {
      DEBUG && console.log("Drawing pot:", i + 1);
      // While there are teams in pot i
      while (this.pots[i].length > 0) {
        // Get a drawing team from pot i
        let t0 = getRandom(this.pots[i]);
        DEBUG && console.log("Drawing team:", t0.name);
        // For each pot j after and including pot i
        for (let j = i; j < NUMBER_POTS; j++) {
          // Draw teams until number of fixtures of pot j is two
          while (t0.fixtures.filter((f) => f.pot === j + 1).length < 2) {
            let drawableTeams = this.pots[j].filter((t) => t.isDrawableTo(t0));
            if (drawableTeams.length === 0) {
              // No drawable teams available for drawing team in pot j
              return false;
            }
            DEBUG &&
              console.log(
                "Options to draw:",
                drawableTeams.map((t) => t.name)
              );
            let t1 = getRandom(drawableTeams);
            let l1 = t0.getLocationForFixture(t1);
            t0.addFixture({ team: t1.name, pot: t1.pot, location: l1 });
            t1.addFixture({
              team: t0.name,
              pot: t0.pot,
              location: LOCATIONS.filter((l) => l !== l1)[0],
            });
            DEBUG && console.log("Drawn team:", t1.name, t1.pot, l1);
            DEBUG && console.log("--------------------");
          }
        }
        // Remove drawing team from pot i
        this.pots[i].splice(this.pots[i].indexOf(t0), 1);
      }
    }
    // Fixtures generated successfully
    return true;
  }

  generateFixtures() {
    let tries = 1;
    while (!this.attemptGenerateFixtures()) {
      this.loadTeams();
      this.generatePots();
      tries++;
    }
    // It takes on average 35 tries for it to generate fixtures successfully
    DEBUG &&
      console.log("Fixtures generated successfully after", tries, "tries");
    DEBUG && console.log("Fixtures:");
    for (let i = 0; i < NUMBER_TEAMS; i++) {
      console.log(this.teams[i].name, this.teams[i].fixtures);
    }
  }
}

let league = new League();
