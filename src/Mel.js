const JUMP_STRENGTH = 20;
const GRAVITY = 1;
const FLOOR = 345;
const LEFT_OFFSET = 60;

export default class Mel {
	constructor(ctx) {
		this.ctx = ctx;
		this.y = FLOOR;
		this.x = LEFT_OFFSET;
		this.isJumping = false;
		this.jumpStrength = JUMP_STRENGTH;
		this.spritesheet = new Image();
		this.spritesheet.src = "/assets/mel/spritesheet.png";
		this.frameX = 1;
		this.frameY = 1;
		this.frameRate = 10;
		this.timestamp = 0;
	}

	draw() {
		this.ctx.drawImage(
			this.spritesheet,
			this.frameX * this.width,
			this.frameY * this.height,
			this.width,
			this.height,
			this.x,
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
			this.adjustFramerate(4);
		} else {
			this.adjustFramerate(10);
		}

		// Check ground collision
		if (this.y > FLOOR) {
			this.y = FLOOR;
			this.isJumping = false;
			this.jumpStrength = JUMP_STRENGTH;
		}

		this.updateFrames();

		this.draw();
		this.incrementTimestamp();
	}

	adjustFramerate(frameRate) {
		this.frameRate = frameRate;
	}

	updateFrames() {
		if (this.timestamp % this.frameRate == 0) {
			// Stagger Frames
			if (this.isJumping) {
				this.updateJumpFrames();
			} else {
				this.updateRunningFrames();
			}
		}
	}

	updateRunningFrames() {
		// Handle Spritesheet X frames
		if (this.frameY != 1) {
			this.frameY = 1;
		}
		if (this.frameX < 6) {
			this.frameX++;
		} else {
			this.frameX = 1;
		}
	}

	updateJumpFrames() {
		// Handle Spritesheet X frames
		if (this.frameY != 2 && this.frameY != 3) {
			this.frameX = 0;
			this.frameY = 2;
		} else if (this.frameX < 6) {
			this.frameX++;
		} else if (this.frameX == 6) {
			if (this.frameY == 2) {
				this.frameX = 0;
				this.frameY = 3;
			}
			// Don't update
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
