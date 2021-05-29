<script lang="ts">
  export let links;
  export let style;

  links.link = "https://www.e-comas.com/";

  const providers = Object.entries(links);
</script>

<div {style}>
  {#each providers as [name, url]}
    <a href={url} target="_blank" rel="noopener">
      <img
        width="26"
        alt={name + " icon"}
        style="border:0; height:26px; width:26px"
        src={`https://e-comas.com/icons/${name.toLowerCase()}.jpg`}
      /></a
    >
  {/each}
</div>
