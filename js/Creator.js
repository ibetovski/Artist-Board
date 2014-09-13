(function(exports) {
	"use strict";

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

		var _shape,
			_startPosition,
			_endPosition,
			_lastDrawingPosition,
			_actions = [];

		this.getCanvas = function() {
			return canvas;
		}

		// if not set, we draw rectangle by default.
		_shape = "freehand";

		this.changeShape = function(shape, actionTracking) {
			if (actionTracking) {
				_actions.push({action: "changeShape", shape: shape});
			}

			_shape = shape;
		}

		// when the user starts draging.
		// record user's mouse position
		this.startDrawing = function(event, actionTracking) {
			if (actionTracking) {
				_actions.push({action: "startDrawing", event: event});
			}

			_startPosition = {
				x: event.offsetX,
				y: event.offsetY
			}

			this.isDrawing = true;

			// keep last drawing position.
			_lastDrawingPosition = _startPosition;
		}

		// when the user stops dragging.
		// record user's mouse position
		this.stopDrawing = function(event, actionTracking) {

			if (actionTracking) {
				_actions.push({action: "stopDrawing", event: event});
			}

			_endPosition = {
				x: event.offsetX,
				y: event.offsetY
			};

			// calculate the size:
			var width = _endPosition.x - _startPosition.x;
			var height = _endPosition.y - _startPosition.y;

			switch(_shape) {
				case "rect":
					context.fillStyle = "black";
					context.fillRect(_startPosition.x, _startPosition.y, width, height);
					break;
				case "circle":
					context.beginPath();
					// context.fillStyle = "black";
					context.arc(_startPosition.x, _startPosition.y, width, 0, Math.PI * 2);
					context.fill();
					// context.stroke();
					break;
			}

			this.isDrawing = false;
		}

		this.continueDrawing = function(event, actionTracking) {
			// if not drawing with freehand tool, stop;
			if (!this.isDrawing || _shape != "freehand") {
				return;
			}

			if (actionTracking) {
				_actions.push({action: "continueDrawing", event: event});
			}

			context.stokeStyle = "black";
			context.lineJoin = "round";
			context.lineWidth = 3;
			context.moveTo(_lastDrawingPosition.x, _lastDrawingPosition.y);

			// keep the currect position as last.
			_lastDrawingPosition.x = event.offsetX;
			_lastDrawingPosition.y = event.offsetY;

			context.lineTo(event.offsetX, event.offsetY);
			context.stroke();
		}

		this.redraw = function() {
			console.log(_actions);
		}
	}

	// expose
	exports.Creator = Creator;
})(window);