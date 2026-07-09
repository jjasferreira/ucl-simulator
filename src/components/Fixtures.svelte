<script>
  let { pots, teams, matches, scheduled } = $props();
</script>

<section>
  {#each pots as pot, p}
    <h3 class="text-center">Pot {p + 1} Fixtures</h3>
    <div class="flex max-w-full overflow-x-auto scrollbar-none">
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
            {@const team = teams.get(teamid)}
            <tr
              class="odd:bg-blue-950 odd:bg-opacity-35 even:bg-blue-900 even:bg-opacity-35"
            >
              <td class="w-48 py-2">
                <div class="flex h-6 px-3">
                  <div class="flex justify-center w-6">
                    <img
                      class="h-full"
                      src="team/{team.id}.svg"
                      alt={team.name}
                    />
                  </div>
                  <p class="flex items-center ml-2">{team.name}</p>
                </div>
              </td>
              {#each team.matches
                .map((matchid) => matches.get(matchid))
                .sort((a, b) => {
                  const aPot = team.id === a.home ? teams.get(a.away).pot : teams.get(a.home).pot;
                  const bPot = team.id === b.home ? teams.get(b.away).pot : teams.get(b.home).pot;
                  if (aPot === bPot) {
                    return team.id === a.home ? -1 : 1;
                  }
                  return aPot - bPot;
                }) as match}
                {@const opponent =
                  team.id === match.home
                    ? teams.get(match.away)
                    : teams.get(match.home)}
                <td class="py-2">
                  <div
                    class="relative flex h-6 px-3 border-l-2 border-blue-600 border-opacity-35"
                  >
                    <div class="flex justify-center w-6">
                      <img
                        class="h-full"
                        src="team/{opponent.id}.svg"
                        alt={opponent.name}
                      />
                    </div>
                    <p class="flex items-center ml-2">{opponent.id}</p>
                    {#if scheduled}
                      <div
                        class="absolute bottom-0 flex items-center justify-center w-3 h-3 bg-blue-700 rounded-full left-7"
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
</section>
