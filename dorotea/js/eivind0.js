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
	end: 360,
	animate: function(f) {
		if (f >= box.start && f <= box.end) {
		    ctx.fillStyle = box.color;
		    ctx.fillRect(box.x, box.y, box.size, box.size);

			box.x += box.delta * box.speed;

			if(box.x > canvas.width || box.x < 0)
				box.delta *= -1;
		}
	},
	reset: function() {
		box.x = 0;
	}
}

var ellipse

/* Example rendered object */
var boll = {
	color: "rgb(30,140,120)",
	x: 0,
	y: 110,
	size: 30,
	delta: 1,
	speed: 8,
	start: 20,
	end: 160,
	animate: function(f) {
		if (f >= boll.start && f <= boll.end) {
			ctx.beginPath();
		    ctx.arc(boll.x, boll.y, boll.size, 0, 2*Math.PI);
		    ctx.fillStyle = boll.color;
		    ctx.fill();

			boll.x += boll.delta * boll.speed;

			if(boll.x > canvas.width || boll.x < 0)
				boll.delta *= -1;
		}
	},
	reset: function() {
		boll.x = 0;
	}
}
