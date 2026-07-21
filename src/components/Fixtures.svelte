<script>
  import Team from "@components/Team.svelte";
  let { pots, teams, matches, scheduled, round } = $props();
  const potstyles = {
    "1": { border: "border-b-ucl-purple", bg: "bg-ucl-purple", text: "" },
    "2": {
      border: "border-b-ucl-cyan",
      bg: "bg-ucl-cyan",
      text: "text-ucl-navy",
    },
    "3": { border: "border-b-ucl-magenta", bg: "bg-ucl-magenta", text: "" },
    "4": {
      border: "border-b-ucl-green",
      bg: "bg-ucl-green",
      text: "text-ucl-navy",
    },
  };
  const venues = ["HOME", "AWAY"];
  let selected = $state(null);
</script>

<section class="mt-3.5 max-w-full overflow-x-auto scrollbar-none px-px">
  {#each pots as pot, n}
    <table
      class="mb-5 table-fixed border-separate border-spacing-x-0.75 border-spacing-y-0.75"
      style="--pot-color: {n === 0
        ? 'var(--color-ucl-purple)'
        : n === 1
          ? 'var(--color-ucl-cyan)'
          : n === 2
            ? 'var(--color-ucl-magenta)'
            : 'var(--color-ucl-green)'}"
    >
      <thead>
        <tr class="text-lg tracking-widest uel:text-base text-ucl-navy">
          <th></th>
          {#each Object.entries(potstyles) as [num, style]}
            <th colspan="2">
              <p class="h-8 bg-white border-b-5 {style.border}">
                POT {num}
              </p>
            </th>
          {/each}
        </tr>
        <tr>
          <th class="text-lg tracking-widest uel:text-base text-ucl-navy">
            <p
              class="w-50 h-8 pt-px bg-white border-b-5 {potstyles[
                String(n + 1)
              ].border}"
            >
              POT {n + 1}
            </p>
          </th>
          {#each Object.values(potstyles) as style}
            {#each venues as venue}
              <th>
                <p
                  class="tracking-wide h-8 w-22 pt-0.75 {style.bg} {style.text}"
                >
                  {venue}
                </p>
              </th>
            {/each}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each pot as teamid}
          {@const team = teams.get(teamid)}
          <tr>
            <td>
              <button
                class="font-bold w-full h-9 py-1 transition px-3.5 flex gap-2.5 cursor-pointer bg-ucl-navy/33 uel:bg-black/75 hover:bg-(--pot-color)/50"
                onclick={() => (selected = teamid)}
              >
                <div class="flex items-center justify-center w-6">
                  <img class="h-6" src="team/{teamid}.svg" alt={teamid} />
                </div>
                <p class="flex items-center tracking-wide">
                  {team.name.toUpperCase()}
                </p>
              </button>
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
              }) as match, i}
              {@const opponent =
                team.id === match.home
                  ? teams.get(match.away)
                  : teams.get(match.home)}
              <td>
                <button
                  class="flex relative w-full h-9 py-1 transition px-2.75 gap-1.5 cursor-pointer hover:bg-(--pot-color)/50 {i %
                    2 ===
                  0
                    ? 'bg-ucl-blue/25 uel:bg-neutral-900/75'
                    : 'bg-ucl-navy/33 uel:bg-black/66'}"
                  onclick={() => (selected = opponent.id)}
                >
                  <div class="flex items-center justify-center w-6">
                    <img
                      class="h-6"
                      src="team/{opponent.id}.svg"
                      alt={opponent.id}
                    />
                  </div>
                  <p class="flex items-center tracking-wide">
                    {opponent.id}
                  </p>
                  {#if scheduled}
                    <div
                      class="absolute flex items-center justify-center w-3 h-3 rounded-full left-7 bottom-0.75 {match.round <=
                      round
                        ? 'bg-ucl-cyan text-ucl-navy'
                        : 'bg-ucl-navy text-ucl-cyan'}"
                      style="font-size: 0.605rem"
                    >
                      {match.round}
                    </div>
                  {/if}
                </button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/each}
</section>

{#if selected}
  <Team team={teams.get(selected)} onClose={() => (selected = null)} />
{/if}
