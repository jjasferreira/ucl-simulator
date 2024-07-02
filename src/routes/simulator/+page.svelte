<script>
	import { League } from './league.js';

	let teamsPath = '/teams.json';
	let league = new League(teamsPath);
	let teams = null;
	let pots = null;
	let potsGenerated = false;
	let fixtures = null;
	let fixturesScheduled = false;

	async function generatePots() {
		await league.loadTeams();
		league.generatePots();
		teams = league.teams;
		pots = league.pots;
		potsGenerated = true;
	}

	async function scheduleFixtures() {
		await league.generateFixtures();
		league.scheduleFixtures();
		teams = league.teams;
		fixtures = league.fixtures;
		fixturesScheduled = true;
		console.log(teams);
		console.log(fixtures);
	}

</script>

<main class="flex flex-col items-center">

	<h1 class="font-champions-bold">Simulator</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu sapien lacus. Nulla venenatis, sem a finibus faucibus, metus mauris euismod mauris, ac ullamcorper massa massa quis tellus. Maecenas nisi dui, pharetra at interdum ut, rutrum a velit. Morbi at sem eu purus dictum pretium. Aenean non neque nec magna dignissim vehicula at quis ligula. Cras eget ligula et velit viverra commodo. Duis mattis tortor nec tortor ullamcorper, ac imperdiet dui viverra. Integer efficitur mi ex, eget dapibus augue sollicitudin sed.</p>

	{#if !potsGenerated}
	<button class="m-6" on:click={generatePots}>Generate Pots</button>
	{/if}
  
	{#if potsGenerated}
		<div class="flex flex-col lg:flex-row">
			{#each league.pots as pot, p}
			<div class="m-4 min-w-52">
				<h3 class="flex justify-center border-b-2">Pot {p + 1}</h3>
			  	{#each pot as team}
					<div class="flex h-12 p-2 border-b-2 border-x-2">
						<div class="flex w-8 justify-center">
							<img class="h-full" src={`src/lib/images/teams/${team.name}.svg`} alt="Logo"/>
						</div>
						<p class="flex ml-2 items-center">{team.name}</p>
					</div>
			 	{/each}
			</div>
			{/each}
		</div>

		{#if !fixturesScheduled}
			<button class="m-5" on:click={scheduleFixtures}>Schedule Fixtures</button>
		{/if}
	{/if}

	{#if fixturesScheduled}
		{#each fixtures as week, w}
			<h2>Matchweek {w + 1}</h2>
			{#each week as fixture}
			<div class="flex flex-col w-96 m-2 p-2 border-2 rounded-3xl">
				<div class="flex justify-center h-6 space-x-2">
					<div class="flex overflow-hidden w-6 rounded-full">
						<img class="object-cover" src={`src/lib/images/countries/${teams.get(fixture.home).country}.svg`} alt={teams.get(fixture.home).country}>
					</div>
					<p>{teams.get(fixture.home).ground}</p>
				</div>
				<div class="flex flex-row justify-between h-20">
					<div class="flex justify-center w-20">
						<img class="h-full" src={`src/lib/images/teams/${fixture.home}.svg`} alt={fixture.home}>
					</div>
					<div class="flex items-center">
						<h2>VS</h2>
					</div>
					<div class="flex justify-center w-20">
						<img class="h-full" src={`src/lib/images/teams/${fixture.away}.svg`} alt={fixture.away}>
					</div>
				</div>
			</div>
			{/each}
		{/each}
	{/if}
</main>