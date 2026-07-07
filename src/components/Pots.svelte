<script>
  let { pots, teams } = $props();
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {#each pots as pot, p}
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
            <img class="h-full" src="images/teams/{teamid}.svg" alt={teamid} />
          </div>
          <p class="flex ml-2 items-center">
            {teams.get(teamid).name}
          </p>
        </div>
      {/each}
    </div>
  {/each}
</section>
