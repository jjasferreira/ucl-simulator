<script>
  import teams from "@content/teams.json";

  import { League } from "@lib/league.js";
  import { onMount } from "svelte";

  import Button from "@components/Button.svelte";
  import About from "@components/About.svelte";
  import Pots from "@components/Pots.svelte";
  import Fixtures from "@components/Fixtures.svelte";
  import Matches from "@components/Matches.svelte";
  import Table from "@components/Table.svelte";
  import Knockout from "@components/Knockout.svelte";

  let league;
  let generated = false;
  let scheduled = false;
  let knockout = false;
  let tab = "none";
  let tabMatchweek = 1;

  onMount(() => {
    league = new League(teams);
    league.initializeTable();
    league.generatePots();
    console.log(league.table);
  });

  async function generateFixtures() {
    await league.generateFixtures();
    generated = true;
    console.log(league);
  }

  async function scheduleFixtures() {
    league.scheduleFixtures();
    scheduled = true;
    console.log(league);
  }

  async function playMatchweek(week) {
    league.playMatchweek(week);
    league.round = week;
    console.log(league);
  }

  async function generateKnockout() {
    league.generateKnockout();
    knockout = true;
  }
</script>

<main class="flex flex-col items-center">
  <!-- Navbar -->
  <div class="max-w-full overflow-x-auto scrollbar-none px-3 py-1.5 flex gap-2">
    <Button bind:tab id="about" onclick={() => (tab = "about")} />
    <Button bind:tab id="pots" onclick={() => (tab = "pots")} />
    <Button bind:tab id="fixtures" onclick={() => (tab = "fixtures")} />
    <Button
      bind:tab
      id="matches"
      onclick={() => (tab = "matches")}
      add={!generated ? "pointer-events-none border-silver text-silver" : ""}
    />
    <Button bind:tab id="table" onclick={() => (tab = "table")} />
    <Button bind:tab id="knockout" onclick={() => (tab = "knockout")} />
  </div>

  {#if tab === "about"}
    <About teams={league.teams} />
  {:else if tab === "pots"}
    <Pots pots={league.pots} teams={league.teams} />
  {:else if tab === "fixtures"}
    {#if !generated}
      <div class="py-1.5">
        <Button id="generate" onclick={() => generateFixtures()} />
      </div>
    {:else}
      <Fixtures
        pots={league.pots}
        teams={league.teams}
        matches={league.matches}
        {scheduled}
        round={league.round}
      />
    {/if}
  {:else if tab === "matches"}
    {#if !scheduled}
      <div class="py-1.5">
        <Button id="schedule" onclick={() => scheduleFixtures()} />
      </div>
    {:else}
      <div
        class="max-w-full overflow-x-auto scrollbar-none px-3 py-1.5 flex gap-2"
      >
        {#each Array(8) as _, i}
          <Button
            bind:tab={tabMatchweek}
            id={i + 1}
            onclick={() => (tabMatchweek = i + 1)}
            add={league.round >= i + 1
              ? "bg-green border-green text-dark-blue"
              : ""}
          />
        {/each}
      </div>
      <h3>Matchweek {tabMatchweek}</h3>
      <div class="py-1.5">
        <Button
          id="play"
          onclick={() => playMatchweek(tabMatchweek)}
          add={league.round !== tabMatchweek - 1
            ? "pointer-events-none border-silver text-silver"
            : ""}
        />
      </div>
      <Matches
        {tabMatchweek}
        rounds={league.rounds}
        matches={league.matches}
        teams={league.teams}
        round={league.round}
      />
    {/if}
  {:else if tab === "table"}
    <Table table={league.table} teams={league.teams} matches={league.matches} />
  {:else if tab === "knockout"}
    {#if !knockout}
      <Button id="draw" onclick={() => generateKnockout()} />
    {/if}
    <Knockout teams={league.teams} table={league.table} />
  {/if}
</main>
