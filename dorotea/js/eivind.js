var canvas = document.getElementById("modalAnimation");

var width 			= 640;
var height 			= 480;

canvas.width 	= width;
canvas.height = height;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
var numberOfFrames = 300;
var slider = document.getElementById("slider");
slider.max = 180;

var stop = document.getElementById("stop");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var start, ms;

clearCanvas();
renderTime(frame, 0);

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
	box.reset();
	play.textContent = "Play";
}, true);

play.addEventListener("click", function() {
	if (status === "null") {
		start = Date.now();
		status = setInterval(timeline, 33.333333333333336);
		play.textContent = "Pause";
	} else {
		clearInterval(status);
		status = null;
		play.textContent = "Play";
	}
}, true);

function timeline() {

	slider.value = frame;
	ms = Date.now() - start;
	//console.log("Seconds elapsed = " + ms/1000);

	clearCanvas();


	// Min animation
	var sunPosX = Math.floor(width / 4);
	var sunPosY = Math.floor(height / 2);
													// color			x					y			size del sp 	st
	var sun = new Ball("rgb(255,255,0)", sunPosX, sunPosY, 60, 1, 0, 0, 180);
	sun.animate(frame);

	var planetPosX = Math.floor(3 * width / 4);
	var planetPosY = Math.floor(height / 2);
	var planet = new Ball("rgb(255,255,0)", planetPosX, planetPosY, 20, 1, 0, 0, 180);
	planet.animate(frame);

	var ellipse = new Ellipse();
	ellipse.draw(100, 100, 200, 300);
	renderTime(frame, ms);

	if (frame == numberOfFrames) {
		clearInterval(status);
		status = null;
	}
	frame++;
}

function clearCanvas() {
	ctx.fillStyle = "rgb(250,250,230)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderTime(f, time) {
	ctx.font = "16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", 4, 20);
}

function Ball(color, x, y, size, delta, speed, start, end) {
	this.color 	= color,
	this.x 			= x,
	this.y 			= y,
	this.size 	= size;
	this.delta 	= delta;
	this.speed 	= speed;
	this.start 	= start,
	this.end 		= end,

	this.animate = function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
				ctx.closePath();
			this.x += this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= -1;
		}
	}
	this.reset = function() {
		this.x = 0;
	}
}

function Ellipse() {
	this.draw = function(centerX, centerY, height, width) {
		ctx.beginPath();
							// x    y  y-size x			angle								???????
		ctx.ellipse((width+20), 240, 200, 280, 90 * Math.PI/180, 0, 2 * Math.PI);
		ctx.lineWidth=8;
		ctx.stroke();
	}
}
