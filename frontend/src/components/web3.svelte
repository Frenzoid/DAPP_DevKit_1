<script>
  import {
    onWalletConnected,
    onWrongNetwork,
    onNetworkChange,
  } from "../stores/web3Store";
  import {
    connect,
    getSigner,
    getENSorAdress,
  } from "../controller/web3Controller";

  let id;

  onWalletConnected.subscribe(async (connected) => {
    if (connected) id = await getENSorAdress(await getSigner().getAddress());
  });

  onNetworkChange.subscribe(async (network) => {
    if (network) id = await getENSorAdress(await getSigner().getAddress());
  });
</script>

{#if !$onWalletConnected}
  <button
    on:click={connect}
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
  >
    Connect wallet
  </button>
{/if}

{#if $onWalletConnected}
  <div
    class="bg-orange-100 border-l-4 border-green-500 text-green-700 p-4"
    role="alert"
  >
    <p class="font-bold">Wallet Connected!.</p>
    <p>{id}</p>
  </div>
{/if}

{#if $onWrongNetwork}
  <div
    class="bg-orange-100 border-l-4 border-red-500 text-red-700 p-4"
    role="alert"
  >
    <p class="font-bold">Wrong network</p>
  </div>
{/if}
