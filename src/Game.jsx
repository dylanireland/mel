import "../assets/css/game.css";
import { useEffect, useRef, useState } from "react";
import Mel from "./Mel";
import Background from "./Background.js";
import Obstacle from "./Obstacle.js";

export default function Game() {
	let canvas, ctx, mel, background, obstacle;
	const canvasRef = useRef(null);
	const [gameOver, setGameOver] = useState(false);
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

	function drawObstacle() {}

	function update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		background.update();
		mel.update();
		obstacle.update();

		checkForCollision();
		if (!gameOver) {
			animationRef.current = requestAnimationFrame(update);
		}
	}

	async function initialize() {
		animationRef.current = requestAnimationFrame(update);
	}

	function checkForCollision() {
		if (
			Math.abs(
				mel.getAnchoredPosition("x") - obstacle.getAnchoredPosition("x")
			) < 20 &&
			Math.abs(
				mel.getAnchoredPosition("y") - obstacle.getAnchoredPosition("y")
			) < 20
		) {
			console.log("Collision detected!");
			setGameOver(true);
		}
	}

	function handleJumpInitiation(event) {
		if (event.code === "Space" && !mel.isJumping) {
			mel.jump();
		}
	}

	return (
		<>
			<canvas id="gameCanvas" ref={canvasRef}></canvas>
		</>
	);
}
