import { useState } from "react";
import Menu from "./Menu";
import { CasperClient, Contracts } from "casper-js-sdk";
import Game from "./Game";

function App() {
	const [count, setCount] = useState(0);
	const [publicKey, setPublicKey] = useState(null);
	const [activeMel, setActiveMel] = useState(null);

	const casperWalletProvider = window.CasperWalletProvider;
	const casperWalletEventTypes = window.CasperWalletEventTypes;

	if (!casperWalletProvider) {
		return <h1>Please install the Casper Wallet</h1>;
	}

	const provider = casperWalletProvider();

	const casperClient = new CasperClient("http://NODE_ADDRESS:7777/rpc");
	const contractClient = new Contracts.Contract(casperClient);

	const contractHash =
		"hash-1485a80c954781185ef4409dbb15f581df56245a9352ed54d4840aa6c9efcc6c";

	contractClient.setContractHash(contractHash);

	if (activeMel == null) {
		return (
			<div id="menu">
				<Menu
					provider={provider}
					contractClient={contractClient}
					publicKey={publicKey}
					setPublicKey={setPublicKey}
					contractHash={contractHash}
					activeMel={activeMel}
					setActiveMel={setActiveMel}
				/>
			</div>
		);
	} else {
		return <Game />;
	}
}

export default App;
