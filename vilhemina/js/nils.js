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
//Slider that moves relative to the amount of frames in the animation
slider.addEventListener("change", function() {
	frame = slider.value;
	clearCanvas();
	renderTime(frame, 0);
}, true);
//Stops the animation and changes the text to play if pressed. If showing "play" the button will play the animation.
stop.addEventListener("click", function() {
	clearInterval(status);
	frame = 0;
	slider.value = frame;
	status = null;
	clearCanvas();
	renderTime(frame, 0);
	//reset something??
	play.textContent = "Play";
}, true);
//Play button, if pressed shows Pause.
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
	//Clears the canvas and adds the objects to the canvas.
	clearCanvas();
	boxSmall.animate(frame);
	boxBig.animate(frame);
	triangle.animate(frame);
	balance.animate(frame);

	renderTime(frame, ms);
	//Stops the animation at the specified frame count
	if (frame == 180) {
		clearInterval(status);
		status = null;
	}
	frame++;
}
//Clears the canvas by filling the canvas with a filled rectangle
function clearCanvas() {
	ctx.fillStyle = "rgb(64,145,164)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
} 
//Renders the frame count and time in ms.
function renderTime(f, time) {
	ctx.font = "16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", 4, 20);
}



//Triangle base.
var triangle = {
	color: "rgb(211,144,26)",
	x: 0,
	y: 110,
	delta: 1,
	start: 0,
	end: 180,
	animate: function(c) {
		if (c >= this.start && c <= this.end) {
			//Custom shape, created using the beginpath function witch creates a shape by specifying the corners of the shape.
			ctx.beginPath();
		    ctx.moveTo(220, 480); // höger hörn
		    ctx.lineTo(420, 480); // vänster hörn
		    ctx.lineTo(320, 280); // MItten
		    ctx.fillStyle = this.color;
		    ctx.fill();
		}
	},
	reset: function() {
		this.x = 0;
	}
}

//Creates a balance pole. Filled rectangle 
var balance = {
	color: "rgb(0,0,0)",
	x: 110,
	y: 270,
	delta: 0.5,
	deg: 0,
	speed: 0.5,
	start: 0,
	end: 180,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			// translate to rectangle center 
            // x = x + 0.5 * width
            // y = y + 0.5 * height  
            //MDN web docs, CanvasRenderingContext2D.rotate() 

            //Sets the axis to witch the object should rotate along.
			ctx.translate(315,275);
			//Rotate takes radians as default, so its converted to take degrees
		    ctx.rotate(this.deg * Math.PI/180);
		    ctx.translate(-315,-275)
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, 410, 10);
		    ctx.setTransform(1,0,0,1,0,0);

		    //Rotates the balance pole 24 degrees
		    if (frame < 30 && this.deg < 25) {
		    	this.deg++;
		    //Rotates it back
		    } else if (frame > 60 && frame < 100 && this.deg != 0){
		    	this.deg--;
		    }
		    

		}
	},
	reset: function() {
		this.x = 0;
	}
}
//Creates a small box
//deg is the angle it is set to.
var boxSmall = {
	color: "rgb(190,48,46)",
	x: 110,
	y: 220,
	delta: 1,
	deg: 0,
	speed: 0,
	start: 0,
	end: 180,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
		   //Sets the axis to witch the object should rotate along.  
			ctx.translate(135,245);
		    ctx.rotate(this.deg * Math.PI/180);
		    ctx.translate(-135,-245)
		    
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, 50,50);
		    ctx.setTransform(1,0,0,1,0,0);
			//Makes the small box rotate and moves it up
		  	if (frame < 30 && this.deg < 25) {
		    	this.deg++;
		    	this.y -= 3.1;
		    	this.x -= 0.19;
		    //Moves the box back to its original location  
		    } else if (frame > 60 && frame < 100 && this.deg != 0){
		    	this.deg--;
		    	this.y += 3.1;
		    	this.x += 0.19;
		    //Moves the box to right so the balance pole is stable
		    } else if (frame > 100 && frame < 130) {
		    	this.x += 3;
		    }

		}
	},
	reset: function() {
		this.x = 0;
	}
}
//Specifies the big box variables
var boxBig = {
	color: "rgb(190,48,46)",
	x: 449,
	y: 200,
	delta: 1,
	deg: 0,
	speed: 0,
	start: 0,
	end: 180,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			//Sets the axis to witch the object should rotate along.
			ctx.translate(484.355339,235.355339);
		    ctx.rotate(this.deg * Math.PI/180);
		    ctx.translate(-484.355339,-235.355339)
		   	
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x, this.y, 70.7106781,70.7106781);
		    
		    ctx.setTransform(1,0,0,1,0,0); 
		     //Moves the bigBox down and rotates it accordingly 
		     if (frame < 30 && this.deg < 25) {
		    	this.deg++;
		    	this.y += 3;
		    	this.x+= 1.31;
		    //Moves the bigBox back to its original location
		    } else if (frame > 60 && frame < 100 && this.deg != 0){
		    	this.deg--;
		    	this.y -= 3;
		    	this.x -= 1.31;
		    	
		    }	
		    
		}
	},
	reset: function() {
		this.x = 0;
	}
}