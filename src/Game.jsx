import "../assets/css/game.css";
import { useEffect, useRef, useState } from "react";
import Mel from "./Mel";
import Background from "./Background.js";
import Obstacle from "./Obstacle.js";
import Coin from "./Coin.js";

export default function Game() {
	let canvas, ctx, mel, background, obstacle, coinsSprites, timestamp;
	const canvasRef = useRef(null);
	const [gameOver, setGameOver] = useState(false);
	const [coins, setCoins] = useState(0);
	const animationRef = useRef();
	useEffect(() => {
		canvas = document.getElementById("gameCanvas");
		ctx = canvas.getContext("2d");

		// useEffect

		canvas.width = 600;
		canvas.height = 400;

		//let obstacleX = canvas.width;

		background = new Background(canvas);
		mel = new Mel(ctx);
		obstacle = new Obstacle(ctx);
		coinsSprites = [];
		timestamp = 0;

		document.addEventListener("keydown", event => handleJumpInitiation(event));

		initialize();

		return () => {
			cancelAnimationFrame(animationRef.current);
			document.removeEventListener("keydown", handleJumpInitiation);
		};
	}, []);

	useEffect(() => {
		if (gameOver) {
			cancelAnimationFrame(animationRef.current);
		}
	}, [gameOver]);

	function update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		background.update();
		mel.update();
		obstacle.update();
		if (checkForCollision(obstacle)) {
			setGameOver(true);
		}

		if (timestamp % 100 == 0) {
			coinsSprites.push(new Coin(ctx));
		}
		for (var i = 0; i < coinsSprites.length; i++) {
			if (coinsSprites[i].update() === false) {
				coinsSprites.splice(i, 1);
			} else {
				if (checkForCollision(coinsSprites[i])) {
					coinsSprites.splice(i, 1);
					setCoins(coins => coins + 1);
				}
			}
		}

		if (!gameOver) {
			animationRef.current = requestAnimationFrame(update);
		}

		timestamp++;
	}

	async function initialize() {
		animationRef.current = requestAnimationFrame(update);
	}

	function checkForCollision(collidee) {
		if (
			Math.abs(
				mel.getAnchoredPosition("x") - collidee.getAnchoredPosition("x")
			) < 20 &&
			Math.abs(
				mel.getAnchoredPosition("y") - collidee.getAnchoredPosition("y")
			) < 20
		) {
			return true;
		}
		return false;
	}

	function handleJumpInitiation(event) {
		if (event.code === "Space" && !mel.isJumping) {
			mel.jump();
		}
	}

	return (
		<div id="gameDiv">
			<p>Coins: {coins}</p>
			<canvas id="gameCanvas" ref={canvasRef}></canvas>
		</div>
	);
}
