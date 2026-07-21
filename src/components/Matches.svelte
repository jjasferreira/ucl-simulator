<script>
  let { tabMatchweek, rounds, matches, teams, round } = $props();
</script>

<section>
  <div
    class="grid grid-cols-1 mt-4 mb-16 gap-x-16 gap-y-10 lg:grid-cols-2 xl:grid-cols-3"
  >
    {#each rounds[tabMatchweek - 1] as matchid, i}
      {@const match = matches.get(matchid)}
      {@const home = teams.get(match.home)}
      {@const away = teams.get(match.away)}
      <div>
        <div
          class="flex justify-center h-6 pt-2 space-x-1 rounded-tl-full rounded-tr-full bg-ucl-navy uel:bg-neutral-900 bg-opacity-35"
        >
          <div class="flex w-4 overflow-hidden rounded-full">
            <img
              class="object-cover"
              src="country/{home.country}.svg"
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
          class="flex h-16 text-2xl bg-ucl-navy uel:bg-neutral-900 font-champions-display"
        >
          <div
            class="flex justify-center w-16 p-2 rounded-tr-full rounded-bl-3xl"
            style="background-color: {home.primary}"
          >
            <img class="h-full" src="team/{home.id}.svg" alt={home.name} />
          </div>
          <div class="w-16 py-1.5 my-1.5">
            <div
              class="flex items-center justify-center h-full border-r border-ucl-blue uel:border-uel-orange"
            >
              {#if tabMatchweek <= round}
                <h3>{match.homeGoals}</h3>
              {/if}
            </div>
          </div>
          <div class="w-16 py-1.5 my-1.5">
            <div
              class="flex items-center justify-center h-full border-l border-ucl-blue uel:border-uel-orange"
            >
              {#if tabMatchweek <= round}
                <h3>{match.awayGoals}</h3>
              {/if}
            </div>
          </div>
          <div
            class="flex justify-center w-16 p-2 rounded-tl-full"
            style="background-color: {away.primary}"
          >
            <img class="h-full" src="team/{away.id}.svg" alt={away.name} />
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
