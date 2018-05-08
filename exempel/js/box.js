var canvas = document.getElementById("modalAnimation");
canvas.width = 640;
canvas.height = 480;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
var numberOfFrames = 300;
var slider = document.getElementById("slider");
slider.max = numberOfFrames;

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
	boll.reset();
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
	box.animate(frame);
	boll.animate(frame);
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


/* Example rendered object */
var box = {
	color: "rgb(60,80,110)",
	x: 0,
	y: 210,
	size: 80,
	delta: 1,
	speed: 4,
	start: 10,
	end: 140,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.size, this.size);

			this.x += this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
			this.delta *= -1;
		}
	},
	reset: function() {
		this.x = 0;
	}
}

var boll = {
	color: "rgb(130,170,120)",
	x: 40,
	y: 110,
	size: 60,
	delta: 1,
	speed: 8,
	start: 60,
	end: 280,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = boll.color;
		    ctx.fill();

			this.x += this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= -1;
		}
	},
	reset: function() {
		this.x = 0;
	}
}