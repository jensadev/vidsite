var canvas = document.getElementById("modalAnimation");
canvas.width = 640;
canvas.height = 480;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
var slider = document.getElementById("slider");
slider.max = 10000;

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
	pendel.reset();
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
	clearCanvas();
	pendel.animate(frame);
	renderTime(frame, ms);

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
var pendel = {
	radius: 120,
	color: "rgb(30,140,120)",
	x: canvas.width/2 + 120 * Math.cos(Math.PI/4),
	y: canvas.height/2 + 120 * Math.sin(Math.PI/4),
	size: 15,
	delta: -1,
	vinkelhastighet: 3 * (Math.PI/180),
	vinkel: Math.PI/4,
	start: 0,
	end: 160,
	animate: function(f) {
		if (true) {
			ctx.beginPath();
		    ctx.moveTo(canvas.width/2, canvas.height/2);
		    ctx.lineTo(pendel.x, pendel.y);
		    ctx.stroke();

			ctx.beginPath();
		    ctx.arc(pendel.x, pendel.y, pendel.size, 0, 2*Math.PI);
		    ctx.fillStyle = pendel.color;
		    ctx.fill();

		    pendel.vinkel += pendel.delta * pendel.vinkelhastighet;
		    pendel.x = canvas.width/2 + pendel.radius * Math.cos(pendel.vinkel);
			pendel.y = canvas.height/2 + pendel.radius * Math.sin(pendel.vinkel);
			console.log(pendel.vinkel);
			if(pendel.vinkel >= Math.PI + Math.PI/16) {
				pendel.delta = -1;
			} else if(pendel.vinkel <= -Math.PI/16) {
				pendel.delta = 1;
			}
		}
	},
	reset: function() {
		
	}
}