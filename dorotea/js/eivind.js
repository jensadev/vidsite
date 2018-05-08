// Create a DOM object for the html canvas.
var canvas = document.getElementById("modalAnimation");
// Give it a width and height.
var width 			= 640;
var height 			= 480;
canvas.width 	= width;
canvas.height = height;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var yellow 	= "rgb(222, 175, 72)";
var blue 		= "rgb(99, 105, 175)";


// Translate canvas coordinates from upper left corner to the center.
// Without this, creating an ellipse becomes 1000% harder.
var ctx = canvas.getContext("2d");
var transX = canvas.width / 2;
var transY = canvas.height / 2;
ctx.translate(transX, transY);

// Assign new variables for the upper left corner, this is needed to position the canvas frame.
var cornerX = -width / 2;
var cornerY = -height / 2;

// Declare startframe, endframe and status of the canvas.
var frame = 0;
var status = null;
var numberOfFrames = 300;

// Create a slider and give it a max value of the number of frames.
var slider = document.getElementById("slider");
slider.max = numberOfFrames;

// Create DOM objects for the controls
var stop = document.getElementById("stop");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var start, ms;

// Create the ellipse object and assign coordinates, width radius and height radius.
var ellipse = new Ellipse(0, 60, 160, 225);

// Create the sun object
var sunPosX = cornerX/2;
var sunPosY = 60;
var sun = new Ball(yellow, sunPosX, sunPosY, 0, 1, 0, 0, numberOfFrames);

// Get the point (x,y) on the ellipse where the angle is 0
// and let the planet start on that coordinate
var coords = ellipse.getPoint(0);
var planetPosX = Math.floor(coords[0]);
var planetPosY = Math.floor(coords[1]);
var planet = new Ball(blue, planetPosX, planetPosY, 20, -1, 2, 40, numberOfFrames);

// Create the other planets and position them outside canvas, they will appear one after another
var planets = [	new Ball(blue, 1000, 1000, 20, -1, 0, 0, numberOfFrames),
								new Ball(blue, 1000, 1000, 20, -1, 0, 0, numberOfFrames),
								new Ball(blue, 1000, 1000, 20, -1, 0, 0, numberOfFrames),
								new Ball(blue, 1000, 1000, 20, -1, 0, 0, numberOfFrames)];

// Create a TextArea object for the title
var text 			= new TextArea("rgb(93, 156, 85)", -240, -200, 480, 70);

// number of planets added.
var planetCount = 0;

// Reset canvas and show only background.
clearCanvas();

// Add the time and framecounter and set them to 0.
renderTime(frame, 0);

// Add eventlisteners for controls.
slider.addEventListener("change", function() {
	frame = slider.value;
	clearCanvas();
	renderTime(frame, 0);
}, true);

stop.addEventListener("click", function() {
	clearInterval(status);
	frame = 0;
	slider.value = frame;
	status = null;
	clearCanvas();
	renderTime(frame, 0);
	play.textContent = "Play";
}, true);

play.addEventListener("click", function() {
	if (status === "null") {
		start = Date.now();
		status = setInterval(timeline, 100/3);
		play.textContent = "Pause";
	} else {
		clearInterval(status);
		status = null;
		play.textContent = "Play";
	}
}, true);

// Main function called to update every frame.
function timeline() {
	// Increase slider value
	slider.value = frame;

	// Compute current time.
	ms = Date.now() - start;

	// Reset frame.
	clearCanvas();

	// Write out current time and frame.
	renderTime(frame, ms);

	// Draw objects on canvas.
	text.drawText("Keplers 2:a lag", -190, -150, "48px 'arial'");
	ellipse.draw();
	planet.animate(frame);
	sun.drawSun(frame);

	// Draw the other planets but don't show them.
	for (var j in planets) {
		planets[j].drawPlanet(frame);
	}

	// Show one planet on each specific frame value.
	if (frame == 46 || frame == 120 || frame == 140 || frame == 210) {
		console.log(i);
		if (planetCount < planets.length) {
			console.log(planets[planetCount]);
			// Set the planet's position to the orbiting planet's current position.
			planets[planetCount].x = planet.x;
			planets[planetCount].y = planet.y;
			planetCount++;
		}
	}

	// If the animation has reached it's end frame, stop the animation.
	if (frame == numberOfFrames) {
		clearInterval(status);
		status = null;
		planet.reset();
		for (var i = 0; i < planets.length; i++) {
			planets[i].reset();
		}
		sun.reset();
		planet.reset();

		frame = 0;
		slider.value = frame;
		clearInterval(status);
		}
	frame++;
}

// Fill whole canvas with a rectangle to clear canvas of objects.
function clearCanvas() {
	ctx.fillStyle = "rgb(170, 171, 214)";
	ctx.fillRect(cornerX, cornerY, canvas.width, canvas.height);
}

// Function to show the time and frame in the upper left corner.
function renderTime(f, time) {
	ctx.font = "16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", cornerX, cornerY +20);
}

// Ball object, this is used to create the individual planets and the sun.
function Ball(color, x, y, size, delta, speed, start, end) {
	this.color 	= color;
	this.x 			= x;
	this.text 	= text;
	this.y 			= y;
	this.startx	= x;
	this.starty	= y;
	this.startSz= size;
	this.size 	= size;
	this.startd	= delta;
	this.delta 	= delta;
	this.speed 	= speed;
	this.start 	= start;
	this.end 		= end;
	this.ellipsePos = 0;
	this.colorD	= 1;

	// Draw function for the sun as it's animation differs from the planets.
	this.drawSun = function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
			if (f <= 20) {
				ctx.arc(this.x, this.y, this.size += (f/6), 0, 2*Math.PI);
				ctx.fillStyle = this.color;
				ctx.fill();
			} else if (f <= 25) {
				ctx.arc(this.x, this.y, this.size -= (f/9), 0, 2*Math.PI);
				ctx.fillStyle = this.color;
				ctx.fill();
			} else if (f <= 30) {
				ctx.arc(this.x, this.y, this.size += (f/9), 0, 2*Math.PI);
				ctx.fillStyle = this.color;
				ctx.fill();
			} else {
		  	ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		  	ctx.fillStyle = this.color;
    		ctx.fill();
			}
		}
	}

	// Draw planet by giving it a start position and color.
	this.drawPlanet = function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		  ctx.fillStyle = this.color;
    	ctx.fill();
		}
	}

	// Change the position of the planet.
	this.animate = function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
			// If the animation is about to end, slow down the planet and decrease it's opacity.
			if (f > 220) {
				this.colorD *= 0.85;
				ctx.fillStyle = "rgba(99, 105, 175, "+ this.colorD + ")";
				ctx.fill();
				this.ellipsePos = this.ellipsePos -= 0.7;
				coords = ellipse.getPoint(this.ellipsePos);
			} else {
				// Make the planet follow the ellipse's line.
				ctx.fillStyle = this.color;
				ctx.fill();
				this.ellipsePos = (frame-this.start) * this.speed * this.delta;
				coords = ellipse.getPoint(this.ellipsePos);
			}
			// Give the planet a new position.
			this.x = coords[0];
			this.y = coords[1];

		}
	}

	// Reset all planets by changing their positions.
	this.reset = function() {
		this.x = this.startx;
		this.delta = this.startd;
		this.size = this.startSz;
	}
}

// Ellipse object.
function Ellipse(centerX, centerY, width, height) {
	this.centerX 	= centerX;
	this.centerY 	= centerY;
	this.color 		= "rgb(157, 76, 110)";
	this.a 				= width;
	this.b 				= height;

	// Show the ellipse on the canvas.
	this.draw = function() {
		ctx.beginPath();
		ctx.ellipse(this.centerX, this.centerY, this.a, this.b, 90 * Math.PI/180, 0, 2 * Math.PI );
		ctx.lineWidth = 8;
		ctx.strokeStyle= this.color;
		ctx.stroke();
	}

	// Return a point (x, y) on the ellipse's line from a given angle.
	this.getPoint = function(angle) {
		let x = centerX + this.b * ( Math.cos( angle * Math.PI / 180 ) );
		let y = centerY + this.a * ( Math.sin( angle * Math.PI / 180 ) );
		return [x, y];
	}
}

// TextArea object.
function TextArea(color, x, y, height, width) {
	this.color	= color;
	this.x 			= x;
	this.y			= y;
	this.height	= height;
	this.width 	= width;

	// Draw text on textArea.
	this.drawText = function(text, textX, textY, font) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.height, this.width);
		ctx.fillStyle = "white";
		ctx.font = font;
		ctx.fillText(text, textX, textY);
	}
}
