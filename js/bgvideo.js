var canvas = document.getElementById("animation");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var numberOfFrames = 180;
var status = null;

var start, ms;

clearCanvas();

function timeline() {
	ms = Date.now() - start;

	clearCanvas();
	boll.animate(frame);
	bolla.animate(frame);
	bolle.animate(frame);
	bollo.animate(frame);
	renderTime(frame, ms);

	frame++;
}

function clearCanvas() {
	ctx.fillStyle = "#eeeeee";
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
		if (f >= this.start) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
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
		if (f >= this.start) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
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
		if (f >= this.start) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
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
		if (f >= this.start) {
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
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
start = Date.now();
status = setInterval(timeline, 33.333333333333336);