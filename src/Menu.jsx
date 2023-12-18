import "../assets/css/menu.css";
import Wallet from "./Wallet.jsx";
import Mint from "./Mint.jsx";
import ChooseCharacter from "./ChooseCharacter.jsx";
import { useState } from "react";

export default function Menu(props) {
	const [waiting, setWaiting] = useState(false);
	const [mels, setMels] = useState(null);
	let button = <></>;
	if (props.publicKey) {
		if (mels != null) {
			button = (
				<ChooseCharacter
					contractClient={props.contractClient}
					publicKey={props.publicKey}
					waiting={waiting}
					setWaiting={setWaiting}
					mels={mels}
					setMels={setMels}
					setActiveMel={props.setActiveMel}
				/>
			);
		} else {
			button = (
				<>
					<Mint
						provider={props.provider}
						publicKey={props.publicKey}
						contractClient={props.contractClient}
						waiting={waiting}
						setWaiting={setWaiting}
					/>
					<ChooseCharacter
						contractClient={props.contractClient}
						publicKey={props.publicKey}
						waiting={waiting}
						setWaiting={setWaiting}
						mels={mels}
						setMels={setMels}
					/>
				</>
			);
		}
	} else {
		button = (
			<Wallet provider={props.provider} setPublicKey={props.setPublicKey} />
		);
	}

	let jsx = [];
	jsx.push(<h1 key="header">Mel</h1>);
	jsx.push(
		<p key="description">
			Welcome to Mel, an endless 2D platform runner built to demonstrate GameFi
			principles on the Casper Network
		</p>
	);

	if (waiting) {
		jsx.push(<img src="/assets/images/loading.png" key="loadingImage"></img>);
	} else {
		jsx.push(<div key="buttons">{button}</div>);
	}

	return <> {jsx} </>;
}
