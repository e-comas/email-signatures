<script lang="ts">
  import Db from "./DatabaseInterface.svelte";

  let connected, connecting;
  async function subscribe(observer) {
    for await (const state of observer) {
      connected = state;
      connecting = null;
    }
  }
  function cancelConnecting() {
    connecting = null;
  }
  const gAPI = import("./gdocs.js").then((module) => {
    const observer = module.subscribeToConnectionStatus();
    const waitForStatus = observer.next();

    subscribe(observer);
    return waitForStatus.then((state) => {
      connected = state.value;
      return () => {
        connecting = new Promise((resolve, reject) =>
          (connected ? module.disconnect() : module.connect()).then(
            resolve,
            reject
          )
        );
      };
    });
  });
</script>

<main>
  <h1>Email signature tool</h1>
  {#await gAPI}
    <p>...loading</p>
  {:then toggleConnection}
    {#if connecting}
      {#await connecting}
        <p>...loading</p>
      {:catch error}
        <p style="color: red">
          An error occured: {error.message || error.error || "Error"}.
        </p>
        <button on:click={toggleConnection}>Try again</button>
        <button on:click={cancelConnecting}>Cancel</button>
      {/await}
    {:else}
      <p>
        <button on:click={toggleConnection}>
          {#if connected}
            Sign out
          {:else}
            Sign in
          {/if}
        </button>
      </p>
    {/if}
  {:catch error}
    <p style="color: red">Unable to connect to Google API.</p>
  {/await}
  {#if connected}
    <Db />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #51bf9d;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
