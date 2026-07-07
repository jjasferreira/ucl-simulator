<script>
  let { tabMatchweek, rounds, matches, teams, round } = $props();
</script>

<section>
  <div
    class="mt-4 mb-16 grid gap-x-16 gap-y-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
  >
    {#each rounds[tabMatchweek - 1] as matchid, i}
      {@const match = matches.get(matchid)}
      {@const home = teams.get(match.home)}
      {@const away = teams.get(match.away)}
      <div>
        <div
          class="flex justify-center h-6 pt-2 space-x-1 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
        >
          <div class="w-4 flex overflow-hidden rounded-full">
            <img
              class="object-cover"
              src="images/countries/{home.country}.svg"
              alt={home.country}
            />
          </div>
          <a
            class="text-xs hover:underline"
            href="https://www.google.com/search?q={home.ground}"
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
              src="images/teams/{home.id}.svg"
              alt={home.name}
            />
          </div>
          <div class="w-16 py-3">
            <div
              class="h-full flex justify-center border-r border-blue-600 border-opacity-35"
            >
              {#if tabMatchweek <= round}
                <h3>{match.homeGoals}</h3>
              {/if}
            </div>
          </div>
          <div class="w-16 py-3">
            <div
              class="h-full flex justify-center border-l border-blue-600 border-opacity-35"
            >
              {#if tabMatchweek <= round}
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
              src="images/teams/{away.id}.svg"
              alt={away.name}
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
