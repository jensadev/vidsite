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
	boll.reset();
	car.reset();
	rope.reset();
	guy.reset();
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
	boll.animate(frame);
	bg.animate(frame);
	box.animate(frame);
	car.animate(frame);
	rope.animate(frame);
	guy.animate(frame);
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
	ctx.font = 	"16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", 4, 20);
}


/* Example rendered object */
var boll = {
	color: "rgb(30,140,120)",
	x: 0,
	y: 2000,
	size: 30,
	delta: 1,
	speed: 50,
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

var bg = {
	color: "#93D2DC",
	x: 0,
	y: 0,
	size: 800,
	delta: 1,
	speed: 0,
	start: 0,
	end: 180,
	animate: function(f) {
		if (f >= bg.start && f <= bg.end) {
		    ctx.fillStyle = bg.color;
		    ctx.fillRect(bg.x, bg.y, bg.size, bg.size);

			bg.x += bg.delta * bg.speed;

			if(bg.x > canvas.width || bg.x < 0)
				bg.delta *= -1;
		}
	},
	reset: function() {
		bg.x = 0;
	}
}

var box = {
	color: "#79B933",
	x: 0,
	y: 380,
	size: 640,
	delta: 1,
	speed: 0,
	start: 0,
	end: 180,
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

var car = {
	color: "#EB593D",
	x: 100,
	y: 340,
	height: 40,
	width: 60,
	delta: 1,
	speed: 0,
	start: 20,
	end: 180,
	animate: function(f) {
		car.speed = 3;
		if (f >= car.start && f <= car.end) {
		    ctx.fillStyle = car.color;
		    ctx.fillRect(car.x, car.y, car.width, car.height);

			car.x += car.delta * car.speed;

			if(car.x > canvas.width || car.x < 0)
				car.delta *= -1;
		}
	},
	reset: function() {
		car.x = 100;
	}
}

var rope = {
	color: "#AE3223",
	x: 160,
	y: 360,
	height: 3,
	width: 80,
	delta: 1,
	speed: 3,
	start: 20,
	end: 140,
	animate: function(f) {
		if (f >= rope.start && f <= rope.end) {
		    ctx.fillStyle = rope.color;
		    ctx.fillRect(rope.x, rope.y, rope.width, rope.height);

			rope.x += rope.delta * rope.speed;

			if(rope.x > canvas.width || rope.x < 0)
				rope.delta *= -1;
		}
	},
	reset: function() {
		rope.x = 160;
	}
}

var guy = {
	color: "#EB593D",
	x: 240,
	y: 340,
	height: 40,
	width: 20,
	delta: 1,
	speed: 3,
	start: 20,
	end: 140,
	animate: function(f) {
		if (f >= guy.start && f <= guy.end) {
		    ctx.fillStyle =  guy.color;
		    ctx.fillRect(guy.x, guy.y, guy.width, guy.height);

			 guy.x += guy.delta * guy.speed;

			if(guy.x > canvas.width || guy.x < 0)
				guy.delta *= -1;
		}
	},
	reset: function() {
		guy.x = 240;
	}
}