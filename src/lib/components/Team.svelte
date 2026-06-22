<script>
    import { base } from '$app/paths';
    export let id;
    export let league;
    export let close;

    let team = league.teams.get(id);
</script>

<div class="py-28 flex justify-center fixed inset-0 overflow-y-auto bg-black bg-opacity-50 rounded-none"
    on:click={team == null, close} role="button" tabindex="-2" aria-label="Close" on:keydown={close}>
    <!-- Modal -->
    <div class="w-5/6 p-1 flex flex-col items-center rounded" style="background-color: {team.color}"
    on:click|stopPropagation role="button" tabindex="-1" aria-label="Modal" on:keydown={() => {}}>
        <!-- Top part -->
        <div class="relative overflow-hidden">
            <!-- Close -->
            <div class="absolute top-3 left-3">
                <button class="bg-blue-900 hover:bg-blue-800" on:click={close}>
                    <img class="h-6 w-6 my-1" src={`${base}/images/icons/arrow-left.svg`} alt="Close"/>
                </button>
            </div>
            <!-- Content -->
            <div class="absolute bottom-6 left-3">
                <!-- Trophies -->
                <div class="flex h-6 mt-1 space-x-1">
                    <img class="w-6" src={`${base}/images/icons/trophy.svg`} alt="3">
                    <p class="text-md">3</p>
                </div>
                <!-- Logo -->
                <div class="w-32 h-32 p-2 flex justify-center bg-black bg-opacity-50">
                    <img class="h-full" src={`${base}/images/teams/${id}.svg`} alt={team.name}>
                </div>
                <!-- Name -->
                <h1 class="text-3xl font-bold">{team.name}</h1>
                <!-- Country -->
                <div class="flex space-x-1">
                    <div class="w-5 h-5 mt-0.5 flex overflow-hidden rounded-full">
                        <img class="object-cover" src={`${base}/images/countries/${team.country}.svg`} alt={team.country}>
                    </div>
                    <p class="text-md">{team.country}</p>
                </div>
            </div>
            <!-- Player -->
            <img class="absolute translate-x-16" src={`${base}/images/players/${id}.webp`} alt={team.name}>
            <!-- Background -->
            <img class="" src={`${base}/images/stadium.jpg`} alt="UEFA Champions League">
        </div>
        <div class="mt-3">
            <p>{team.ground}</p>
            <p>Coefficient: {team.coefficient}</p>
            <p>Pot: {team.pot}</p>
            <p>Points: {team.points}</p>
            <!--
            <p>Matches Played: {team.matchesPlayed}</p>
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
</div>
  