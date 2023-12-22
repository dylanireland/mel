import "../assets/css/chooseCharacter.css";
import { Fragment } from "react";

export default function ChooseCharacter(props) {
	async function getMelsOwned() {
		return fetch(
			"http://localhost:3001/getMelsOwned?" +
				new URLSearchParams({
					publicKey: props.publicKey
				})
		);
	}

	async function chooseCharacter() {
		props.setWaiting(true);
		try {
			const response = await getMelsOwned();
			if (!response.ok) {
				throw new Error(await response.text());
			}
			const result = await response.json();
			props.setMels(parseMetadata(result));
		} catch (error) {
			alert(error.message);
		}
		props.setWaiting(false);
	}

	function parseMetadata(nfts) {
		let parsed_nfts = [];
		for (let i = 0; i < nfts.length; i++) {
			let metadata = {
				tokenId: nfts[i].tokenId,
				metadata: JSON.parse(nfts[i].metadata.replace("\n", ""))
			};
			parsed_nfts.push(metadata);
		}
		return parsed_nfts;
	}

	if (props.mels !== null) {
		return (
			<div id="characterChooser">
				{props.mels.map(mel => (
					<Fragment key={mel.tokenId}>
						<button
							onClick={() => {
								props.setActiveMel(mel);
							}}
						>
							{mel.metadata.mel_name}
						</button>
						<hr />
					</Fragment>
				))}
			</div>
		);
	}
	return <button onClick={chooseCharacter}>Choose Character</button>;
}
