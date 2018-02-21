// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var elements = document.getElementsByClassName("column");

var test, anim;

for(var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", function(e) {
		e.preventDefault();
		var image = document.createElement("img");
		//image.src = elements[i].firstElementChild.href;
		image.src = e.target.src;
		image.style.width = "100%";
		if (!e.path[1].dataset.url) {
			modal.firstElementChild.appendChild(image);
		}

		//var script = document.createElement("script");
		//script.type = "text/javascript";
		var script = document.getElementById("loader");
		script.src = e.path[1].dataset.url;

		document.getElementsByTagName("body")[0].appendChild(script);

		//var a = load(e.target.parentElement.href);
		//console.log(e.target.parentElement.href);
		modal.firstElementChild.children[1].textContent = e.path[1].dataset.desc;
		modal.style.display = "block";
	}, true);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    modal.firstElementChild.removeChild(modal.firstElementChild.lastElementChild);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modal.firstElementChild.removeChild(modal.firstElementChild.lastElementChild);
    }
}


function load (url) {
	fetch(url).then( function (response) {
		if(response.ok) {
			return response;
	  	}
	  	throw new Error('Network response was not ok.');
	}).then( function (data) { 
	  	console.log(data);
	}).catch(function(error) {
		console.log('There has been a problem with your fetch operation: ', error.message);
	});
}