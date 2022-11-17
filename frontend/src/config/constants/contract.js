import contractMeta from "../contractMeta.json";
import { onArtifactImported } from "../../stores/importStore";

export let CONTRACT_ABI;
export const CONTRACT_ADDRESS = contractMeta.address;
export const DEPLOYER_ADDRESS = contractMeta.deployer;

import(`../../artifacts/contracts/${contractMeta.name}.sol/${contractMeta.name}.json`).then(artifact => {
    CONTRACT_ABI = artifact.abi;
    onArtifactImported.set(true);
});

const NETWORKS = {
    localhost: {
        name: "https://8545-halftimehar-dappdevkit1-dwa7tqildce.ws-us75.gitpod.io",
        color: "#666666",
        symbok: "ETH",
        chainId: 31337,
    },
}

export const DEPLOYED_NETWORK = NETWORKS[contractMeta.network];