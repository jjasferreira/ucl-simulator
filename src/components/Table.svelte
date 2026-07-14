<script>
  import check from "@lib/icon/check.svg?raw";
  import minus from "@lib/icon/minus.svg?raw";
  import x from "@lib/icon/x.svg?raw";

  let { table, teams, matches } = $props();
</script>

<section class="flex w-full py-1 overflow-x-auto sm:w-auto">
  <!-- Fixed Column -->
  <table class="shadow-[4px_0_8px_rgba(0,0,0,0.1)]">
    <thead>
      <tr class="text-sm text-opacity-50 font-champions-light text-blue-50">
        <th class="pb-1 px-3 min-w-48.75 text-start">Club</th>
      </tr>
    </thead>
    <tbody>
      {#each table as teamid, i}
        {@const team = teams.get(teamid)}
        <tr
          class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35 cursor-pointer hover:bg-blue-800 transition-colors
							border-l-[4.5px] {i < 8
            ? 'border-cyan'
            : i < 24
              ? 'border-yellow'
              : 'border-red'}"
          onclick={() => showTeamModal(team.id)}
        >
          <td class="py-2">
            <div class="flex h-6 px-3">
              <div class="flex items-center justify-start w-7">
                <p>{i + 1}</p>
              </div>
              <div class="flex justify-center w-6">
                <img class="h-full" src="team/{team.id}.svg" alt={team.name} />
              </div>
              <p class="flex items-center ml-2">{team.name}</p>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <!-- Scrollable Columns -->
  <div class="overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
    <table class="h-full min-w-full">
      <thead>
        <tr class="text-sm text-opacity-50 font-champions-light text-blue-50">
          <th class="pb-1 pl-2 text-center min-w-10">MP</th>
          <th class="pb-1 text-center min-w-8">W</th>
          <th class="pb-1 text-center min-w-8">D</th>
          <th class="pb-1 text-center min-w-8">L</th>
          <th class="pb-1 text-center min-w-8 font-champions-regular">Pts</th>
          <th class="pb-1 text-center min-w-8">GF</th>
          <th class="pb-1 text-center min-w-8">GA</th>
          <th class="pb-1 text-center min-w-8">GD</th>
          <th class="pb-1 pr-2 text-center min-w-24">Performance</th>
        </tr>
      </thead>
      <tbody>
        {#each table as teamid}
          {@const team = teams.get(teamid)}
          <tr
            class="h-full transition-colors cursor-pointer odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35 hover:bg-blue-800"
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
            <td class="flex items-center h-full pl-2 pr-4 gap-px">
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
                <div class="flex flex-col justify-center items-center">
                  <div
                    class="relative flex items-center justify-center w-3.75 h-3.75 {result ===
                    'W'
                      ? 'text-green'
                      : result === 'L'
                        ? 'text-red'
                        : 'text-silver'}
                      {i === team.matchesPlayed - 1
                      ? 'w-4.5 h-4.5'
                      : 'w-3.75 h-3.75'}"
                  >
                    <div
                      class="absolute w-3/5 h-3/5 rounded-full bg-dark-blue"
                    ></div>
                    <span class="absolute inset-0">
                      {#if result === "W"}
                        {@html check}
                      {:else if result === "L"}
                        {@html x}
                      {:else}
                        {@html minus}
                      {/if}
                    </span>
                  </div>
                  {#if i === team.matchesPlayed - 1}
                    <div
                      class="w-3/4 h-0.5 rounded-full {result === 'W'
                        ? 'bg-green'
                        : result === 'L'
                          ? 'bg-red'
                          : 'bg-silver'}"
                    ></div>
                  {/if}
                </div>
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
