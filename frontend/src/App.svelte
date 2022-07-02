<script>
  import "./css/tailwind.css";
  import Alert from "./components/templates/alert.svelte";
  import Button from "./components/templates/button.svelte";
  import {
    onWalletConnected,
    onAccountChanged,
    onWrongNetwork,
    onNetworkChange,
  } from "./stores/web3Store";
  import {
    connect,
    getENSorAdress,
    getSigner,
  } from "./controllers/web3Controller";
  import { DEPLOYED_NETWORK } from "./config/constants/contract";

  let account;

  onWalletConnected.subscribe(async (connected) => {
    if (connected)
      account = await getENSorAdress(await getSigner().getAddress());
  });
</script>

{#if $onWalletConnected && $onWrongNetwork}
  <Alert
    color="red"
    title="Wrong Network"
    message="Wrong network selected. Please switch to {DEPLOYED_NETWORK.name}."
  />
{/if}

{#if !$onWalletConnected}
  <div class="flex flex-col content-center">
    <Button color="blue" func={connect} text="Connect to Wallet" />
  </div>
{/if}

{#if $onWalletConnected && !$onWrongNetwork}
  <h3 class="text-2xl text-center my-4 uppercase">Hello {account}</h3>
{/if}
