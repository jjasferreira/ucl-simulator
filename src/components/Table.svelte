<script>
  let { table, teams, matches } = $props();
</script>

<section class="flex w-full overflow-x-auto sm:w-auto py-1">
  <!-- Fixed Column -->
  <table class="shadow-[4px_0_8px_rgba(0,0,0,0.1)]">
    <thead>
      <tr class="font-champions-light text-sm text-blue-50 text-opacity-50">
        <th class="pb-1 px-3 min-w-48.75 text-start">Club</th>
      </tr>
    </thead>
    <tbody>
      {#each table as teamid, i}
        {@const team = teams.get(teamid)}
        <tr
          class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35 cursor-pointer hover:bg-blue-800 transition-colors
							border-l-4 {i < 8 ? 'border-cyan' : i < 24 ? 'border-yellow' : 'border-red'}"
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
                  src="images/teams/{team.id}.svg"
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
  <div class="overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
    <table class="min-w-full h-full">
      <thead>
        <tr class="font-champions-light text-sm text-blue-50 text-opacity-50">
          <th class="pb-1 pl-2 min-w-10 text-center">MP</th>
          <th class="pb-1 min-w-8 text-center">W</th>
          <th class="pb-1 min-w-8 text-center">D</th>
          <th class="pb-1 min-w-8 text-center">L</th>
          <th class="pb-1 min-w-8 text-center font-champions-regular">Pts</th>
          <th class="pb-1 min-w-8 text-center">GF</th>
          <th class="pb-1 min-w-8 text-center">GA</th>
          <th class="pb-1 min-w-8 text-center">GD</th>
          <th class="pb-1 pr-2 min-w-24 text-center">Performance</th>
        </tr>
      </thead>
      <tbody>
        {#each table as teamid}
          {@const team = teams.get(teamid)}
          <tr
            class="h-full odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35 cursor-pointer hover:bg-blue-800 transition-colors"
          >
            <td class="py-2 pl-2 text-center">{team.matchesPlayed}</td>
            <td class="py-2 text-center">{team.wins}</td>
            <td class="py-2 text-center">{team.draws}</td>
            <td class="py-2 text-center">{team.losses}</td>
            <td class="py-2 text-center font-champions-bold">{team.points}</td>
            <td class="py-2 text-center">{team.goalsFor}</td>
            <td class="py-2 text-center">{team.goalsAgainst}</td>
            <td class="py-2 text-center">{team.goalsFor - team.goalsAgainst}</td
            >
            <td class="pl-2 pr-4 h-full flex items-center space-x-1">
              {#each team.matches
                .map((matchid) => matches.get(matchid))
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
                    src="images/icons/{result === 'W'
                      ? 'check'
                      : result === 'L'
                        ? 'x'
                        : 'minus'}.svg"
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
</section>
