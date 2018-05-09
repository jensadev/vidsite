//sätter upp en canvas att rita upp animationen i
var canvas = document.getElementById("modalAnimation");
canvas.width = 640;
canvas.height = 480;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

//sätter upp en "mätare" för tiden av animationen
var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
var numberOfFrames = 220;
var slider = document.getElementById("slider");
slider.max = numberOfFrames;

//start, paus och stopp knapp för animationen
var stop = document.getElementById("stop");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var start, ms;

//rensar canvasen och sätter animationen till starten så att den kan ritas igen på en blank canvas
clearCanvas();
renderTime(frame, 0);

//eventlistener för "tidsmätaren" som känner av när man justerar den 
slider.addEventListener("change", function() {
	frame = slider.value;
	clearCanvas();
	renderTime(frame, 0);
}, true);

//resettar animationen när man klickar på stopp, rensar canvasen och sätter tillbaka objekten på sina startpositioner
stop.addEventListener("click", function() {
	clearInterval(status);
	frame = 0;
	slider.value = frame;
	status = null;
	clearCanvas();
	renderTime(frame, 0);
	boll1.reset();
	boll2.reset();
	boll3.reset();
	boll4.reset();
	boll5.reset();
	boll6.reset();
	boll7.reset();
	play.textContent = "Play";
}, true);

//startar animationen
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
	boll5.animate(frame);
	boll6.animate(frame);
	boll7.animate(frame);
	renderTime(frame, ms);

	if (frame == numberOfFrames) {
		clearInterval(status);
		status = null;
	}
	frame++;
}
//bestämmer färg och storlek på mitten av canvasen
function clearCanvas() {
	ctx.fillStyle = "rgb(250,250,230)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
} 
//bestämmer vilken text och färg tiden använder sig av
function renderTime(f, time) {
	ctx.font = "16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", 4, 20);
}
//första bollen, som skjuts mot de andra, bestämmer dess hastighet och vinkel
var boll1 = {
	color: "rgb(127,255,0)",
	x: 0,
	y: 240,
	size: 30,
	delta: 1,
	speed: 3,
	start: 0,
	end: 290,
	animate: function(f) {
			if (f >= this.start && f <= this.end) {
			if (f >= 0 && f < 167) {
				this.x += this.speed;
			}
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();	
			/*ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();*/
		}
	},
	reset: function() {
		this.x = 0;
	}
}
//andra bollen, som är i mitten av högen, bestämmer dess hastighet och vinkel
var boll2 = {
	color: "rgb(255,99,71)",
	x: 320,
	y: 240,
	size: 30,
	delta: 1,
	speed: 3,
	start: 0,
	end: 290,
	animate: function(f) {
			if (f >= this.start && f <= this.end) {
			if (f > 88 && f < 167) {
				this.x += this.speed;
			}
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();	
			/*ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();*/
		}
	},
	reset: function() {
		this.x = 320;
	}
}
//tredje bollen, som är i mitten och som skjuts ut mot en av kanterna, bestämmer dess hastighet och vinkel 
var boll3 = {
	color: "rgb(127,255,0)",
	x: 320,
	y: 300,
	size: 30,
	delta: 1,
	speed: 3,
	start: 0,
	end: 290,
	animate: function(f) {
			if (f >= this.start && f <= this.end) {
			if (f > 88 && f < 139) {
				this.x += this.speed;
				this.y += this.speed;
			}
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();	
			/*ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();*/
		}
	},
	reset: function() {
		this.x = 320;
		this.y = 300;
	}
}
//fjärde bollen, som är i mitten och som skjuts ut mot en av kanterna, bestämmer dess hastighet och vinkel 
var boll4 = {
	color: "rgb(127,255,0)",
	x: 320,
	y: 180,
	size: 30,
	delta: 1,
	speed: 3,
	start: 0,
	end: 290,
	animate: function(f) {
			if (f >= this.start && f <= this.end) {
			if (f > 88 && f < 139) {
				this.x += this.speed;
				this.y -= this.speed;
			}
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();	
			/*ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();*/
		}
	},
	reset: function() {
		this.x = 320;
		this.y = 180;
	}
}
//femte bollen, som är i mitten och som skjuts ut mot en av kanterna, bestämmer dess hastighet och vinkel 
var boll5 = {
	color: "rgb(255,99,71)",
	x: 370,
	y: 210,
	size: 30,
	delta: 1,
	speed: 3,
	start: 0,
	end: 290,
	animate: function(f) {
			if (f >= this.start && f <= this.end) {
			if (f > 88 && f < 149) {
				this.x += this.speed;
				this.y -= this.speed;
			}
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();	
			/*ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();*/
		}
	},
	reset: function() {
		this.x = 370;
		this.y = 210;
	}
}
//sjätte bollen, som är i mitten och som skjuts ut mot en av kanterna, bestämmer dess hastighet och vinkel 
var boll6 = {
	color: "rgb(255,99,71)",
	x: 370,
	y: 270,
	size: 30,
	delta: 1,
	speed: 3,
	start: 0,
	end: 290,
	animate: function(f) {
			if (f >= this.start && f <= this.end) {
			if (f > 88 && f < 149) {
				this.x += this.speed;
				this.y += this.speed;
			}
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();	
			/*ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();*/
		}
	},
	reset: function() {
		this.x = 370;
		this.y = 270;
	}
}
//sjunde bollen, som är i längst fram och som skjuts ut rakt fram, bestämmer dess hastighet och vinkel 
var boll7 = {
	color: "rgb(127,255,0)",
	x: 420,
	y: 240,
	size: 30,
	delta: 1,
	speed: 3,
	start: 0,
	end: 290,
	animate: function(f) {
			if (f >= this.start && f <= this.end) {
			if (f > 88 && f < 153) {
				this.x += this.speed;
			}
			ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();	
			/*ctx.beginPath();
		    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		    ctx.fillStyle = this.color;
		    ctx.fill();*/
		}
	},
	reset: function() {
		this.x = 420;
	}
}