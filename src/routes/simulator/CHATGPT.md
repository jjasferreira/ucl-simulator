my-app/
├── src/
│      └── routes/
│              └── simulator/
│                      └── +page.server.js
│                      └── +page.svelte
│                      └── league.js
├── static/
│      └── teams.json
├── svelte.config.js
└── package.json


```+page.svelte
<script>
	import { league } from './league.js';
</script>

<main class="px-10">
	<h1>Game Info</h1>
	<button on:click={league.loadTeams()}>See Pots</button>
  
	{#if league.pots}
		<div class="flex flex-col md:flex-row">
			{#each league.pots as pot}
			<div>
				<h2>Pot X</h2>
			  	{#each pot as team}
					<div class="flex h-8 m-1 space-x-2">
						<div class="flex w-8 justify-center">
							<img class="h-full" src={`src/lib/images/teams/${team}.png`} alt="Logo"/>
						</div>
						<p class="flex items-center">{team}</p>
					</div>
			 	{/each}
			</div>
			{/each}
		</div>
	{/if}
</main>
```

```league.js
const NUMBER_TEAMS = 36;
const NUMBER_POTS = 4;
const NUMBER_WEEKS = 8;
const FIXTURES_PER_POT = NUMBER_WEEKS / NUMBER_POTS;
const FIXTURES_PER_WEEK = NUMBER_TEAMS / 2;
const LOCATIONS = ['Home', 'Away'];

const DEBUG = false;

getRandom = (array) => {
	false && console.log('getRandom(array): array =', array);
	const index = Math.floor(Math.random() * array.length);
	const element = array[index];
	false && console.log('getRandom(array): element =', element);
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

	isDrawableTo(other) {
		// Not if this team is the same as the other
		if (this == other) return false;
		// Not if there is already a fixture between this team and the other
		if (this.fixtures.some((fixture) => fixture.team === other.name)) return false;
		// Not if this team is from the same country as the other
		if (this.country === other.country) return false;
		// Not if this team has already 2 fixtures with teams of the same pot as the other
		if (this.fixtures.filter((fixture) => fixture.pot === other.pot).length == FIXTURES_PER_POT)
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
	teams;
	pots;
	fixtures;

	constructor() {
		this.teams = null;
		this.pots = null;
		this.fixtures = null;
	}

	async loadTeams() {
		this.teams = new Map();
		const response = await fetch('/teams.json');
		const json = await response.json();
		json.forEach((team) => {
			this.teams.set(team.name, new Team(team.name, team.country, team.coefficient, team.pot));
		});
		DEBUG && console.log('loadTeams(): teams =', this.teams);
	}

	generatePots() {
		this.pots = Array.from({ length: NUMBER_POTS }, () => []);
		for (let team of this.teams.values()) {
			this.pots[team.pot - 1].push(team);
		}
		DEBUG &&
			console.log(
				'generatePots(): pots =',
				this.pots.map((pot) => pot.map((team) => team.name))
			);
	}
}

// Export an instance of the League class
export const league = new League();

```

```teams.json
[
  {
    "name": "Manchester City",
    "country": "England",
    "coefficient": 148000,
    "pot": 1
  },
  {
    "name": "Bayern München",
    "country": "Germany",
    "coefficient": 144000,
    "pot": 1
  },
  {
    "name": "Real Madrid",
    "country": "Spain",
    "coefficient": 136000,
    "pot": 2
  }
  (...)
]
```

Question:
- how can i iterate through each pot and then through each team? this is not working