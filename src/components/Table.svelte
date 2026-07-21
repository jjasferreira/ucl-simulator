<script>
  import check from "@assets/icons/check.svg?raw";
  import minus from "@assets/icons/minus.svg?raw";
  import x from "@assets/icons/x.svg?raw";

  let { table, teams, matches } = $props();
</script>

<section class="flex w-full py-1 overflow-x-auto sm:w-auto">
  <!-- Fixed Column -->
  <table>
    <thead>
      <tr class="text-sm uel:text-[13px] uel:text-black">
        <th class="pb-1 px-3 min-w-48.75 text-start">Club</th>
      </tr>
    </thead>
    <tbody>
      {#each table as teamid, i}
        {@const team = teams.get(teamid)}
        <tr
          class="cursor-pointer transition-colors
               odd:bg-ucl-navy/33 even:bg-ucl-blue/33 hover:bg-ucl-blue
               uel:odd:bg-black/90 uel:even:bg-neutral-900/90 uel:hover:bg-uel-orange
							border-l-5 {i < 8
            ? 'border-ucl-cyan'
            : i < 24
              ? 'border-ucl-yellow'
              : 'border-ucl-red'}"
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
        <tr class="text-sm uel:text-[13px] uel:text-black">
          <th class="pb-1 pl-2 text-center min-w-10">MP</th>
          <th class="pb-1 text-center min-w-8">W</th>
          <th class="pb-1 text-center min-w-8">D</th>
          <th class="pb-1 text-center min-w-8">L</th>
          <th class="pb-1 font-extrabold text-center min-w-8">Pts</th>
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
            class="h-10 transition-colors cursor-pointer odd:bg-ucl-navy/33 even:bg-ucl-blue/33 hover:bg-ucl-blue uel:odd:bg-black/90 uel:even:bg-neutral-900/90 uel:hover:bg-uel-orange"
          >
            <td class="py-2 pl-2 text-center">{team.matchesPlayed}</td>
            <td class="py-2 text-center">{team.wins}</td>
            <td class="py-2 text-center">{team.draws}</td>
            <td class="py-2 text-center">{team.losses}</td>
            <td class="py-2 font-bold text-center">{team.points}</td>
            <td class="py-2 text-center">{team.goalsFor}</td>
            <td class="py-2 text-center">{team.goalsAgainst}</td>
            <td class="py-2 text-center">{team.goalsFor - team.goalsAgainst}</td
            >
            <td class="flex items-center h-full gap-px pl-2 pr-4">
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
                <div class="flex flex-col items-center justify-center">
                  <div
                    class="relative flex items-center justify-center w-3.75 h-3.75 {result ===
                    'W'
                      ? 'text-ucl-green'
                      : result === 'L'
                        ? 'text-ucl-red'
                        : 'text-ucl-silver'}
                      {i === team.matchesPlayed - 1
                      ? 'w-4.5 h-4.5'
                      : 'w-3.75 h-3.75'}"
                  >
                    <div
                      class="absolute w-3/5 rounded-full h-3/5 bg-ucl-navy"
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
                        ? 'bg-ucl-green'
                        : result === 'L'
                          ? 'bg-ucl-red'
                          : 'bg-ucl-silver'}"
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
