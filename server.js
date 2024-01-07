import express from "express";
import cors from "cors";

import pkg from "casper-js-sdk";
const {
	CasperClient,
	Contracts,
	DeployUtil,
	CLPublicKey,
	CasperServiceByJsonRPC
} = pkg;

import fs from "fs";

const app = express();

app.use(express.json());
app.use(cors());

const CONTRACT_HASH =
	"hash-1485a80c954781185ef4409dbb15f581df56245a9352ed54d4840aa6c9efcc6c";
const NODE_URL = "http://5.9.6.115:7777/rpc";
const client = new CasperClient(NODE_URL);
const melCEP78Contract = new Contracts.Contract(client);
const casperServiceByJsonRPC = new CasperServiceByJsonRPC(NODE_URL);

melCEP78Contract.setContractHash(CONTRACT_HASH);

const data = fs.readFileSync("./server_assets/mels.txt", "utf8");
const names = data.split("\n").filter(name => name.trim() !== "");

app.post("/deploy", async (req, res) => {
	try {
		const deploy = DeployUtil.deployFromJson(req.body).unwrap();
		const deployHash = await client.putDeploy(deploy);
		res.send(deployHash);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

app.get("/getMelsOwned", async (req, res) => {
	const publicKey = req.query.publicKey;
	let accountHash;
	try {
		accountHash = CLPublicKey.fromHex(publicKey).toAccountRawHashStr();
	} catch (error) {
		res.status(400).send("Invalid Public Key");
		return;
	}
	try {
		const response = await melCEP78Contract.queryContractDictionary(
			"page_table",
			accountHash
		);
		const tokenIndexes = await iteratePageTable(response.data, accountHash);

		const tokenIdToMetadata = await getTokenMetadatas(tokenIndexes);
		res.send(tokenIdToMetadata);
	} catch (error) {
		if (error.code == 7979) {
			res.status(400).send("Node connection refused");
		} else if (error.code == -32003) {
			res.status(400).send("You don't own any Mels!");
		}

		return;
	}
});

app.get("/isRegistered", async (req, res) => {
	const publicKey = req.query.publicKey;
	let accountHash;
	try {
		accountHash = CLPublicKey.fromHex(publicKey).toAccountRawHashStr();
	} catch (error) {
		res.status(400).send("Invalid Public Key");
		return;
	}
	try {
		const response = await melCEP78Contract.queryContractDictionary(
			"page_table",
			accountHash
		);
		res.status(200).send(true);
	} catch (error) {
		if (error.code == 7979) {
			res.status(400).send("Connection to Node Refused");
		} else {
			res.status(200).send(false);
		}
	}
});

app.get("/chooseMelName", (req, res) => {
	try {
		const randomIndex = Math.floor(Math.random() * names.length);
		res.send(names[randomIndex]);
	} catch (err) {
		res.status(400).send("Error choosing Mel Name");
	}
});

// Do your own polling. Front-end dominant
app.get("/getDeploy", async (req, res) => {
	const deployHash = req.query.deployHash;
	let deployInfo;
	try {
		deployInfo = await client.getDeploy(deployHash);
		console.log(deployInfo[1]);
	} catch (getDeployError) {
		console.log(getDeployError);
		res.status(400).send(getDeployError.message);
		return;
	}
	if (deployInfo == undefined || deployInfo.length == 0) {
		res.status(400).send("Deploy Info Error");
		return;
	}
	res.send(deployInfo);
});

async function iteratePageTable(pageTable, accountHash) {
	let tokenIndexes = [];
	for (let i = 0; i < pageTable.length; i++) {
		if (pageTable[i].data === true) {
			const page = await queryPage(i, accountHash);
			tokenIndexes.push(...tokenIndexesFromPage(page, i));
		}
	}
	return tokenIndexes;
}

async function queryPage(page_index, accountHash) {
	const response = await melCEP78Contract.queryContractDictionary(
		`page_${page_index}`,
		accountHash
	);
	return response.data;
}

function tokenIndexesFromPage(page, pageIndex) {
	let tokenIndexes = [];
	for (let i = 0; i < page.length; i++) {
		if (page[i].data === true) {
			const tokenIndex = pageIndex * page.length + i;
			tokenIndexes.push(tokenIndex);
		}
	}
	return tokenIndexes;
}

async function getTokenMetadatas(tokenIndexes) {
	let metadatas = [];
	for (let i = 0; i < tokenIndexes.length; i++) {
		await new Promise(r => setTimeout(r, 500));
		const response = await melCEP78Contract.queryContractDictionary(
			`metadata_custom_validated`,
			tokenIndexes[i].toString()
		);
		const metadata = {
			tokenId: tokenIndexes[i],
			metadata: response.data
		};
		metadatas.push(metadata);
	}

	return metadatas;
}

app.listen(3001, () => {
	console.log(`App listening on port 3001`);
});
