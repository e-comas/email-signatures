<script>
  import { onMount } from "svelte";

  export let name;

  export let autocomplete = "auto";
  export let autofocus = false;
  export let label = name;
  export let placeholder = undefined;
  export let type = "text";
  export let required = false;
  export let value = "";

  let elm;

  if (autofocus) {
    onMount(() => elm.focus());
  }
</script>

{#if type === "hidden"}
  <input {type} {name} {value} />
{:else}
  <label>
    {label}
    <input
      {name}
      {value}
      {type}
      {autocomplete}
      {placeholder}
      {required}
      bind:this={elm}
    />
  </label>
{/if}
