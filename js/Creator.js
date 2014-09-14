(function(exports) {
	"use strict";

	/**
	 * The creator of all shapes.
	 */
	function Creator() {

	 	var _context;
	 	var canvas = document.getElementById("scene-canvas");
	 	if (typeof canvas.getContext != "undefined") {
	 		_context = canvas.getContext("2d");
	 	} else {
	 		canvas.innerHTML = "This browser doesn't support HTML5 canvas";
	 		return;
	 	}

	 	var _shape = "freehand",
	 	_startPosition,
	 	_endPosition,
	 	_lastDrawingPosition,
	 	_actions = [];

	 	function trackAction(action, arg) {
	 		var actionArguments = arg;

	 		// we don't need the entire mouse event structure so we take only what we need.
	 		if (arg instanceof MouseEvent) {
	 			actionArguments = {
	 				offsetX: arg.offsetX,
	 				offsetY: arg.offsetY
	 			};
	 		}

	 		_actions.push({action: action, args: [actionArguments]});
	 	};

	 	this.getCanvas = function() {
	 		return canvas;
	 	};

	 	this.changeShape = function(shape, actionTracking) {
	 		if (actionTracking) {
	 			trackAction("changeShape", shape);
	 		}

	 		_shape = shape;
		};

		// when the user starts draging.
		// record user's mouse position
		this.startDrawing = function(event, actionTracking) {
			if (actionTracking) {
				trackAction("startDrawing", event);
			}

			_startPosition = {
				x: event.offsetX,
				y: event.offsetY
			};

			this.isDrawing = true;

			// keep last drawing position.
			_lastDrawingPosition = _startPosition;
		};

		// when the user stops dragging.
		// record user's mouse position
		this.stopDrawing = function(event, actionTracking) {

			if (actionTracking) {
				trackAction("stopDrawing", event);
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
				_context.fillStyle = "black";
				_context.fillRect(_startPosition.x, _startPosition.y, width, height);
				break;
				case "circle":
				_context.beginPath();
					// _context.fillStyle = "black";
					_context.arc(_startPosition.x, _startPosition.y, width, 0, Math.PI * 2);
					_context.fill();
					// _context.stroke();
					break;
				}

				this.isDrawing = false;
			};

			this.continueDrawing = function(event, actionTracking) {
				// if not drawing with freehand tool, stop;
				if (!this.isDrawing || _shape != "freehand") {
					return;
				}

				if (actionTracking) {
					trackAction("continueDrawing", event);
				}

				_context.stokeStyle = "black";
				_context.lineJoin = "round";
				_context.lineWidth = 3;
				_context.moveTo(_lastDrawingPosition.x, _lastDrawingPosition.y);

				// keep the currect position as last.
				_lastDrawingPosition.x = event.offsetX;
				_lastDrawingPosition.y = event.offsetY;

				_context.lineTo(event.offsetX, event.offsetY);
				_context.stroke();
			};

			this.redraw = function(actions) {

				actions = actions || _actions;

				// clear the canvas;
				// _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);

				// iterate all actions and call every action.
				var actionItem;
				var action;

				var self = this;

				while(actions.length > 0) {
					actionItem = actions.shift();
					action = actionItem.action;
					console.log(action, typeof actionItem.action);
					self[action].apply(self, actionItem.args);
				}
			};

			this.getTrackedActions = function() {
				return _actions;
			}
	}

	// expose
	exports.Creator = Creator;
})(window);