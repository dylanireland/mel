export default function Wallet(props) {
	async function initiateWalletConnection() {
		try {
			const connected = await props.provider.requestConnection();
			if (connected) {
				await getActivePublicKey();
			} else {
				throw new Error("Couldn't get public key");
			}
		} catch (error) {
			console.log(error.message);
			return;
		}
	}

	async function getActivePublicKey() {
		try {
			const publicKey = await props.provider.getActivePublicKey();
			props.setPublicKey(publicKey);
		} catch (error) {
			if (error === 1) {
				console.error("Wallet is locked");
			} else if (error === 2) {
				console.error("Not approved to connect");
			}
		}
	}

	return (
		<button
			onClick={async () => {
				await initiateWalletConnection();
			}}
		>
			Sign in with Wallet
		</button>
	);
}
