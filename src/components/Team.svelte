<script>
  let { team, onClose } = $props();
</script>

<section
  class="fixed inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm"
  style="--team-color: {team.color};
         --team-dark-color: color-mix(in srgb, {team.color}, black 15%)"
>
  <div class="w-full max-w-md p-6 shadow-xl bg-(--team-dark-color) rounded-xl">
    <div
      class="flex flex-col items-center justify-between pb-3 border-b border-gray-200"
    >
      <!-- Trophies -->
      <div class="flex h-6 mt-1 space-x-1">
        <img class="w-6" src={`icon/trophy.svg`} alt="3" />
        <p class="text-md">3</p>
      </div>
      <!-- Logo -->
      <div class="flex justify-center w-32 h-32 p-2 bg-black bg-opacity-50">
        <img class="h-full" src="team/{team.id}.svg" alt={team.name} />
      </div>
      <!-- Name -->
      <h1 class="text-3xl font-bold">{team.name}</h1>
      <!-- Country -->
      <div class="flex items-center gap-1">
        <div
          class="flex w-5 h-5 overflow-hidden border-2 rounded-full border-silver"
        >
          <img
            class="object-cover"
            src="country/{team.country}.svg"
            alt={team.country}
          />
        </div>
        <p class="text-md">{team.country}</p>
      </div>
    </div>
    <!-- Top part -->
    <div class="">
      <!-- Close -->
      <div class="absolute top-3 left-3">
        <button
          onclick={onClose}
          class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      <!-- Content -->
      <div class="absolute bottom-6 left-3"></div>
      <!-- Player -->
      <img
        class="absolute translate-x-16"
        src="player/{team.id}.webp"
        alt={team.name}
      />
    </div>
    <div class="mt-3">
      <p><strong>Ground:</strong> {team.ground}</p>
      <p><strong>Coefficient:</strong> {team.coefficient}</p>
      <p><strong>Pot:</strong> {team.pot}</p>
      <p><strong>Points:</strong> {team.points}</p>
      <p>Matches Played: {team.matchesPlayed}</p>
      <!--
            <p>Wins: {team.wins}</p>
            <p>Draws: {team.draws}</p>
            <p>Losses: {team.losses}</p>
            <p>Goals For: {team.goalsFor}</p>
            <p>Goals Against: {team.goalsAgainst}</p>
            <p>Fixtures:</p>
            {#each team.fixtures as fixture}
                <p>{fixture.id}</p>
            {/each}
            fixtures{8 objects {id, location, matchweek, pot, result}}
            -->
    </div>
  </div>
</section>
