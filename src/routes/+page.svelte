<script>
	import { League } from '$lib/league.js';
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let teamsPath = '/teams.json';
	let league = new League(teamsPath);
	let fixturesGenerated = false;
	let fixturesScheduled = false;
	let tab = "about";

	onMount(async () => {
		await league.loadTeams();
		league.initializeStandings();
		league.generatePots();
  	});

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
	}
</script>

<svelte:head>
	<title>UCL Simulator</title>
	<meta name="description" content="TODO"/>
</svelte:head>

<main class="flex flex-col items-center">

	<div class="px-3 py-1.5 max-w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
		<div class="flex space-x-1.5 font-champions-bold texl-lg">
			<button class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !== 'about' ? 'border-opacity-0' : 'border-opacity-100'}" on:click={() => tab = "about"}>About</button>
			<button class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !== 'pots' ? 'border-opacity-0' : 'border-opacity-100'}" on:click={() => tab = "pots"}>Pots</button>
			<button class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !== 'fixtures' ? 'border-opacity-0' : 'border-opacity-100'}" on:click={() => tab = "fixtures"}>Fixtures</button>
			<button class="{!fixturesGenerated ? 'bg-gray-700' : 'bg-blue-900 hover:bg-blue-800'} border-2 border-blue-50 {tab !== 'matchweeks' ? 'border-opacity-0' : 'border-opacity-100'}" on:click={() => {if (fixturesGenerated) {tab = "matchweeks"}}}>Matchweeks</button>
			<button class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !== 'standings' ? 'border-opacity-0' : 'border-opacity-100'}" on:click={() => tab = "standings"}>Standings</button>
			<button class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !== 'knockout' ? 'border-opacity-0' : 'border-opacity-100'}" on:click={() => tab = "knockout"}>Knock-out</button>
		</div>
	</div>

	{#if tab === "about"}
	<div class="px-3 py-1.5">
		<p>TODO App description</p>
	</div>
	{/if}

	{#if tab === "pots"}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each league.pots as pot, p}
		<div class="m-4">
			<h3 class="flex justify-center">Pot {p + 1}</h3>
			{#each pot as teamid, t}
			<div class="flex h-12 p-2 border-x-2
			{t === 0 ? 'border-t-2 border-b rounded-tl-3xl rounded-tr-3xl' : t < 8 ? 'border-y' : 'border-t border-b-2 rounded-bl-3xl rounded-br-3xl'} ">
				<div class="flex w-8 justify-center">
					<img class="h-full" src={`${base}/images/teams/${teamid}.svg`} alt={teamid}/>
				</div>
				<p class="flex ml-2 items-center">{league.teams.get(teamid).name}</p>
			</div>
			{/each}
		</div>
		{/each}
	</div>	
	{/if}

	{#if tab === "fixtures"}
	{#if !fixturesGenerated}
	<button class="m-5" on:click={generateFixtures}>Generate Fixtures</button>
	{:else}
	{#each league.pots as pot, p}
	<h3>Pot {p + 1} Fixtures</h3>
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
							<img class="h-full" src={`${base}/images/teams/${teamid}.svg`} alt={teamid}/>
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
	{/if}
	{/if}

	{#if tab === "matchweeks"}
	{#if !fixturesScheduled}
	<button class="m-5" on:click={scheduleFixtures}>Schedule Fixtures</button>
	{:else}
	{#each league.fixtures as week, w}
	<h3>Matchweek {w + 1}</h3>
	{#if !league.matchweekPlayed[w]}
	<button class="h-30 mb-6 text-lg" on:click={() => playMatchweek(w + 1)}>▶</button>
	{:else}
	<button class="h-30 mb-6 text-lg" disabled on:click={() => playMatchweek(w + 1)}>▶</button>
	{/if}
	<div class="mb-12 grid gap-x-16 gap-y-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
	{#each week as fixture, f}
	<div>
		<div class="flex justify-center h-6 pt-2 space-x-1 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full">
			<div class="w-4 flex overflow-hidden rounded-full">
				<img class="object-cover" src={`${base}/images/countries/${league.teams.get(fixture.home).country}.svg`} alt={league.teams.get(fixture.home).country}>
			</div>
			<a class="text-xs hover:underline" href={`https://www.google.com/search?q=${league.teams.get(fixture.home).ground}`} target="_blank">{league.teams.get(fixture.home).ground}</a>
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
	</div>
	{/each}
	</div>
	{/each}
	{/if}
	{/if}

	{#if tab === "standings"}
	<table class="mb-5 w-full sm:w-auto">
		<thead>
			<tr class="font-champions-light text-sm text-blue-50 text-opacity-50">
				<th>
					<div class="px-3 pb-1 flex justify-start">
						Club
					</div>
				</th>
				<th>
					<div class="w-8 pb-1 mx-auto flex justify-center">
						MP
					</div>
				</th>
				<th>
					<div class="w-8 pb-1 mx-auto flex justify-center">
						W
					</div>
				</th>
				<th>
					<div class="w-8 pb-1 mx-auto flex justify-center">
						D
					</div>
				</th>
				<th>
					<div class="w-8 pb-1 mx-auto flex justify-center">
						L
					</div>
				</th>
				<th class="hidden sm:table-cell">
					<div class="w-8 pb-1 mx-auto flex justify-center">
						GF
					</div>
				</th>
				<th class="hidden sm:table-cell">
					<div class="w-8 pb-1 mx-auto flex justify-center">
						GA
					</div>
				</th>
				<th class="hidden sm:table-cell">
					<div class="w-8 pb-1 mx-auto flex justify-center">
						GD
					</div>
				</th>
				<th>
					<div class="w-8 pb-1 mx-auto pr-2 flex justify-center">
						Pts
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each league.standings as teamid, t}
			<tr class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35 cursor-pointer hover:bg-blue-800 transition-colors
				border-l-4 {t < 8 ? 'border-cyan-400' : t < 24 ? 'border-yellow-500' : 'border-red-600'}"
				on:click={() => window.open(`https://www.google.com/search?q=${league.teams.get(teamid).name}`, '_blank')}>
				<td class="py-2">
					<div class="flex h-6 px-3">
						<div class="w-7 flex justify-start items-center">
							<p>{t + 1}</p>
						</div>
						<div class="flex w-6 justify-center">
							<img class="h-full" src={`${base}/images/teams/${teamid}.svg`} alt={teamid}/>
						</div>
						<p class="flex ml-2 items-center">{league.teams.get(teamid).name}</p>
					</div>
				</td>
				<td class="py-2 text-center">{league.teams.get(teamid).matchesPlayed}</td>
				<td class="py-2 text-center">{league.teams.get(teamid).wins}</td>
				<td class="py-2 text-center">{league.teams.get(teamid).draws}</td>
				<td class="py-2 text-center">{league.teams.get(teamid).losses}</td>
				<td class="py-2 text-center hidden sm:table-cell">{league.teams.get(teamid).goalsFor}</td>
				<td class="py-2 text-center hidden sm:table-cell">{league.teams.get(teamid).goalsAgainst}</td>
				<td class="py-2 text-center hidden sm:table-cell">{league.teams.get(teamid).goalsFor - league.teams.get(teamid).goalsAgainst}</td>
				<td class="py-2 pr-2 text-center font-champions-bold">{league.teams.get(teamid).points}</td>
			</tr>
			
			{/each}
		</tbody>
	</table>
	{/if}

	{#if tab === "knockout"}
	<div class="px-3 py-1.5">
		<p>Coming soon. This feature will be available in the future.</p>
	</div>
	{/if}
</main>