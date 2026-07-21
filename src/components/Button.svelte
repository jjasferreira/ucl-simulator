<script>
  let { tab = $bindable(), id, onclick, add } = $props();
</script>

<button
  {id}
  type="button"
  aria-label={id}
  {onclick}
  class="ucl:pb-px transition h-8 rounded-full cursor-pointer px-2.5 border-[1.75px]
  border-ucl-cyan hover:bg-ucl-cyan hover:text-ucl-navy
  uel:border-uel-orange uel:hover:bg-uel-orange uel:hover:text-black {tab === id
    ? 'bg-ucl-cyan text-ucl-navy uel:bg-uel-orange uel:text-black'
    : 'bg-ucl-navy text-ucl-cyan uel:bg-black uel:text-uel-orange'} {add}"
>
  <p class="text-lg font-bold capitalize uel:text-base">
    {id}
  </p>
</button>
