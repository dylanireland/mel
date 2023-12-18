//import React, { useRef, useEffect } from "react";

// Import your background images here
import bgImage1 from "../assets/background/0.png";
import bgImage2 from "../assets/background/1.png";
import bgImage3 from "../assets/background/2.png";
import bgImage4 from "../assets/background/3.png";
import bgImage5 from "../assets/background/4.png";
import bgImage6 from "../assets/background/5.png";
import bgImage7 from "../assets/background/6.png";
import bgImage8 from "../assets/background/7.png";
import bgImage9 from "../assets/background/8.png";
import bgImage10 from "../assets/background/9.png";
import bgImage11 from "../assets/background/10.png";
import bgImage12 from "../assets/background/11.png";

export default class Background {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.layers = this.initializeLayers();
		this.loadImages();
	}

	initializeLayers() {
		const images = [
			bgImage1,
			bgImage2,
			bgImage3,
			bgImage4,
			bgImage5,
			bgImage6,
			bgImage7,
			bgImage8,
			bgImage9,
			bgImage10,
			bgImage11,
			bgImage12
		]; // Add more as needed
		return images.map((imageSrc, index) => ({
			image: new Image(),
			speed: 0.5 + index * 0.2, // Example speed calculation
			x: 0,
			y: 0,
			imageSrc: imageSrc
		}));
	}

	loadImages() {
		this.layers.forEach((layer, index) => {
			console.log(this.layers[index].imageSrc);
			layer.image.src = this.layers[index].imageSrc;
			layer.image.onload = () => {
				// Handle image load if needed
			};
		});
	}

	update() {
		// Update logic for the background (e.g., update positions of layers)
		this.layers.forEach(layer => {
			layer.x -= layer.speed;
			if (layer.x < -this.canvas.width) layer.x = 0;
		});
		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.layers.forEach(layer => {
			this.ctx.drawImage(
				layer.image,
				layer.x,
				layer.y,
				this.canvas.width,
				this.canvas.height
			);
			this.ctx.drawImage(
				layer.image,
				layer.x + this.canvas.width,
				layer.y,
				this.canvas.width,
				this.canvas.height
			);
		});
	}
}
