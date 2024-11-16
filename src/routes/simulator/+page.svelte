<script>
	import { League } from './league.js';
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';

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
	}

	async function playMatchweek(week) {
		league.playMatchweek(week);
		league.matchweekPlayed[week - 1] = true;
		//console.log("LEAGUE", league);
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
			  	{#each pot as teamid}
					<div class="flex h-12 p-2 border-b-2 border-x-2">
						<div class="flex w-8 justify-center">
							<img class="h-full" src={`${base}/images/teams/${teamid}.svg`} alt="Logo"/>
						</div>
						<p class="flex ml-2 items-center">{league.teams.get(teamid).name}</p>
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
					{#each pot as teamid}
					<tr class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35">
						<td class="w-48 py-2">
							<div class="flex h-6 px-3">
								<div class="flex w-6 justify-center">
									<img class="h-full" src={`${base}/images/teams/${teamid}.svg`} alt="Logo"/>
								</div>
								<p class="flex ml-2 items-center">{league.teams.get(teamid).name}</p>
							</div>
						</td>
						{#each league.teams.get(teamid).fixtures as fixture}
						<td class="py-2">
							<div class="flex h-6 px-3 border-l-2 border-blue-600 border-opacity-35 relative">
								<div class="flex w-6 justify-center">
									<img class="h-full" src={`${base}/images/teams/${fixture.id}.svg`} alt={league.teams.get(fixture.id).name}/>
								</div>
								<p class="flex ml-2 items-center">{fixture.id}</p>
								{#if fixturesScheduled}
								<div in:fade={{duration: 1000}} class="w-3 h-3 flex items-center justify-center absolute bottom-0 left-7 bg-blue-700 rounded-full" style="font-size: 0.625rem; line-height: 0.875rem">
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
			{#if !league.matchweekPlayed[w]}
				<button class="h-30 mb-6 text-lg" on:click={() => playMatchweek(w + 1)}>▶ Play</button>
			{:else}
				<button class="h-30 mb-6 text-lg" disabled on:click={() => playMatchweek(w + 1)}>▶ Play</button>
			{/if}
			<div class="mb-12 grid gap-x-16 gap-y-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
			{#each week as fixture, f}
				<div>
					<div class="flex justify-center h-6 pt-2 space-x-1 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full">
						<div class="w-4 flex overflow-hidden rounded-full">
							<img class="object-cover" src={`/images/countries/${league.teams.get(fixture.home).country}.svg`} alt={league.teams.get(fixture.home).country}>
						</div>
						<p class="text-xs pt-px">{league.teams.get(fixture.home).ground}</p>
					</div>
					<div class="h-16 flex font-champions-display text-2xl bg-blue-900 bg-opacity-35">
						<div class="w-16 p-2 flex justify-center rounded-tr-full rounded-bl-3xl" style="background-color: {league.teams.get(fixture.home).color}">
							<img class="h-full" src={`${base}/images/teams/${fixture.home}.svg`} alt={league.teams.get(fixture.home).name}>
						</div>
						<div class="w-16 py-3">
							<div class="h-full flex justify-center border-r border-blue-600 border-opacity-35">
								{#if league.matchweekPlayed[w]}
									<h3 in:fade={{duration: 1000, delay: f * 750}}>{league.teams.get(fixture.home).fixtures.find(f => f.id === fixture.away).result[0]}</h3>
								{/if}
							</div>
						</div>
						<div class="w-16 py-3">
							<div class="h-full flex justify-center border-l border-blue-600 border-opacity-35">
								{#if league.matchweekPlayed[w]}
									<h3 in:fade={{duration: 1000, delay: f * 750}}>{league.teams.get(fixture.home).fixtures.find(f => f.id === fixture.away).result[1]}</h3>
								{/if}
							</div>
						</div>
						<div class="w-16 p-2 flex justify-center rounded-tl-full" style="background-color: {league.teams.get(fixture.away).color}">
							<img class="h-full" src={`${base}/images/teams/${fixture.away}.svg`} alt={league.teams.get(fixture.away).name}>
						</div>
					</div>
					<!--
					<div class="flex justify-between h-6 py-1 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full">
					</div>
					-->
				</div>
			{/each}
			</div>
		{/each}
	{/if}
</main>