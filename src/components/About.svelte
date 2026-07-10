<script>
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
</script>

<section class="flex flex-col gap-2 mt-3.5">
  {#each countries as [countryid, teamids]}
    <ul class="flex gap-0.75 bg-dark-blue rounded-l-full pr-3">
      <div class="flex w-16 h-16 mr-2">
        <img
          class="object-cover overflow-hidden rounded-full border-3 border-silver"
          src="country/{countryid}.svg"
          alt={countryid}
        />
      </div>
      {#each teamids as teamid}
        <button
          style="--team-color: {teams.get(teamid).color}"
          class="transition rounded-3xl p-2 cursor-pointer hover:bg-(--team-color)"
          onclick={() => (selected = teamid)}
        >
          <div class="flex items-center justify-center w-12">
            <img class="h-12" src="team/{teamid}.svg" alt={teamid} />
          </div>
        </button>
      {/each}
    </ul>
  {/each}
</section>
