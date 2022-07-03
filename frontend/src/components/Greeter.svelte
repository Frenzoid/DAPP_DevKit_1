<script>
  import { onTransaction } from "../stores/web3Store";
  import { contract } from "../controllers/web3Controller";

  import Button from "./templates/button.svelte";

  // Attribs.
  let greeter;
  let newGreeter;

  // Methods.
  const getGreeter = async () => {
    greeter = await contract.greet();
  };

  const setGreeter = async () => {
    onTransaction.set(true);
    try {
      let tx = await contract.setGreeting(newGreeter);
      await tx.wait();
      newGreeter = "";
      getGreeter();
    } catch (err) {
      console.error(err);
    } finally {
      onTransaction.set(false);
    }
  };

  // Init.
  getGreeter();
</script>

<h4 class="text-4xl text-center">{greeter}</h4>

<div class="flex flex-row content-center">
  <input
    bind:value={newGreeter}
    class="w-10/12 rounded-md p-2 border-2 border-gray-200 mt-2"
    type="text"
  />
  {#if $onTransaction}
    <Button func={null} text="Loading" loading={true} disabled={true} />
  {/if}
  {#if !$onTransaction}
    <Button func={setGreeter} text="Set Greeter" />
  {/if}
</div>
