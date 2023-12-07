const JUMP_STRENGTH = 15;
const GRAVITY = 0.6;

export default class Mel {
	constructor(ctx) {
		this.ctx = ctx;
		this.y = 100;
		this.isJumping = false;
		this.jumpStrength = JUMP_STRENGTH;
		this.spritesheet = new Image();
		this.spritesheet.src = "/assets/mel/spritesheet.png";
		this.frameX = 1;
		this.frameY = 1;
		this.frameRate = 15;
		this.timestamp = 0;
	}

	draw() {
		this.ctx.drawImage(
			this.spritesheet,
			this.frameX * this.width,
			this.frameY * this.height,
			this.width,
			this.height,
			20,
			this.y,
			this.width,
			this.height
		);
	}

	jump() {
		if (!this.isJumping) {
			this.isJumping = true;
		}
	}

	update() {
		// Wait for image initialization
		if (
			this.spritesheet.height != 0 &&
			this.spritesheet.width != 0 &&
			this.width == undefined &&
			this.height == undefined
		) {
			this.height = this.spritesheet.height / 16;
			this.width = this.spritesheet.width / 7 - 5;
			return;
		}

		// Handle Jump/Gravity
		if (this.isJumping) {
			this.y -= this.jumpStrength;
			this.jumpStrength -= GRAVITY;
		}

		// Check ground collision
		if (this.y > 100) {
			this.y = 100;
			this.isJumping = false;
			this.jumpStrength = JUMP_STRENGTH;
		}

		this.updateFrames();

		this.draw();
		this.incrementTimestamp();
	}

	updateFrames() {
		// Stagger Frames
		if (this.timestamp % this.frameRate == 0) {
			// Handle Spritesheet X frames
			if (this.frameX < 6) {
				this.frameX++;
			} else {
				this.frameX = 1;
			}
		}
	}

	incrementTimestamp() {
		this.timestamp += 1;
	}
}
