import "../assets/css/menu.css";
import {} from "casper-js-sdk";
import deploy from "./helpers/deploy.js";

export default function Menu(props) {
	let provider = null;

	function initiateWalletConnection() {
		try {
			provider = props.casperWalletProvider();
		} catch (error) {
			console.log("Casper Wallet not installed");
			return;
		}
		provider.requestConnection().then(connected => {
			if (connected) {
				getActivePublicKey();
			}
		});
	}

	function mintACharacter() {
		if (props.publicKey == null) {
			initiateWalletConnection();
			return;
		}
		const args = {
			score: 100,
			skins: [],
			active_skin: "default"
		};
		deploy(provider, "mint");
	}

	function getActivePublicKey() {
		props.provider
			.getActivePublicKey()
			.then(publicKey => {
				props.setPublicKey(publicKey);
			})
			.catch(error => {
				if (error === 1) {
					console.error("Wallet is locked");
				} else if (error === 2) {
					console.error("Not approved to connect");
				}
			});
	}

	return (
		<>
			<h1>Mel</h1>
			<p>
				Welcome to Mel, an endless 2D platform runner built to demonstrate
				GameFi principles on the Casper Network
			</p>
			<div>
				<button onClick={mintACharacter}>Mint a Character</button>
				<p>or</p>
				<button>Sign in with Wallet</button>
			</div>
		</>
	);
}
