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
	a1.reset();
	a2.reset();
	f1.reset();
	f2.reset();
	fluid.reset();
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
	//animations
	f1.animate(frame);
	a1.animate(frame);
	a2.animate(frame);
	fluid.animate(frame);
	f2.animate(frame);
	//
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

String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

function fillDouble(x,y,w,h) {
	ctx.fillRect(x,y,w,h);
	ctx.fillRect(x+w/5,y-h/3,3*w/5,h);
}

var colors = {
	force: "211,144,26",
	area: "190,48,46",
	fluid: "64,145,164",
	background: "124,185,41"
}
var values = {
	x: 100,
	y: 60,
	width: 120,
	height: 80,
	hpush: 120,
	vpush: 140,
	start: 0,
	end: 300
}
/* Example rendered object */
var a1 = {
	color: colors.area,
	alpha: 5e-1,
	x: values.x,
	y: values.y+values.vpush,
	width: values.width,
	height: values.height,
	animate: function(f) {
		if (f >= values.start && f <= values.end) {
		// if (f >= f1.start && f <= f1.end) {
			ctx.fillStyle = "rgba({},{})".format(a1.color,a1.alpha);
			ctx.fillRect(a1.x,a1.y,a1.width,a1.height);

			if (f1.speed == 0) {
		    	a1.alpha += a1.alpha/60;
			}

			// if(a1.x > canvas.width || a1.x < 0)
			// 	a1.delta *= -1;
		}
	},
	reset: function() {
		a1.x = values.x;
		a1.y = values.y + values.vpush;
		a1.alpha = 5e-1;
	}
}
var a2 = {
	color: colors.area,
	alpha: 5e-1,
	x: a1.x + values.hpush + a1.width,
	y: a1.y,
	width: a1.width*2,
	height: a1.height,
	animate: function(f) {
		if (f >= values.start && f <= values.end) {
			ctx.fillStyle = "rgba({},{})".format(a2.color,a2.alpha);
			ctx.fillRect(a2.x,a2.y,a2.width,a2.height);

		    // a2.x += a2.delta * a2.speed;
		    if (fluid.alpha >= 1) {
		    	a2.alpha += a2.alpha/60;
		    }

			// if(a2.x > canvas.width || a2.x < 0)
			// 	a2.delta *= -1;
		}
	},
	reset: function() {
		a2.x = a1.x+values.hpush;
		a2.y = a1.y;
		a2.alpha = 5e-1;
	}
}
var f1 = {
	color: colors.force,
	x: values.x,
	y: values.y,
	width: values.width,
	height: values.height,
	speed: 1,
	animate: function(f) {
		if (f >= values.start && f <= values.end) {
			ctx.fillStyle = "rgb({})".format(f1.color);
			fillDouble(f1.x,f1.y,f1.width,f1.height);

		    // f1.x += f1.delta * f1.speed;
		    f1.y += f1.speed;

			if(f1.y >= values.y+values.vpush-values.height)
			 	f1.speed = 0;

			// if(f1.x > canvas.width || f1.x < 0)
			// 	f1.delta *= -1;
		}
	},
	reset: function() {
		f1.x = values.x;
		f1.y = values.y;
	}
}
var f2 = {
	color: colors.force,
	x: f1.x+values.hpush+f1.width,
	y: f1.y+values.vpush-values.height,
	width: f1.width*2,
	height: f1.height,
	speed: 1,
	animate: function(f) {
		if (f >= values.start && f <= values.end) {
			ctx.fillStyle = "rgb({})".format(f2.color);
			fillDouble(f2.x,f2.y,f2.width,f2.height);

			if (a2.alpha >= 1 ) {
		    	f2.y -= f2.speed;
			}

			if(f2.y <= values.y)
			 	f2.speed = 0;
		}
	},
	reset: function() {
		f2.x = f1.x+values.hpush+f1.width;
		f2.y = f1.y+values.vpush-values.height;
	}
}
var fluid = {
	color: colors.fluid,
	alpha: 5e-1,
	x: values.x,
	y: values.y+values.vpush+values.height,
	width: values.hpush+3*values.width,
	height: values.height,
	animate: function(f) {
		if (f >= values.start && f <= values.end) {
			ctx.fillStyle = "rgba({},{})".format(fluid.color,fluid.alpha);
			ctx.fillRect(fluid.x,fluid.y,fluid.width,fluid.height);

		    if (a1.alpha >= 1) {
		    	fluid.alpha += fluid.alpha/60;
		    }

		}
	},
	reset: function() {
		fluid.x = values.x;
		fluid.y = values.y + values.vpush + values.height;
		fluid.alpha = 5e-1;
	}
}
