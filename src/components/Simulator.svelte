<script>
  import Button from "@components/Button.svelte";
  import About from "@components/About.svelte";
  import Pots from "@components/Pots.svelte";
  import Fixtures from "@components/Fixtures.svelte";
  import Matches from "@components/Matches.svelte";
  import Table from "@components/Table.svelte";
  import Knockout from "@components/Knockout.svelte";

  import teams from "@content/teams.json";
  import competition from "@content/competition.json";

  import ucl from "@assets/icons/ucl.svg?raw";
  import uel from "@assets/icons/uel.svg?raw";

  import { League } from "@assets/league.svelte.js";

  let comp = $state("ucl");
  let icon = $state(ucl);
  let swap = $state(uel);
  let title = $state("Champions League Simulator");
  let league = $state();
  let generated = $state(false);
  let scheduled = $state(false);
  let knockout = $state(false);
  let tab = $state("none");
  let tabMatchweek = $state(1);

  $effect(() => {
    icon = comp === "ucl" ? ucl : uel;
    swap = comp === "ucl" ? uel : ucl;
    title =
      comp === "ucl" ? "Champions League Simulator" : "Europa League Simulator";
    league = new League(competition[comp], teams);
    generated = false;
    scheduled = false;
    knockout = false;
    tab = "none";
    tabMatchweek = 1;
  });

  async function generateFixtures() {
    await league.generateFixtures();
    generated = true;
  }

  async function scheduleFixtures() {
    league.scheduleFixtures();
    scheduled = true;
  }

  async function playMatchweek(week) {
    league.playMatchweek(week);
    league.round = week;
  }

  async function generateKnockout() {
    league.generateKnockout();
    knockout = true;
  }
</script>

<main
  class="flex flex-col"
  data-ucl={comp === "ucl" || null}
  data-uel={comp === "uel" || null}
>
  <section
    class="flex flex-col items-center min-h-screen bg-linear-to-tr
           ucl:from-ucl-navy ucl:from-25% ucl:to-ucl-blue ucl:to-150% ucl:font-champions
           uel:bg-uel-orange uel:font-europa uel:text-[14.5px]"
  >
    <!-- Header -->
    <header
      class="transition-all duration-300 ease-in-out sticky top-0 z-10 flex flex-col items-center w-full bg-ucl-navy uel:bg-black py-1.5 mb-1.5"
    >
      <!-- Title -->
      <div class="flex items-center gap-1.5 px-4 h-8 my-1.5">
        <div class="w-8 px-px ucl:py-px uel:pb-0.5">
          {@html icon}
        </div>
        <p class="text-4xl tracking-[0.015em] font-champions-display pb-0.75">
          {title}
        </p>
      </div>
      <!-- Navbar -->
      <div
        class="max-w-full overflow-x-auto scrollbar-none px-4 py-1.5 flex gap-2"
      >
        <Button bind:tab id="about" onclick={() => (tab = "about")} />
        <Button bind:tab id="pots" onclick={() => (tab = "pots")} />
        <Button bind:tab id="fixtures" onclick={() => (tab = "fixtures")} />
        <Button
          bind:tab
          id="matches"
          onclick={() => (tab = "matches")}
          add={!generated
            ? "!pointer-events-none !border-ucl-silver !text-ucl-silver"
            : ""}
        />
        <Button bind:tab id="table" onclick={() => (tab = "table")} />
        <Button bind:tab id="knockout" onclick={() => (tab = "knockout")} />
        <button
          class="transition-all duration-300 ease-in-out flex justify-center items-center ucl:pb-px h-8 min-w-8 border-[1.75px] rounded-full cursor-pointer bg-ucl-navy border-ucl-cyan uel:bg-black uel:border-uel-orange"
          onclick={() => (comp = comp === "ucl" ? "uel" : "ucl")}
        >
          <div class="w-6">
            {@html swap}
          </div>
        </button>
      </div>
    </header>

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
                ? "border-ucl-green! text-ucl-navy! bg-ucl-green!"
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
              ? "pointer-events-none! border-ucl-silver! text-ucl-silver!"
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
      <Table
        table={league.table}
        teams={league.teams}
        matches={league.matches}
      />
    {:else if tab === "knockout"}
      {#if !knockout}
        <Button id="draw" onclick={() => generateKnockout()} />
      {/if}
      <Knockout teams={league.teams} table={league.table} />
    {/if}
  </section>
</main>
