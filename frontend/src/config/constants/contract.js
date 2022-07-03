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
        name: "localhost",
        color: "#666666",
        symbok: "ETH",
        chainId: 31337,
    },
    rinkeby: {
        name: "rinkeby",
        color: "#e0d068",
        symbol: "RIN",
        chainId: 4,
    },
    ropsten: {
        name: "ropsten",
        color: "#F60D09",
        symbol: "ROP",
        chainId: 3,
    },
    mumbai: {
        name: "mumbai",
        color: "#92D9FA",
        symbol: "MATIC",
        chainId: 80001,
    },
    goerli: {
        name: "goerli",
        color: "#00D0D0",
        symbol: "GOR",
        chainId: 420,
    },
}

export const DEPLOYED_NETWORK = NETWORKS[contractMeta.network];