(function(Creator) {

	"use strict";

	var creator = new Creator();
	var canvas = creator.getCanvas();

	// listen for click and get mouse position.

	canvas.addEventListener("mousedown", function(event) {
		creator.startDrawing(event, true);
	}, false);


	canvas.addEventListener("mousemove", function(event) {
		creator.continueDrawing(event, true);
	}, false);

	canvas.addEventListener("mouseup", function(event) {
		creator.stopDrawing(event, true);
	}, false);

	// listen on click on every shape to draw.
	var buttons = document.getElementsByClassName("button-shape");

	for(var i=0; i<buttons.length; i++) {
		(function() {
			buttons[i].addEventListener('click', function() {
				var shape = this.getAttribute("data-shape");
				creator.changeShape(shape, true);
			});
		})(i);
	}


	// keep all the actions and repeat them.
	var actionButtons = document.getElementsByClassName("button-action");

	for(var i=0; i<actionButtons.length; i++) {
		(function() {
			actionButtons[i].addEventListener('click', function() {
				creator.redraw();
			});
		})(i);
	}

})(Creator);