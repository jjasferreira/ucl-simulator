<script>
	import { League } from './league.js';

	let teamsPath = '/teams.json';
	let league = new League(teamsPath);
	let pots = null;
	let potsGenerated = false;
	let fixtures = null;
	let fixturesGenerated = false;

	async function generatePots() {
		await league.loadTeams();
		league.generatePots();
		pots = league.pots;
		potsGenerated = true;
	}

	async function generateFixtures() {
		league.generateFixtures();
		fixtures = league.fixtures;
		fixturesGenerated = true;
		console.log(league.teams);
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

		<button class="m-5" on:click={generateFixtures}>Generate Fixtures</button>
	{/if}

	{#if fixturesGenerated}
		<h3>{pots}</h3>
	{/if}
</main>