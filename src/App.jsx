import { useState } from "react";
import Menu from "./Menu";
import { CasperClient, Contracts } from "casper-js-sdk";

function App() {
	const [count, setCount] = useState(0);
	const [publicKey, setPublicKey] = useState(null);

	const casperWalletProvider = window.CasperWalletProvider;
	const casperWalletEventTypes = window.CasperWalletEventTypes;

	const casperClient = new CasperClient("http://NODE_ADDRESS:7777/rpc");
	const contractClient = new Contracts.Contract(casperClient);

	const contractHash =
		"hash-bd5d5050af3ac7df359f1863c1ca048bd21ae7852ac0a5954a7f4d83314db025";

	contractClient.setContractHash(contractHash);

	return (
		<Menu
			casperWalletProvider={casperWalletProvider}
			publicKey={publicKey}
			setPublicKey={setPublicKey}
		/>
	);
}

export default App;
