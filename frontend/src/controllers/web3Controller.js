import { get } from 'svelte/store'
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import {
  onWalletConnected,
  onAccountChanged,
  onWrongNetwork,
  onNetworkChange,
} from "../stores/web3Store";
import {CONTRACT_ABI, CONTRACT_ADDRESS, DEPLOYED_NETWORK} from "../config/constants/contract";

/**
 * @type {providers.ExternalProvider | providers.JsonRpcFetchFunc}
 */
export let web3provider;

export const connect = async () => {
  web3provider = await getWeb3Modal().connect();
  setEvents(web3provider);
  onWalletConnected.set(true);
  checkNetwork(DEPLOYED_NETWORK.chainId);
};

const getWeb3Modal = () => {
  return new Web3Modal({
    network: "rinkeby",
    cacheProvider: true,
    providerOptions: {},
  });
};

export const getEthersProvider = () => {
  if ( !get(onWalletConnected) ) throw new Error("No wallet connected.");
  const provider = new providers.Web3Provider(web3provider);
  return provider;
};

export const getSigner = () => {
  const provider = getEthersProvider();
  const signer = provider.getSigner();
  return signer;
};

export const getContract = () => {
  const signer = getSigner();
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return contract;
};

export const getENSorAdress = async (adress) => {
  const provider = getEthersProvider();
  let ens;
  try {
    ens = await provider.lookupAddress(adress);
  } catch (e) {
    // network might not support ENS.
    console.warn("Network doesn't support ENS.");
  } finally {
    return ens || adress;
  }
};

const setEvents = (web3provider) => {
  web3provider.on("chainChanged", (network) => {onNetworkChange.set(network), checkNetwork(DEPLOYED_NETWORK.chainId)});
  web3provider.on("accountsChanged", (accs) => onAccountChanged.set(accs));
  web3provider.on("disconnect", (_) => onWalletConnected.set(false));
};

const checkNetwork = async (num) => {
  if ((await getSigner().getChainId()) !== num) onWrongNetwork.set(true);
  else onWrongNetwork.set(false);
};