import "./assets/css/game.css";
import { useEffect } from "react";
import Mel from "./Mel";

export default function Game() {
	const canvas = document.getElementById("gameCanvas");
	const ctx = canvas.getContext("2d");

	canvas.width = 600;
	canvas.height = 400;

	let obstacleX = canvas.width;

	const mel = new Mel(ctx);

	function drawObstacle() {
		ctx.fillStyle = "red";
		ctx.fillRect(obstacleX, 160, 20, 40);
	}

	function update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		mel.update();

		drawObstacle();
		requestAnimationFrame(update);
	}

	async function initialize() {
		update();
	}

	function handleJumpInitiation(event) {
		if (event.code === "Space" && !mel.isJumping) {
			mel.jump();
		}
	}

	initialize();

	useEffect(() => {
		document.addEventListener("keydown", event => handleJumpInitiation(event));
	}, []);

	return (
		<>
			<canvas id="gameCanvas"></canvas>
		</>
	);
}
