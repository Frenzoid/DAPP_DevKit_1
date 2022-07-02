<script>
  export let color;
  export let func;
  export let text;
</script>

<button
  on:click={func}
  class="bg-{color}-500 hover:bg-{color}-700 text-white font-bold py-2 px-4 border border-{color}-700 rounded"
>
  {text}
</button>
