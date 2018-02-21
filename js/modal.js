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
		test = e;
		if (!e.path[1].dataset.desc) {
			modal.firstElementChild.appendChild(image);
		} else {
			load (e.path[1].href, modal);

		}

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


function load (url, element) {
	fetch(url).then( function (response) {
		if(response.ok) {
			return response;
	  	}
	  	throw new Error('Network response was not ok.');
	}).then( function (data) { 
		console.log(data);
		test = data;
		element.innerHTML = data.text();
	}).catch(function(error) {
		console.log('There has been a problem with your fetch operation: ', error.message);
	});
}