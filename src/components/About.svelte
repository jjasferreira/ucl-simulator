<script>
  import Team from "@components/Team.svelte";
  let { teams } = $props();
  let countries = $derived(
    Object.entries(
      Array.from(teams.entries()).reduce((acc, [id, team]) => {
        if (!acc[team.country]) acc[team.country] = [];
        acc[team.country].push(id);
        return acc;
      }, {}),
    ).sort((a, b) => b[1].length - a[1].length),
  );
  let selected = $state(null);
</script>

<section
  class="flex flex-wrap gap-2 mt-3.5"
  style="width: {countries[0]?.[1]?.length * 68 + 60}px;"
>
  {#each countries as [countryid, teamids]}
    <ul class="flex bg-dark-blue rounded-l-full">
      <div class="flex w-12 m-1.5">
        <img
          class="h-12 rounded-full border-3 border-silver"
          src="country/{countryid}.svg"
          alt={countryid}
        />
      </div>
      {#each teamids as teamid}
        <button
          style="--team-color: {teams.get(teamid).color}"
          class="mx-2 my-1 p-1.5 cursor-pointer"
          onclick={() => (selected = teamid)}
        >
          <div
            class="flex items-center justify-center w-10 transition duration-200 transform-gpu will-change-transform hover:scale-110 hover:filter-[drop-shadow(0_0_7.5px_var(--team-color))]"
          >
            <img class="h-10" src="team/{teamid}.svg" alt={teamid} />
          </div>
        </button>
      {/each}
    </ul>
  {/each}
</section>

{#if selected}
  <Team team={teams.get(selected)} onClose={() => (selected = null)} />
{/if}
