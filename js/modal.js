// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var elements = document.getElementsByClassName("column");

for(var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", function(e) {
		e.preventDefault();
		var image = document.createElement("img");
		//image.src = elements[i].firstElementChild.href;
		image.src = e.target.src;
		//var a = load(e.target.parentElement.href);
		//console.log(e.target.parentElement.href);
		image.style.width = "100%";
		modal.firstElementChild.appendChild(image);
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

function load(url)
{
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();

    return req.responseText; 
}