<div align="center">
    <img width="100" src="https://i.imgur.com/V0ZiJwf.png">
     ❤️
    <img width="100" src="https://i.imgur.com/lvljl2F.png">

# Hardhat & Svelte
### Automated template dapp development kit
</div>

#### This repository is a template for Dapps, and has the following cool caracteristics:

- Automated Contract verification.
- Automated ABI and Address linkage to the frontend app ( Svelte ).
- Automated frontend upload w/Surge.

#### What does this mean?

When you deploy a contract, the contract will be verified, the artifacts, abis and address of the contract will be generated in the frontend, and the Svelte app will automatically have a predefined configuration so you can simply generate a signer and a contract instance, without the need to specify the contract abis or adress.


#### Where to start:

- `backend`: Simple hardhat project, check out the scripts and config.
- `frontend`: Svelte app with Tailwind CSS, check out configs and pages.

<br>

##### Backend.
1. Go at `/backend/.env_examples` and fill out the gaps, after that rename it to `/backend/.env`.
Check out how thats used on `hardhat.config.js` and `./scripts/deploy.js`.


2. After that, customize the contract and your `./scripts/deploy.js` ( specify name and constructor args of the contract ).

3. Once youre done, there are a few cmds you can check out on the below seciton. Try running a hardhat node, and deploying the contract to this node.
    - `npm run node` and in another terminal `npm run deploy-local`.

##### Frontend.
4. Lets go to our frontend, check `./App.svelte` and `./components/Greeter.svelte` for some sample code.

5.  You'll notice that you'll be able to access the `CONTRACT_ABI, CONTRACT_ADDRESS, DEPLOYED_NETWORK, DEPLOYER_ADDRESS` from `constants.js`, theres no need to change these values, since each time you deploy your contract with hardhat, `backend/scripts/deploy.js `will update these variables to the latest deployed contract, and you'll have direct access to them from these variables in your `config/constanst/contract.js` file.

6. Run `npm run dev` to start the Vite dev server, try and tinker with the app!

7. Once your frontend is ready, lets deploy it to the internet! Run `npm run deploy`, wait for the build to finish, think of a cool domain name, input it when surge asks you ( mydomain.surger.sh for example ), and tadaaa :D, your dapp is on the internet!! Here is my example: https://sveltegreeter.surge.sh.

#### Commands ( node scripts ):
- backend:
    - `npm run node`: Runs a local hardhat node ( localhost network ).
    - `npm run clean`: Cleans artifacts.
    - `npm run compile`: Compiles contract.
    - `npm run deploy-local`: Deploys contract to local hardhat network.
    - `npm run deploy-mumbai`: Deploys and verifies contract to mumbai test network.
    - `npm run deploy-goerli`: Deploys and verifies contract to goerli test network.
    - `npm run test`: Runs hardhat tests ( runs files inside `test/` ).
- frontend:
    - `npm run dev`: Runs vite development server.
    - `npm run preview`: Runs vite development server, accessible from all devices connected to the network.
    - `npm run build`: Builds svelte app source code, exports to ./dist.
    - `npm run surge`: Runs Surge client, used to upload the ./dist folder on a surge web host, check current domains, etc.
    - `npm run deploy`: Runs npm build and surge, one in all command.
    - `npm run lint`: Runs linter.