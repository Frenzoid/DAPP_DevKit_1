import contractMeta from "../contractMeta.json";
const { abi } = await import(/* @vite-ignore */ `../../artifacts/contracts/${contractMeta.name}.sol/${contractMeta.name}.json`);

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

export const CONTRACT_ABI = abi;
export const CONTRACT_ADDRESS = contractMeta.address;
export const DEPLOYER_ADDRESS = contractMeta.deployer;
export const DEPLOYED_NETWORK = NETWORKS[contractMeta.network];