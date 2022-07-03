<script>
  import "./css/tailwind.css";
  import Greeter from "./components/Greeter.svelte";
  import Alert from "./components/templates/alert.svelte";
  import Button from "./components/templates/button.svelte";
  import { onWalletConnected, onWrongNetwork } from "./stores/web3Store";
  import { connect } from "./controllers/web3Controller";
  import { DEPLOYED_NETWORK } from "./config/constants/contract";
</script>

<div class="p-8 max-w-6xl mx-auto">
  {#if $onWalletConnected && $onWrongNetwork}
    <Alert
      title="Wrong Network"
      message="Wrong network selected. Please switch to {DEPLOYED_NETWORK.name}."
    />
  {/if}

  {#if !$onWalletConnected}
    <div class="w-full flex justify-center items-center mt-2">
      <Button func={connect} text="Connect to Wallet" />
    </div>
  {/if}

  {#if $onWalletConnected && !$onWrongNetwork}
    <Greeter />
  {/if}
</div>
