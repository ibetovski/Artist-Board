(function() {

	/**
	 * The creator of all shapes.
	 */
	function Creator() {

		var canvas = document.getElementById("scene-canvas");
		if (typeof canvas.getContext != "undefined") {
			var context = canvas.getContext("2d");
		} else {
			canvas.innerHTML = "This browser doesn't support HTML5 canvas";
			return;
		}

		var _startPostion,
			_endPostion;

		this.getCanvas = function() {
			return canvas;
		}

		// if not set, we draw rectangle by default.
		this.shape = "rect";

		// when the user starts draging.
		// record user's mouse position
		this.startDrawing = function(event) {
			_startPosition = {
				x: event.offsetX,
				y: event.offsetY
			}
		}

		// when the user stops dragging.
		// record user's mouse position
		this.stopDrawing = function(event) {

			_endPosition = {
				x: event.offsetX,
				y: event.offsetY
			};

			// calculate the size:
			var width = _endPosition.x - _startPosition.x;
			var height = _endPosition.y - _startPosition.y;

			switch(this.shape) {
				case "rect":
					context.fillStyle = "black";
					context.fillRect(_startPosition.x, _startPosition.y, width, height);
					break;
				case "circle":
					context.fillStyle = "black";
					context.arc(_startPosition.x, _startPosition.y, width, 0, Math.PI * 2);
					context.fill();
					context.stroke();
					break;
			}
		}
	}

	var creator = new Creator();
	var canvas = creator.getCanvas();
	// listen for click and get mouse position.

	canvas.addEventListener("mousedown", function(event) {
		creator.startDrawing(event);
	}, false);

	canvas.addEventListener("mouseup", function(event) {
		creator.stopDrawing(event);
	}, false);

	// listen on click on every shape to draw.
	var buttons = document.getElementsByTagName("button");

	for(var i=0; i<buttons.length; i++) {
		(function() {
			buttons[i].addEventListener('click', function() {
				var shape = this.getAttribute("data-shape");
				creator.shape = shape;
			});
		})(i);
	}

	

	
})();