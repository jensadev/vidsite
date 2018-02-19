var canvas = document.getElementById("animation");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
/*
var slider = document.getElementById("slider");
slider.max = 180;

var stop = document.getElementById("stop");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
*/
var start, ms;

clearCanvas();
//renderTime(frame, 0);

/*
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
	boll.reset();
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
*/
function timeline() {

//	slider.value = frame;
	ms = Date.now() - start;
	//console.log("Seconds elapsed = " + ms/1000);

	clearCanvas();
	boll.animate(frame);
	bolla.animate(frame);
	bolle.animate(frame);
	bollo.animate(frame);
	renderTime(frame, ms);

	frame++;
}

function clearCanvas() {
	ctx.fillStyle = "rgb(242,242,242)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
} 

function renderTime(f, time) {
	ctx.font = "800 10em Encode Sans";
	ctx.fillStyle = "rgba(51,51,51,0.4)";
	ctx.fillText("Frame: " + f, canvas.width/3.8, canvas.height-200);
	ctx.font = "800 8em Encode Sans";
	ctx.fillStyle = "rgba(51,51,51,0.2)";
	ctx.fillText("Time elapsed: " + time/1000 + "s", canvas.width/2.4, canvas.height-120)
}

var boll = {
	color: "rgb(30,140,120)",
	x: 0,
	y: 110,
	size: 60,
	delta: 1,
	speed: 10,
	start: 40,
	end: 200,
	animate: function(f) {
		if (f >= boll.start) {
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

var bolla = {
	color: "rgb(130,80,80)",
	x: 0,
	y: 320,
	size: 90,
	delta: 1,
	speed: 14,
	start: 130,
	end: 200,
	animate: function(f) {
		if (f >= bolla.start) {
			ctx.beginPath();
		    ctx.arc(bolla.x, bolla.y, bolla.size, 0, 2*Math.PI);
		    ctx.fillStyle = bolla.color;
		    ctx.fill();

			bolla.x += bolla.delta * bolla.speed;

			if(bolla.x > canvas.width || bolla.x < 0)
				bolla.delta *= -1;
		}
	},
	reset: function() {
		bolla.x = 0;
	}
}

var bolle = {
	color: "rgb(80,100,80)",
	x: 0,
	y: 420,
	size: 140,
	delta: 1,
	speed: 20,
	start: 80,
	end: 200,
	animate: function(f) {
		if (f >= bolle.start) {
			ctx.beginPath();
		    ctx.arc(bolle.x, bolle.y, bolle.size, 0, 2*Math.PI);
		    ctx.fillStyle = bolle.color;
		    ctx.fill();

			bolle.x += bolle.delta * bolle.speed;

			if(bolle.x > canvas.width || bolle.x < 0)
				bolle.delta *= -1;
		}
	},
	reset: function() {
		bolle.x = 0;
	}
}

var bollo = {
	color: "rgb(60,80,110)",
	x: 0,
	y: 620,
	size: 60,
	delta: 1,
	speed: 12,
	start: 140,
	end: 200,
	animate: function(f) {
		if (f >= bollo.start) {
			ctx.beginPath();
		    ctx.arc(bollo.x, bollo.y, bollo.size, 0, 2*Math.PI);
		    ctx.fillStyle = bollo.color;
		    ctx.fill();

			bollo.x += bollo.delta * bollo.speed;

			if(bollo.x > canvas.width || bollo.x < 0)
				bollo.delta *= -1;
		}
	},
	reset: function() {
		bollo.x = 0;
	}
}
start = Date.now();
status = setInterval(timeline, 33.333333333333336);