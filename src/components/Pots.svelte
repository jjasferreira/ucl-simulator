<script>
  import { slide } from "svelte/transition";
  import Button from "@components/Button.svelte";
  import Team from "@components/Team.svelte";
  let { pots, teams } = $props();
  let coeff = $state(false);
  let selected = $state(null);
</script>

<div class="flex justify-center py-1.5">
  <Button
    id={coeff ? "hide coefficients" : "show coefficients"}
    onclick={() => (coeff = !coeff)}
  />
</div>

<section class="mt-3.5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
  {#each pots as pot, p}
    <div
      style="--pot-color: {p === 0
        ? 'var(--color-ucl-purple)'
        : p === 1
          ? 'var(--color-ucl-cyan)'
          : p === 2
            ? 'var(--color-ucl-magenta)'
            : 'var(--color-ucl-green)'}"
    >
      <div
        class="h-8 flex mb-0.5 bg-white rounded-t-2xl border-b-5 border-b-(--pot-color) text-ucl-navy uel:text-black"
      >
        {#if coeff}
          <p
            transition:slide={{ axis: "x" }}
            class="flex items-center justify-center w-16 pt-1 pl-4 text-sm italic tracking-wider uel:text-[13px] rounded-tl-2xl"
          >
            coeff
          </p>
        {/if}
        <p
          class="flex items-center justify-center pt-px text-lg font-bold tracking-widest uel:text-base w-50"
        >
          POT {p + 1}
        </p>
      </div>
      <div
        class="rounded-b-2xl flex flex-col pb-2 pt-1.5 gap-0.75 bg-linear-to-bl from-33% to-200%
             from-ucl-navy/50 to-ucl-blue/75 uel:from-black/75 uel:to-neutral-800/75"
      >
        {#each pot as teamid}
          {@const team = teams.get(teamid)}
          <div class="flex h-8">
            {#if coeff}
              <div
                transition:slide={{ axis: "x" }}
                class="flex items-center justify-center w-16 pl-4 pt-0.5 text-sm uel:text-xs uel:pt-px"
              >
                {team.coefficient.toLocaleString("de-DE")}
              </div>
            {/if}
            <div class="px-2 w-50">
              <button
                class="w-full transition rounded-xl px-2 py-1 flex gap-2 cursor-pointer hover:bg-(--pot-color)/50"
                onclick={() => (selected = teamid)}
              >
                <div class="flex items-center justify-center w-6">
                  <img class="h-6" src="team/{teamid}.svg" alt={teamid} />
                </div>
                <p class="flex items-center tracking-wide">
                  {team.name.toUpperCase()}
                </p>
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>

{#if selected}
  <Team team={teams.get(selected)} onClose={() => (selected = null)} />
{/if}
