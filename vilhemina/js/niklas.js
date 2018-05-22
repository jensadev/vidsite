var canvas = document.getElementById("modalAnimation");
canvas.width = 640;
canvas.height = 480;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
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
	this.reset();
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
	boll1.animate(frame);
	boll2.animate(frame);
	boll3.animate(frame);
	boll4.animate(frame);
	renderTime(frame, ms);

	if (frame == 180) {
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
var boll1 = {
	color: "rgb(30,140,120)",
	x: 250,
	y: 300,
	size: 50,
	delta: 1,
	speed: 8,
	start: 0,
	end: 75,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();

		}
	},
	reset: function() {
		this.x = 0;
	}
}
var boll2 = {
	color: "rgb(30,140,120)",
	x: 350,
	y: 300,
	size: 50,
	delta: 1,
	speed: 8,
	start: 0,
	end: 150,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		}
	},
	reset: function() {
		this.x = 0;
	}
}
var boll3 = {
	color: "rgb(30,140,120)",
	x: 250,
	y: 200,
	size: 50,
	delta: 1,
	speed: 8,
	start: 0,
	end: 200,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		}
	},
	reset: function() {
		this.x = 0;
	}
}
var boll4 = {
	color: "rgb(30,140,120)",
	x: 350,
	y: 200,
	size: 50,
	delta: 1,
	speed: 8,
	start: 0,
	end: 75,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		}
	},
	reset: function() {
		this.x = 0;
	}
}