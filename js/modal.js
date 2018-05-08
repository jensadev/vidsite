// Get the modal and so on
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modalContent");
var span = document.getElementsByClassName("close");
var title = document.getElementsByClassName("modalTitle");
var elements = document.getElementsByClassName("column");
var frame = document.getElementById("animFrame");

// add listener to all elements in the coumn
for(var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", function (e) {
		e.preventDefault();

		// fetch the json file through dataset url, return and load iframe src
		if(e.path[1].dataset.url) {
			fetch(e.path[1].dataset.url)
			.then(function(response) { return response.json(); })
			.then(function(json) {
				console.log(json);
				frame.src = json.target;
				title[0].textContent = json.description;
			});

			modal.style.display = "block";
		}
	}, true);
}

// When the user clicks on <span> (x), close the modal
span[0].addEventListener("click", function() {
    modal.style.display = "none";
}, true);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}, true);