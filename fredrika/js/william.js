var canvas = document.getElementById("modalAnimation");
canvas.width = 640;
canvas.height = 480;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
var numberOfFrames = 285;
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
	boll.reset();
	boll2.reset();
	boll3.reset();
	boll4.reset();
	boll5.reset();
	boll6.reset();
	boll7.reset();
	boll8.reset();
	boll9.reset();
	text1.reset();
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
	boll2.animate(frame);
	boll3.animate(frame);
	boll4.animate(frame);
	boll5.animate(frame);
	boll6.animate(frame);
	boll7.animate(frame);
	boll8.animate(frame);
	boll9.animate(frame);
	text1.animate(frame);
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
var boll = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 110,
	size: 20,
	delta: 1,
	speed: 0,
	animate: function(f) {
		if (f > 30 && f < 60) {
			this.x = 70;
		}
		 else if (f >= 60 && f <= 83) {
		 	this.speed = 10;
			this.x += this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= -1;
		}
		 else if (f > 105) {
		 	this.speed = 0;
		 }

 			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();


	},
	reset: function() {
		this.x = 0;
	}
}
var boll2 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 110,
	size: 20,
	delta: 1,
	speed: 0,
		animate: function(f) {
			if (f > 30 && f < 60) {
				this.x = 560;
			}
			else if (f >= 60 && f <= 84) {
		 		this.speed = 10;
				this.x -= this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= 1;
			}
		 	else if (f > 105) {
		 		this.speed = 0;
		 }
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		},


	reset: function() {
		this.x = 0;
	}
}
var boll3 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 190,
	size: 20,
	delta: 1,
	speed: 0,
	animate: function(f) {
		if (f > 30 && f < 60) {
			this.x = 70;
		}
		 else if (f >= 60 && f <= 83) {
		 	this.speed = 10;
			this.x += this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= -1;
		}
		 else if (f > 105) {
		 	this.speed = 0;
		 }

 			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();


	},
	reset: function() {
		this.x = 0;
	}
}
var boll4 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 190,
	size: 20,
	delta: 1,
	speed: 0,
		animate: function(f) {
			if (f > 30 && f < 60) {
				this.x = 560;
			}
			else if (f >= 60 && f <= 84) {
		 		this.speed = 10;
				this.x -= this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= 1;
			}
		 	else if (f > 105) {
		 		this.speed = 0;
		 }
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		},


	reset: function() {
		this.x = 0;
	}
}
var boll5 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 270,
	size: 20,
	delta: 1,
	speed: 0,
	animate: function(f) {
		if (f > 30 && f < 60) {
			this.x = 70;
		}
		 else if (f >= 60 && f <= 83) {
		 	this.speed = 10;
			this.x += this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= -1;
		}
		 else if (f > 105) {
		 	this.speed = 0;
		 }

 			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();


	},
	reset: function() {
		this.x = 0;
	}
}
var boll6 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 270,
	size: 20,
	delta: 1,
	speed: 0,
		animate: function(f) {
			if (f > 30 && f < 60) {
				this.x = 560;
			}
			else if (f >= 60 && f <= 84) {
		 		this.speed = 10;
				this.x -= this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= 1;
			}
		 	else if (f > 105) {
		 		this.speed = 0;
		 }
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		},


	reset: function() {
		this.x = 0;
	}
}
var boll7 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 340,
	size: 20,
	delta: 1,
	speed: 0,
	animate: function(f) {
		if (f > 30 && f < 60) {
			this.x = 70;
		}
		 else if (f >= 60 && f <= 83) {
		 	this.speed = 10;
			this.x += this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= -1;
		}
		 else if (f > 105) {
		 	this.speed = 0;
		 }

 			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();


	},
	reset: function() {
		this.x = 0;
	}
}
var boll8 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 340,
	size: 20,
	delta: 1,
	speed: 0,
		animate: function(f) {
			if (f > 30 && f < 60) {
				this.x = 560;
			}
			else if (f >= 60 && f <= 84) {
		 		this.speed = 10;
				this.x -= this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= 1;
			}
		 	else if (f > 105) {
		 		this.speed = 0;
		 }
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		},


	reset: function() {
		this.x = 0;
	}
}
var boll9 = {
	color: "rgb(46,189,73)",
	x: -60,
	y: 420,
	size: 20,
	delta: 1,
	speed: 0,
		animate: function(f) {
			if (f > 30 && f < 60) {
				this.x = 560;
			}
			else if (f >= 60 && f <= 84) {
		 		this.speed = 10;
				this.x -= this.delta * this.speed;

			if(this.x > canvas.width || this.x < 0)
				this.delta *= 1;
			}
		 	else if (f > 105) {
		 		this.speed = 0;
		 }
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();
		},


	reset: function() {
		this.x = 0;
	}
}
var text1 = {
	color: "rgb(46,189,73)",
	x: 260,
	y: 110,
	size: 100,
	start: 0,
	end: 30,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			ctx.font = "50px Encode Sans";
			ctx.fillStyle = this.color;
			ctx.fillText("Fusion", this.x, this.y);
						console.log("stilla");
		}

	},
	reset: function() {
		this.x = 0;
	}
}