<script>
  let { tab = $bindable(), id, onclick, add } = $props();
</script>

<button
  {id}
  type="button"
  aria-label={id}
  {onclick}
  class="transition h-8 rounded-full cursor-pointer px-2.5 border-[1.75px] border-cyan hover:bg-cyan hover:text-dark-blue hover:border-cyan {add} {tab ===
  id
    ? 'bg-cyan text-dark-blue'
    : 'bg-dark-blue text-cyan'}"
>
  <p class="text-lg capitalize font-champions-bold">
    {id}
  </p>
</button>
