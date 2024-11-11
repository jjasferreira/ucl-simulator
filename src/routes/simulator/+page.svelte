<script>
	import { League } from './league.js';

	let teamsPath = '/teams.json';
	let league = new League(teamsPath);
	let potsGenerated = false;
	let fixturesGenerated = false;
	let fixturesScheduled = false;

	async function generatePots() {
		await league.loadTeams();
		league.generatePots();
		potsGenerated = true;
	}

	async function generateFixtures() {
		await league.generateFixtures();
		fixturesGenerated = true;
	}

	async function scheduleFixtures() {
		league.scheduleFixtures();
		fixturesScheduled = true;
		console.log("LEAGUE", league);
	}

</script>

<main class="flex flex-col items-center">

	<h1 class="font-champions-bold">Simulator</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu sapien lacus. Nulla venenatis, sem a finibus faucibus, metus mauris euismod mauris, ac ullamcorper massa massa quis tellus. Maecenas nisi dui, pharetra at interdum ut, rutrum a velit. Morbi at sem eu purus dictum pretium. Aenean non neque nec magna dignissim vehicula at quis ligula. Cras eget ligula et velit viverra commodo. Duis mattis tortor nec tortor ullamcorper, ac imperdiet dui viverra. Integer efficitur mi ex, eget dapibus augue sollicitudin sed.</p>

	{#if !potsGenerated}
	<button class="m-6" on:click={generatePots}>Generate Pots</button>
	{/if}
  
	{#if potsGenerated}
		<!-- Pots Table -->
		<div class="flex flex-col lg:flex-row">
			{#each league.pots as pot, p}
			<div class="m-4 min-w-52">
				<h3 class="flex justify-center border-b-2">POT {p + 1}</h3>
			  	{#each pot as teamname}
					<div class="flex h-12 p-2 border-b-2 border-x-2">
						<div class="flex w-8 justify-center">
							<img class="h-full" src={`src/lib/images/teams/${teamname}.svg`} alt="Logo"/>
						</div>
						<p class="flex ml-2 items-center">{teamname}</p>
					</div>
			 	{/each}
			</div>
			{/each}
		</div>

		{#if !fixturesGenerated}
			<button class="m-5" on:click={generateFixtures}>Generate Fixtures</button>
		{/if}
	{/if}

	{#if fixturesGenerated}
		<!-- Fixtures Tables -->
		{#each league.pots as pot, p}
			<h3>POT {p + 1} FIXTURES</h3>
			<table class="mb-5">
				<thead>
					<tr>
						<th></th>
						<th colspan=2 class="font-normal">POT 1</th>
						<th colspan=2 class="font-normal">POT 2</th>
						<th colspan=2 class="font-normal">POT 3</th>
						<th colspan=2 class="font-normal">POT 4</th>
					</tr>
					<tr class="text-sm">
						<th></th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl">HOME</div>
							</div>
						</th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl">AWAY</div>
							</div>
						</th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl">HOME</div>
							</div>
						</th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl">AWAY</div>
							</div>
						</th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl">HOME</div>
							</div>
						</th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl">AWAY</div>
							</div>
						</th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl">HOME</div>
							</div>
						</th>
						<th class="font-normal">
							<div class="flex">
								<div class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl">AWAY</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each pot as teamname}
					<tr class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35">
						<td class="w-48 py-2">
							<div class="flex h-6 px-3">
								<div class="flex w-6 justify-center">
									<img class="h-full" src={`src/lib/images/teams/${teamname}.svg`} alt="Logo"/>
								</div>
								<p class="flex ml-2 items-center">{teamname}</p>
							</div>
						</td>
						{#each league.teams.get(teamname).fixtures as fixture}
						<td class="py-2">
							<div class="flex h-6 px-3 border-l-2 border-blue-600 border-opacity-35 relative">
								<div class="flex w-6 justify-center">
									<img class="h-full" src={`src/lib/images/teams/${fixture.name}.svg`} alt={fixture.name}/>
								</div>
								<p class="flex ml-2 items-center">{league.teams.get(fixture.name).abbreviation}</p>
								{#if fixturesScheduled}
								<div class="w-3 h-3 flex items-center justify-center absolute bottom-0 left-7 bg-blue-700 rounded-full" style="font-size: 0.625rem; line-height: 0.875rem;">
									{fixture.matchweek}
								</div>
								{/if}
							</div>
						</td>
						{/each}
					</tr>
					{/each}
				</tbody>
			</table>
		{/each}

		{#if !fixturesScheduled}
			<button class="m-5" on:click={scheduleFixtures}>Schedule Fixtures</button>
		{/if}
	{/if}

	{#if fixturesScheduled}
		<!-- Matchweeks -->
		{#each league.fixtures as week, w}
			<h2>Matchweek {w + 1}</h2>
			{#each week as fixture}
			<div class="flex flex-col w-96 m-2 p-2 border-2 rounded-3xl">
				<div class="flex justify-center h-6 space-x-2">
					<div class="flex overflow-hidden w-6 rounded-full">
						<img class="object-cover" src={`src/lib/images/countries/${league.teams.get(fixture.home).country}.svg`} alt={league.teams.get(fixture.home).country}>
					</div>
					<p>{league.teams.get(fixture.home).ground}</p>
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