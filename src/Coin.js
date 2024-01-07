const COIN_HEIGHT = 32;
const START_X = 800;
const COIN_SPEED = 5;
const FLOOR = 345;
const HEIGHT_VARIATION = 200; // The max height the coin can be painted
const FLOOR_OFFSET = 60; // Coin painted too low under this number

export default class Coin {
	constructor(ctx) {
		this.ctx = ctx;
		this.y =
			FLOOR - FLOOR_OFFSET - Math.floor(Math.random() * HEIGHT_VARIATION);
		this.x = START_X;
		this.width = 32;
		this.height = 32;
		this.image = new Image();
		this.image.src = "/assets/coin/coin.png"; // Path to your obstacle image
		this.timestamp = 0;
		this.frameRate = 10;
		this.frameX = 0;
	}

	draw() {
		this.ctx.drawImage(
			this.image,
			this.frameX * this.width,
			0,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	update() {
		this.x -= COIN_SPEED; // Move coin to the left

		// Reset obstacle if it goes off screen
		if (this.x + this.width < 0) {
			return false;
		}

		this.updateFrames();
		this.draw();
		this.incrementTimestamp();
	}

	updateFrames() {
		// Stagger Frames
		if (this.timestamp % this.frameRate == 0) {
			// Handle Spritesheet X frames
			if (this.frameX > 0) {
				this.frameX--;
			} else {
				this.frameX = 5;
			}
		}
	}

	incrementTimestamp() {
		this.timestamp += 1;
	}

	getAnchoredPosition(axis) {
		if (axis === "x") {
			return this.x + this.width / 2;
		} else if (axis === "y") {
			return this.y + this.height / 2;
		}
	}
}
