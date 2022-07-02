import { writable } from "svelte/store";

export const onWalletConnected = writable(false);
export const onAccountChanged = writable(false);
export const onWrongNetwork = writable(false);
export const onNetworkChange = writable(false);
export const onTransaction = writable(false);

