<script>
  import { slide } from "svelte/transition";
  import Button from "@components/Button.svelte";
  let { pots, teams } = $props();
  let coeff = $state(false);
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
      style=" --pot-color: {p === 0
        ? 'var(--color-purple)'
        : p === 1
          ? 'var(--color-cyan)'
          : p === 2
            ? 'var(--color-magenta)'
            : 'var(--color-green)'}"
    >
      <div
        class="h-8 flex mb-0.5 bg-white rounded-t-2xl border-b-5 border-b-(--pot-color) text-dark-blue"
      >
        {#if coeff}
          <p
            transition:slide={{ axis: "x" }}
            class="pl-2 flex justify-center pt-1.75 text-sm italic tracking-wider w-16 rounded-tl-2xl"
          >
            coeff
          </p>
        {/if}
        <p
          class="flex justify-center pt-0.5 text-lg tracking-widest w-50 font-champions-bold"
        >
          POT {p + 1}
        </p>
      </div>
      <div
        class="rounded-b-2xl flex flex-col pb-2 pt-1.5 gap-0.75 bg-linear-to-bl from-33% from-dark-blue/50 to-200% to-electric-blue/75"
      >
        {#each pot as team}
          <div class="flex h-8">
            {#if coeff}
              <div
                transition:slide={{ axis: "x" }}
                class="flex items-center justify-center w-16 pl-2 text-sm"
              >
                {teams.get(team).coefficient.toLocaleString("de-DE")}
              </div>
            {/if}
            <div class="px-2 w-50">
              <div
                class="rounded-xl px-2 py-1 flex gap-2 cursor-pointer hover:bg-(--pot-color)/50"
              >
                <div class="flex items-center justify-center w-6">
                  <img class="h-6" src="team/{team}.svg" alt={team} />
                </div>
                <p class="flex items-center tracking-wide">
                  {teams.get(team).name.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>
