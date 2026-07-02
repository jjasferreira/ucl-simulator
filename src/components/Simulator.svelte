<script>
  import { League } from "@lib/league.js";
  import { onMount } from "svelte";
  import teamsJson from "@content/teams.json";
  import TeamModal from "@components/Team.svelte";

  let teamsPath = "teams.json";
  let league;
  let fixturesGenerated = false;
  let fixturesScheduled = false;
  let knockoutGenerated = false;
  let tab = "about";
  let tabMatchweek = 1;
  let teamModal = null;
  const kopo = [
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
  const ro16 = [
    [[], [1, 2]],
    [[], [7, 8]],
    [[], [5, 6]],
    [[], [3, 4]],
    [[], [2, 1]],
    [[], [8, 7]],
    [[], [6, 5]],
    [[], [4, 3]],
  ];

  onMount(() => {
    league = new League(teamsJson);
    league.initializeTable();
    league.generatePots();
    console.log(league.table[20]);
  });

  async function generateFixtures() {
    await league.generateFixtures();
    fixturesGenerated = true;
    console.log(league);
  }

  async function scheduleFixtures() {
    league.scheduleFixtures();
    fixturesScheduled = true;
    console.log(league);
  }

  async function playMatchweek(week) {
    league.playMatchweek(week);
    league.round = week;
    console.log(league);
  }

  function showTeamModal(id) {
    teamModal = id;
    /*pushState("", {
      showTeamModal: true,
    });*/
  }

  async function generateKnockout() {
    league.generateKnockout();
    knockoutGenerated = true;
  }
</script>

<main class="flex flex-col items-center">
  <div
    class="h-11 px-3 py-1.5 max-w-full overflow-x-auto whitespace-nowrap scrollbar-hide flex space-x-1.5 font-champions-bold text-lg"
  >
    <button
      class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !==
      'about'
        ? 'border-opacity-0'
        : 'border-opacity-100'}"
      onclick={() => (tab = "about")}>About</button
    >
    <button
      class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !==
      'pots'
        ? 'border-opacity-0'
        : 'border-opacity-100'}"
      onclick={() => (tab = "pots")}>Pots</button
    >
    <button
      class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !==
      'fixtures'
        ? 'border-opacity-0'
        : 'border-opacity-100'}"
      onclick={() => (tab = "fixtures")}>Fixtures</button
    >
    <button
      class="{!fixturesGenerated
        ? 'bg-gray-700'
        : 'bg-blue-900 hover:bg-blue-800'} border-2 border-blue-50 {tab !==
      'matches'
        ? 'border-opacity-0'
        : 'border-opacity-100'}"
      onclick={() => {
        if (fixturesGenerated) {
          tab = "matches";
        }
      }}>Matches</button
    >
    <button
      class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !==
      'table'
        ? 'border-opacity-0'
        : 'border-opacity-100'}"
      onclick={() => (tab = "table")}>Table</button
    >
    <button
      class="bg-blue-900 hover:bg-blue-800 border-2 border-blue-50 {tab !==
      'knockout'
        ? 'border-opacity-0'
        : 'border-opacity-100'}"
      onclick={() => (tab = "knockout")}>Knockout</button
    >
  </div>

  {#if tab === "about"}
    <div class="px-3 py-1.5">
      <p>2024/25 season</p>
    </div>
  {/if}

  {#if tab === "pots"}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each league.pots as pot, p}
        <div class="m-4">
          <h3 class="flex justify-center">Pot {p + 1}</h3>
          {#each pot as teamid, t}
            <div
              class="flex h-12 p-2 border-x-2
			{t === 0
                ? 'border-t-2 border-b rounded-tl-3xl rounded-tr-3xl'
                : t < 8
                  ? 'border-y'
                  : 'border-t border-b-2 rounded-bl-3xl rounded-br-3xl'} "
            >
              <div class="flex w-8 justify-center">
                <img
                  class="h-full"
                  src={`/images/teams/${teamid}.svg`}
                  alt={teamid}
                />
              </div>
              <p class="flex ml-2 items-center">
                {league.teams.get(teamid).name}
              </p>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

  {#if tab === "fixtures"}
    {#if !fixturesGenerated}
      <button
        class="m-5 h-8 bg-white font-champions-bold text-lg text-blue-900"
        onclick={generateFixtures}>Generate Fixtures</button
      >
    {:else}
      {#each league.pots as pot, p}
        <h3>Pot {p + 1} Fixtures</h3>
        <div class="max-w-full overflow-x-auto">
          <table class="mb-5">
            <thead>
              <tr>
                <th></th>
                <th colspan="2" class="font-normal">POT 1</th>
                <th colspan="2" class="font-normal">POT 2</th>
                <th colspan="2" class="font-normal">POT 3</th>
                <th colspan="2" class="font-normal">POT 4</th>
              </tr>
              <tr class="text-sm">
                <th></th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl"
                    >
                      HOME
                    </div>
                  </div>
                </th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl"
                    >
                      AWAY
                    </div>
                  </div>
                </th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl"
                    >
                      HOME
                    </div>
                  </div>
                </th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl"
                    >
                      AWAY
                    </div>
                  </div>
                </th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl"
                    >
                      HOME
                    </div>
                  </div>
                </th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl"
                    >
                      AWAY
                    </div>
                  </div>
                </th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-auto mr-2 mb-1 px-3 pt-0.5 bg-blue-600 rounded-xl"
                    >
                      HOME
                    </div>
                  </div>
                </th>
                <th class="font-normal">
                  <div class="flex">
                    <div
                      class="ml-2 mr-auto mb-1 px-3 pt-0.5 bg-blue-900 rounded-xl"
                    >
                      AWAY
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {#each pot as teamid}
                {@const team = league.teams.get(teamid)}
                <tr
                  class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35"
                >
                  <td class="w-48 py-2">
                    <div class="flex h-6 px-3">
                      <div class="flex w-6 justify-center">
                        <img
                          class="h-full"
                          src={`/images/teams/${team.id}.svg`}
                          alt={team.name}
                        />
                      </div>
                      <p class="flex ml-2 items-center">{team.name}</p>
                    </div>
                  </td>
                  {#each team.matches
                    .map((matchid) => league.matches.get(matchid))
                    .sort((a, b) => {
                      const aPot = team.id === a.home ? league.teams.get(a.away).pot : league.teams.get(a.home).pot;
                      const bPot = team.id === b.home ? league.teams.get(b.away).pot : league.teams.get(b.home).pot;
                      if (aPot === bPot) {
                        return team.id === a.home ? -1 : 1;
                      }
                      return aPot - bPot;
                    }) as match}
                    {@const opponent =
                      team.id === match.home
                        ? league.teams.get(match.away)
                        : league.teams.get(match.home)}
                    <td class="py-2">
                      <div
                        class="flex h-6 px-3 border-l-2 border-blue-600 border-opacity-35 relative"
                      >
                        <div class="flex w-6 justify-center">
                          <img
                            class="h-full"
                            src={`/images/teams/${opponent.id}.svg`}
                            alt={opponent.name}
                          />
                        </div>
                        <p class="flex ml-2 items-center">{opponent.id}</p>
                        {#if fixturesScheduled}
                          <div
                            class="w-3 h-3 flex items-center justify-center absolute bottom-0 left-7 bg-blue-700 rounded-full"
                            style="font-size: 0.625rem; line-height: 0.875rem"
                          >
                            {match.round}
                          </div>
                        {/if}
                      </div>
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/each}
    {/if}
  {/if}

  {#if tab === "matches"}
    {#if !fixturesScheduled}
      <button
        class="m-5 h-8 bg-white font-champions-bold text-lg text-blue-900"
        onclick={scheduleFixtures}>Schedule Fixtures</button
      >
    {:else}
      <div
        class="px-3 py-1.5 max-w-full overflow-x-auto whitespace-nowrap scrollbar-hide flex space-x-1.5"
      >
        {#each Array(8) as _, i}
          <button
            class="border-2 border-blue-50 {tabMatchweek !== i + 1
              ? 'border-opacity-0'
              : 'border-opacity-100'}
							  {league.round >= i + 1
              ? 'bg-green-700 hover:bg-green-600'
              : 'bg-blue-900 hover:bg-blue-800'}"
            onclick={() => (tabMatchweek = i + 1)}
          >
            MW{i + 1}
          </button>
        {/each}
      </div>
      <h3>Matchweek {tabMatchweek}</h3>
      {#if league.round == tabMatchweek - 1}
        <button
          class="mb-6 pl-3 h-8 bg-white font-champions-bold text-lg text-blue-900"
          onclick={() => playMatchweek(tabMatchweek)}>▶</button
        >
      {:else}
        <button
          class="mb-6 pl-3 h-8 bg-gray-700 font-champions-bold text-lg"
          disabled
          onclick={() => playMatchweek(tabMatchweek)}>▶</button
        >
      {/if}
      <div
        class="mb-12 grid gap-x-16 gap-y-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
      >
        {#each league.rounds[tabMatchweek - 1] as matchid, i}
          {@const match = league.matches.get(matchid)}
          {@const home = league.teams.get(match.home)}
          {@const away = league.teams.get(match.away)}
          <div>
            <div
              class="flex justify-center h-6 pt-2 space-x-1 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
            >
              <div class="w-4 flex overflow-hidden rounded-full">
                <img
                  class="object-cover"
                  src={`/images/countries/${home.country}.svg`}
                  alt={home.country}
                />
              </div>
              <a
                class="text-xs hover:underline"
                href={`https://www.google.com/search?q=${home.ground}`}
                target="_blank">{home.ground}</a
              >
            </div>
            <div
              class="h-16 flex font-champions-display text-2xl bg-blue-900 bg-opacity-35"
            >
              <div
                class="w-16 p-2 flex justify-center rounded-tr-full rounded-bl-3xl"
                style="background-color: {home.color}"
              >
                <img
                  class="h-full"
                  src={`/images/teams/${home.id}.svg`}
                  alt={home.name}
                />
              </div>
              <div class="w-16 py-3">
                <div
                  class="h-full flex justify-center border-r border-blue-600 border-opacity-35"
                >
                  {#if league.round == tabMatchweek}
                    <h3>{match.homeGoals}</h3>
                  {/if}
                </div>
              </div>
              <div class="w-16 py-3">
                <div
                  class="h-full flex justify-center border-l border-blue-600 border-opacity-35"
                >
                  {#if league.round == tabMatchweek}
                    <h3>{match.awayGoals}</h3>
                  {/if}
                </div>
              </div>
              <div
                class="w-16 p-2 flex justify-center rounded-tl-full"
                style="background-color: {away.color}"
              >
                <img
                  class="h-full"
                  src={`/images/teams/${away.id}.svg`}
                  alt={away.name}
                />
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}

  {#if tab === "table"}
    <div class="flex w-full overflow-x-auto sm:w-auto">
      <!-- Fixed Column -->
      <table class="shadow-[4px_0_8px_rgba(0,0,0,0.1)]">
        <thead>
          <tr class="font-champions-light text-sm text-blue-50 text-opacity-50">
            <th class="pb-1 px-3 min-w-48.75 text-start">Club</th>
          </tr>
        </thead>
        <tbody>
          {#each league.table as teamid, i}
            {@const team = league.teams.get(teamid)}
            <tr
              class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35 cursor-pointer hover:bg-blue-800 transition-colors
							border-l-4 {i < 8
                ? 'border-cyan-400'
                : i < 24
                  ? 'border-yellow-500'
                  : 'border-red-600'}"
              onclick={() => showTeamModal(team.id)}
            >
              <td class="py-2">
                <div class="flex h-6 px-3">
                  <div class="w-7 flex justify-start items-center">
                    <p>{i + 1}</p>
                  </div>
                  <div class="flex w-6 justify-center">
                    <img
                      class="h-full"
                      src={`/images/teams/${team.id}.svg`}
                      alt={team.name}
                    />
                  </div>
                  <p class="flex ml-2 items-center">{team.name}</p>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <!-- Scrollable Columns -->
      <div class="overflow-x-auto">
        <table class="min-w-full h-full">
          <thead>
            <tr
              class="font-champions-light text-sm text-blue-50 text-opacity-50"
            >
              <th class="pb-1 pl-2 min-w-10 text-center">MP</th>
              <th class="pb-1 min-w-8 text-center">W</th>
              <th class="pb-1 min-w-8 text-center">D</th>
              <th class="pb-1 min-w-8 text-center">L</th>
              <th class="pb-1 min-w-8 text-center font-champions-regular"
                >Pts</th
              >
              <th class="pb-1 min-w-8 text-center">GF</th>
              <th class="pb-1 min-w-8 text-center">GA</th>
              <th class="pb-1 min-w-8 text-center">GD</th>
              <th class="pb-1 pr-2 min-w-24 text-center">Performance</th>
            </tr>
          </thead>
          <tbody>
            {#each league.table as teamid}
              {@const team = league.teams.get(teamid)}
              <tr
                class="h-full odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35 cursor-pointer hover:bg-blue-800 transition-colors"
              >
                <td class="py-2 pl-2 text-center">{team.matchesPlayed}</td>
                <td class="py-2 text-center">{team.wins}</td>
                <td class="py-2 text-center">{team.draws}</td>
                <td class="py-2 text-center">{team.losses}</td>
                <td class="py-2 text-center font-champions-bold"
                  >{team.points}</td
                >
                <td class="py-2 text-center">{team.goalsFor}</td>
                <td class="py-2 text-center">{team.goalsAgainst}</td>
                <td class="py-2 text-center"
                  >{team.goalsFor - team.goalsAgainst}</td
                >
                <td class="pl-2 pr-4 h-full flex items-center space-x-1">
                  {#each team.matches
                    .map((matchid) => league.matches.get(matchid))
                    .filter((m) => m.played)
                    .sort((a, b) => a.round - b.round) as m, i}
                    {@const result =
                      m.homeGoals === m.awayGoals
                        ? "D"
                        : (team.id === m.home) & (m.homeGoals > m.awayGoals) ||
                            (team.id === m.away) & (m.awayGoals > m.homeGoals)
                          ? "W"
                          : "L"}
                    <div
                      class="rounded-full {result === 'W'
                        ? 'bg-green-500'
                        : result === 'L'
                          ? 'bg-red-500'
                          : 'bg-gray-400'} {i === team.matchesPlayed - 1
                        ? 'w-4 h-4 border border-white'
                        : 'w-3.25 h-3.25'}"
                    >
                      <img
                        src={`/images/icons/${result === "W" ? "check" : result === "L" ? "x" : "minus"}.svg`}
                        alt="outcome"
                      />
                    </div>
                  {/each}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}

  {#if tab === "knockout"}
    {#if !knockoutGenerated}
      <button class="m-5" onclick={generateKnockout}>Draw Knockout</button>
    {/if}
    <div class="mb-12 px-3 py-1.5 max-w-full overflow-x-auto">
      <div class="flex">
        <!-- KO Play-offs -->
        <div class="flex flex-col space-y-10">
          <div
            class="m-auto px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap"
          >
            KO PLAY-OFFS
          </div>
          {#each Array(8) as _, i}
            {@const team1 = league.teams.get(league.table[kopo[i][0][0] - 1])}
            {@const team2 = league.teams.get(league.table[kopo[i][0][1] - 1])}
            {@const team3 = league.teams.get(league.table[kopo[i][1][0] - 1])}
            {@const team4 = league.teams.get(league.table[kopo[i][1][1] - 1])}
            <div class="flex items-center">
              <div class="w-64">
                <div
                  class="h-6 justify-between flex bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
                ></div>
                <div class="h-16 flex bg-blue-900 bg-opacity-35">
                  <div
                    class="w-32 flex flex-col items-center border-r border-blue-600 border-opacity-35"
                  >
                    <div class="h-8 flex">
                      <div
                        class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-900"
                      >
                        {kopo[i][0][0]}
                      </div>
                      <div
                        class="w-4 flex justify-center items-center font-champions-light text-3xl text-blue-600 text-opacity-35"
                      >
                        /
                      </div>
                      <div
                        class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-900"
                      >
                        {kopo[i][0][1]}
                      </div>
                    </div>
                    <div class="h-8 flex space-x-4">
                      <div class="w-8 p-1 flex justify-center">
                        <img
                          class="h-full"
                          src={`/images/teams/${team1.id}.svg`}
                          alt={team1.name}
                        />
                      </div>
                      <div class="w-8 p-1 flex justify-center">
                        <img
                          class="h-full"
                          src={`/images/teams/${team2.id}.svg`}
                          alt={team2.name}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-32 flex flex-col items-center border-l border-blue-600 border-opacity-35"
                  >
                    <div class="h-8 flex">
                      <div
                        class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-800"
                      >
                        {kopo[i][1][0]}
                      </div>
                      <div
                        class="w-4 flex justify-center items-center font-champions-light text-3xl text-blue-600 text-opacity-35"
                      >
                        /
                      </div>
                      <div
                        class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-800"
                      >
                        {kopo[i][1][1]}
                      </div>
                    </div>
                    <div class="h-8 flex space-x-4">
                      <div class="w-8 p-1 flex justify-center">
                        <img
                          class="h-full"
                          src={`/images/teams/${team3.id}.svg`}
                          alt={team3.name}
                        />
                      </div>
                      <div class="w-8 p-1 flex justify-center">
                        <img
                          class="h-full"
                          src={`/images/teams/${team4.id}.svg`}
                          alt={team4.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
                ></div>
              </div>
              <div class="w-10 h-0.5 bg-blue-900"></div>
            </div>
          {/each}
        </div>
        <!-- Round of 16 -->
        <div class="flex flex-col space-y-10">
          <div
            class="m-auto px-3 pt-0.5 bg-blue-900 rounded-xl text-sm whitespace-nowrap"
          >
            ROUND OF 16
          </div>
          {#each Array(8) as _, i}
            {@const team3 = league.teams.get(league.table[ro16[i][1][0] - 1])}
            {@const team4 = league.teams.get(league.table[ro16[i][1][1] - 1])}
            <div class="flex items-center">
              <div class="w-10 h-0.5 bg-blue-900"></div>
              <div class="w-64">
                <div
                  class="h-6 justify-between flex bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
                ></div>
                <div class="h-16 flex bg-blue-900 bg-opacity-35">
                  <div
                    class="w-32 text-center flex items-center border-r border-blue-600 border-opacity-35"
                  >
                    KO PLAY-OFFS WINNER
                  </div>
                  <div
                    class="w-32 flex flex-col items-center border-l border-blue-600 border-opacity-35"
                  >
                    <div class="h-8 flex">
                      <div
                        class="w-8 flex justify-center items-center font-champions-bold text-xl bg-cyan-400 text-blue-900"
                      >
                        {ro16[i][1][0]}
                      </div>
                      <div
                        class="w-4 flex justify-center items-center font-champions-light text-3xl text-blue-600 text-opacity-35"
                      >
                        /
                      </div>
                      <div
                        class="w-8 flex justify-center items-center font-champions-bold text-xl bg-cyan-400 text-blue-900"
                      >
                        {ro16[i][1][1]}
                      </div>
                    </div>
                    <div class="h-8 flex space-x-4">
                      <div class="w-8 p-1 flex justify-center">
                        <img
                          class="h-full"
                          src={`/images/teams/${team3.id}.svg`}
                          alt={team3.name}
                        />
                      </div>
                      <div class="w-8 p-1 flex justify-center">
                        <img
                          class="h-full"
                          src={`/images/teams/${team4.id}.svg`}
                          alt={team4.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
                ></div>
              </div>
              <div class="w-10 h-0.5 bg-blue-900"></div>
            </div>
          {/each}
        </div>
        <!-- Quarter-finals -->
        <div class="flex flex-col space-y-10">
          <div
            class="px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap"
          >
            QUARTER-FINALS
          </div>
          <div class="flex flex-col justify-between h-full py-14">
            {#each Array(4) as _}
              <div class="flex items-center">
                <div class="w-0.5 h-38 bg-blue-900"></div>
                <div class="w-10 h-0.5 bg-blue-900"></div>
                <div class="w-64">
                  <div
                    class="h-6 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
                  ></div>
                  <div class="h-16 bg-blue-900 bg-opacity-35 text-center">
                    <p>Match</p>
                  </div>
                  <div
                    class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
                  ></div>
                </div>
                <div class="w-10 h-0.5 bg-blue-900"></div>
              </div>
            {/each}
          </div>
        </div>
        <!-- Semi-finals -->
        <div class="flex flex-col space-y-10">
          <div
            class="px-3 pt-0.5 bg-blue-900 rounded-xl text-sm whitespace-nowrap"
          >
            SEMI-FINALS
          </div>
          <div class="flex flex-col h-full justify-between py-33">
            {#each Array(2) as _}
              <div class="flex items-center">
                <div class="w-0.5 h-76 bg-blue-900"></div>
                <div class="w-10 h-0.5 bg-blue-900"></div>
                <div class="w-64">
                  <div
                    class="h-6 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
                  ></div>
                  <div class="h-16 bg-blue-900 bg-opacity-35 text-center">
                    <p>Match</p>
                  </div>
                  <div
                    class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
                  ></div>
                </div>
                <div class="w-10 h-0.5 bg-blue-900"></div>
              </div>
            {/each}
          </div>
        </div>
        <!-- Final -->
        <div class="flex flex-col space-y-10">
          <div
            class="px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap"
          >
            FINAL
          </div>
          <div class="flex h-full justify-center">
            <div class="flex items-center">
              <div class="w-0.5 h-152 bg-blue-900"></div>
              <div class="w-10 h-0.5 bg-blue-900"></div>
              <div class="w-64">
                <div
                  class="h-6 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
                ></div>
                <div class="h-16 bg-blue-900 bg-opacity-35 text-center">
                  <p>Match</p>
                </div>
                <div
                  class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!--
  <!{#if page.state.showTeamModal}
    <TeamModal
      id={teamModal}
      {league}
      close={() => {
        history.back();
      }}
    />
  {/if}
  -->
</main>
