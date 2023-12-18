import {
	RuntimeArgs,
	CLPublicKey,
	DeployUtil,
	csprToMotes
} from "casper-js-sdk";

export default async function deploy(
	provider,
	contractClient,
	entrypoint,
	args,
	publicKey,
	gasPaymentCSPR
) {
	const NETWORK = "casper-test";

	args = RuntimeArgs.fromMap(args);

	const deploy = contractClient.callEntrypoint(
		entrypoint,
		args,
		CLPublicKey.fromHex(publicKey),
		NETWORK,
		csprToMotes(gasPaymentCSPR)
	);

	const deployJson = DeployUtil.deployToJson(deploy);

	try {
		const result = await provider.sign(JSON.stringify(deployJson), publicKey);

		if (result.cancelled) {
			alert("Signature request cancelled.");
			return;
		}

		const signedDeploy = DeployUtil.setSignature(
			deploy,
			result.signature,
			CLPublicKey.fromHex(publicKey)
		);

		const signedDeployJson = DeployUtil.deployToJson(signedDeploy);

		const response = await fetch("http://localhost:3001/deploy", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(signedDeployJson)
		});

		if (!response.ok) {
			const errorMessage = await response.text();
			throw new Error(errorMessage);
		}

		return await response.text();
	} catch (error) {
		throw error;
	}
}
