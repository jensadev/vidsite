// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var elements = document.getElementsByClassName("column");

var modalContent = document.createElement("div");
modalContent.id = "modal-content";§
modalContent.className = "modal-content";
var modalSpan = document.createElement("span");
modalSpan.className = "close";
modalSpan.textContent = "\u00d7";
var modalP = document.createElement("p");
modalP.textContent = "Some text";
var canvas = document.createElement("canvas");
canvas.id = "modalAnimation";
var slider = document.createElement("input");
slider.className = "slider";
slider.id = "slider";
slider.type = "range";
slider.min = 0;
slider.value = 0;
var playButton = document.createElement("button");
playButton.className = "playerButtons";
playButton.id = "play";
playButton.textContent = "Play";
var stopButton  = document.createElement("button");
stopButton.className = "playerButtons";
stopButton.id = "stop";
stopButton.textContent = "Stop";
var script = document.createElement("script");

for(var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", function (e) {
		e.preventDefault();

		fetch(e.path[1].dataset.url)
		.then(function(response) { return response.json(); })
		.then(function(json) {
			console.log(json);
			modalContent.appendChild(modalSpan);
			modalP.textContent = json.description;
			modalContent.appendChild(modalP);
			modalContent.appendChild(canvas);
			modalContent.appendChild(slider);
			modalContent.appendChild(playButton);
			modalContent.appendChild(stopButton);
			script.src = json.js;
			modalContent.appendChild(script);

			modal.appendChild(modalContent);

		});

		modal.style.display = "block";
	}, true);
}

// When the user clicks on <span> (x), close the modal
modalSpan.addEventListener("click", function() {
    modal.style.display = "none";
    while (modal.firstChild) {
	    modal.removeChild(modal.firstChild);
	}
}, true);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
	    while (modal.firstChild) {
		    modal.removeChild(modal.firstChild);
		}
    }
}, true);