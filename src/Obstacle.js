const OBSTACLE_SPEED = 5; // Adjust speed as needed
const OBSTACLE_WIDTH = 1200; // Adjust width as needed
const OBSTACLE_HEIGHT = 150; // Adjust height as needed
const START_X = 800; // Start position on the x-axis, adjust based on canvas width
const FLOOR = 345;

export default class Obstacle {
	constructor(ctx) {
		this.ctx = ctx;
		this.x = START_X;
		this.y = FLOOR - OBSTACLE_HEIGHT; // Position the obstacle on the floor
		this.width = 150;
		this.height = 150;
		this.image = new Image();
		this.image.src = "/assets/enemy/flight.png"; // Path to your obstacle image
		this.timestamp = 0;
		this.frameRate = 10;
		this.frameX = 7;
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
		this.x -= OBSTACLE_SPEED; // Move obstacle to the left

		// Optionally reset or remove obstacle if it goes off screen
		if (this.x + this.width < 0) {
			this.x = START_X; // Reset the position to start again from the right
			// Or handle obstacle removal logic here
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
				this.frameX = 7;
			}
		}
	}

	incrementTimestamp() {
		this.timestamp += 1;
	}
}
