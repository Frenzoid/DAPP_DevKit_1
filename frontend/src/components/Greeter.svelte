<script>
  import { onTransaction } from "../stores/web3Store";
  import { contract } from "../controllers/web3Controller";

  import Button from "./templates/button.svelte";

  // Attribs.
  let greeter;
  let newGreeter;

  let greeterEvents = [];

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

  const getGreetEvents = async () => {
    const eventFilter = contract.filters.Greet();
    greeterEvents = await contract.queryFilter(eventFilter);

    console.log(greeterEvents);

    contract.on("Greet", async (who, greet) => {
      greeterEvents.unshift({
        who,
        greet,
      });

      console.log(greeterEvents);
    });
  };

  // Init.
  getGreeter();
  getGreetEvents();
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

{#if greeterEvents.length > 0}
  <div class="relative flex py-5 items-center">
    <div class="flex-grow border-t border-gray-400" />
    <span class="flex-shrink mx-4 text-gray-400">Greeter Events</span>
    <div class="flex-grow border-t border-gray-400" />
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg rounded-md">
    <table class="w-full text-center text-sm">
      <thead class="text-xs text-white uppercase bg-blue-500">
        <tr>
          <th scope="col" class="px-6 py-3"> From </th>
          <th scope="col" class="px-6 py-3"> Greet </th>
        </tr>
      </thead>
      <tbody class="text-dark">
        {#each greeterEvents as { who, greet }}
          <tr>
            <td class="px-6 py-4"> {who} </td>
            <td class="px-6 py-4"> {greet} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
