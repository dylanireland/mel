import {
	CLValueBuilder,
	CLPublicKey,
	CasperServiceByJsonRPC
} from "casper-js-sdk";
import deploy from "./helpers/deploy.js";

export default function Mint(props) {
	async function mintACharacter() {
		props.setWaiting(true);
		let halt = false;
		try {
			if (!(await checkRegistry())) {
				const succeeded = await register();
				if (!succeeded) {
					throw new Error("Failed registering account");
				}
			}
		} catch (error) {
			halt = true;
			props.setWaiting(false);
			alert(error.message);
		}
		if (halt) {
			return;
		}

		const melName = await chooseMelName();

		console.log(melName);

		const metadata = {
			mel_name: melName,
			coins: "0",
			skins: "[]",
			active_skin: "default"
		};

		const args = {
			token_owner: CLValueBuilder.key(CLPublicKey.fromHex(props.publicKey)),
			token_meta_data: CLValueBuilder.string(JSON.stringify(metadata))
		};
		const deployHash = await deploy(
			props.provider,
			props.contractClient,
			"mint",
			args,
			props.publicKey,
			15
		);
		try {
			const succeeded = await waitForDeploy(deployHash);
			props.setWaiting(false);
			if (succeeded) {
				alert(`${melName} has been minted sucessfully!`);
			} else {
				alert(`Error occurred minting ${melName}`);
			}
		} catch (error) {
			props.setWaiting(false);
			alert(error.message);
		}
	}

	async function checkRegistry() {
		const response = await fetch(
			"http://localhost:3001/isRegistered?" +
				new URLSearchParams({
					publicKey: props.publicKey
				})
		);
		const result = await response.text();
		console.log(result);
		if (result == "true") {
			return true;
		} else if (result == "false") {
			return false;
		} else {
			throw new Error("Got unknown response from server");
		}
	}

	async function register() {
		let deployHash = await deploy(
			props.provider,
			props.contractClient,
			"register_owner",
			{
				token_owner: CLValueBuilder.key(CLPublicKey.fromHex(props.publicKey))
			},
			props.publicKey,
			10
		);
		if (deployHash == undefined) {
			return false;
		}
		return await waitForDeploy(deployHash);
	}

	async function waitForDeploy(deployHash) {
		/// Move to server.js

		let deployInfo;
		while (deployInfo == undefined) {
			await new Promise(r => setTimeout(r, 10000));
			const response = await fetch(
				"http://localhost:3001/getDeploy?" +
					new URLSearchParams({
						deployHash: deployHash
					})
			);
			const result = await response.json();
			if (result[1].execution_results.length > 0) {
				deployInfo = result[1];
			}
		}

		const success = deployInfo.execution_results[0].result.Success ?? false;
		if (success) {
			return true;
		} else {
			return false;
		}
	}

	async function chooseMelName() {
		try {
			const response = await fetch("http://localhost:3001/chooseMelName");
			const result = await response.text();
			if (!response.ok) {
				throw new Error(result);
			}
			return result;
		} catch (error) {
			alert(error.message);
		}
	}

	return <button onClick={mintACharacter}>Mint a Character</button>;
}
