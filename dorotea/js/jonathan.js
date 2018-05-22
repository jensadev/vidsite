var canvas = document.getElementById("modalAnimation");
canvas.width = 640;
canvas.height = 480;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
var slider = document.getElementById("slider");
slider.max = 270;

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
	rectangle.reset();
	rope.reset();
	title_filler.reset();
	formulabox1.reset();
	formulabox2.reset();
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
	rectangle.animate(frame);
	rope.animate(frame)
	title_filler.animate(frame);
	formulabox1.animate(frame);
	formulabox2.animate(frame);
	renderTime(frame, ms);

	if (frame == 270) {
		clearInterval(status);
		status = null;
	}
	frame++;
}

function clearCanvas() {
	ctx.fillStyle = "#AAABD6";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
} 

function renderTime(f, time) {
	ctx.font = "16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", 4, 20);
}


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
		if (f >= this.start && f <= this.end) {
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

var rectangle = {
	color: "#DEAF48",
	size: 180,
	x: parseInt((canvas.width/2) - (90)), 
	y: parseInt((canvas.height/2) - (90)),
	start: 120,
	end: 270,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.size, this.size);
		}
	},
	reset: function() {
		this.x = parseInt((canvas.width/2) - (90)),
		this.y = parseInt((canvas.height/2) - (90));
	}
}

var rope = {
	color: "#6369AF",
	height: 150,
	width: 10,
	x: parseInt((canvas.width/2)),
	y: 0,
	start: 140,
	end: 270,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	},
	reset: function() {
		this.x = parseInt((canvas.width/2)),
		this.y = 0;
	}
}

var title_filler = {
	color: "#5D9B55",
	height: 50,
	width: 250,
	x: parseInt((canvas.width/2)) - 125,
	y: parseInt((canvas.height/2)) - 25,
	start: 20,
	end: 270,

	animate: function(f) {
		if (f >= this.start && f <= 50) {
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.width, this.height);
		   
		} else if(f >= 50 && f <= 100 && this.x >= 10 && this.y >= 5){
			ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.width, this.height);
		    console.log(this.x);
		    console.log(this.y);
			this.x -= 5;
		    this.y -= 5;
		} else {
			ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	},
	reset: function() {
		this.x = parseInt((canvas.width/2)) - 125,
		this.y = parseInt((canvas.height/2)) - 25;
	}
}

var formulabox1 = {
	color: "#5D9B55",
	height: 50,
	width: 50,
	x: parseInt((canvas.width/2)) + 30,
	y: parseInt((canvas.height/2)) - 80,
	start: 180,
	end: 270,

	animate: function(f) {
		if (f >= this.start && f <= this.end) {
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	},
	reset: function() {
		this.x = parseInt((canvas.width/2)) + 30,
		this.y = parseInt((canvas.height/2)) - 80;
	}
}

var formulabox2 = {
	color: "#5D9B55",
	height: 50,
	width: 50,
	x: parseInt((canvas.width/2)) + 30,
	y: parseInt((canvas.height/2)) + 30,
	start: 180,
	end: 270,

	animate: function(f) {
		if (f >= this.start && f <= this.end) {
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	},
	reset: function() {
		this.x = parseInt((canvas.width/2)) + 30,
		this.y = parseInt((canvas.height/2)) + 30; 	
	}
}