/*import React, { useRef, useEffect } from "react";

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

export default function Background({ canvasRef }) {
	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Load images
		const layers = [
			{ image: new Image(), speed: 0.1, x: 0 },
			{ image: new Image(), speed: 0.2, x: 0 },
			{ image: new Image(), speed: 0.3, x: 0 },
			{ image: new Image(), speed: 0.4, x: 0 },
			{ image: new Image(), speed: 0.5, x: 0 },
			{ image: new Image(), speed: 0.6, x: 0 },
			{ image: new Image(), speed: 0.7, x: 0 },
			{ image: new Image(), speed: 0.8, x: 0 },
			{ image: new Image(), speed: 0.85, x: 0 },
			{ image: new Image(), speed: 0.9, x: 0 },
			{ image: new Image(), speed: 0.95, x: 0 },
			{ image: new Image(), speed: 1.0, x: 0 }
		];

		layers[0].image.src = bgImage1;
		layers[1].image.src = bgImage2;
		layers[2].image.src = bgImage3;
		layers[3].image.src = bgImage4;
		layers[4].image.src = bgImage5;
		layers[5].image.src = bgImage6;
		layers[6].image.src = bgImage7;
		layers[7].image.src = bgImage8;
		layers[8].image.src = bgImage9;
		layers[9].image.src = bgImage10;
		layers[10].image.src = bgImage11;
		layers[11].image.src = bgImage12;

		let animationFrameId;

		// Function to draw each frame
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			layers.forEach(layer => {
				ctx.drawImage(layer.image, layer.x, 0, canvas.width, canvas.height);
				ctx.drawImage(
					layer.image,
					layer.x + canvas.width,
					0,
					canvas.width,
					canvas.height
				);

				// Update layer position
				layer.x -= layer.speed;
				if (layer.x < -canvas.width) layer.x = 0;
			});

			animationFrameId = window.requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [canvasRef]);

	return null;
}*/
