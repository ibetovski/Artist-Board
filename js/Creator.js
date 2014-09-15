(function(exports) {
	"use strict";

	var maxActionsToSend = 10;
	// true if we send the actions to the server. Used not to redraw the image of the sender.
	var isSender = false;

	/**
	 * The creator of all shapes.
	 */
	 function Creator(callbacks) {

	 	trackTime();

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
	 	_actions = [],
	 	_lastActionTime;

	 	function getCurrentTime() {
	 		return (new Date()).getTime();
	 	}

	 	function sendActions(actionsToSend) {
	 		isSender = true;
	 		if (typeof callbacks.sendActions === 'function') {
	 			callbacks.sendActions.call(this, JSON.stringify(actionsToSend));
	 		}
	 	}

	 	function trackAction(action, arg) {
	 		var actionArguments = arg;
	 		var _actionsToSend;

	 		// we don't need the entire mouse event structure so we take only what we need.
	 		if (arg instanceof MouseEvent) {
	 			actionArguments = {
	 				offsetX: arg.offsetX,
	 				offsetY: arg.offsetY
	 			};
	 		}

	 		_actions.push({action: action, args: [actionArguments]});

	 		// track the last action time;
	 		_lastActionTime = getCurrentTime();

	 		// count the actions, when we reach some amount of actions, send them to the server.		
	 		if (_actions.length > maxActionsToSend) {
	 			_actionsToSend = _actions.splice(0,maxActionsToSend - 1);

	 			sendActions(_actionsToSend);
	 		}
	 	};

		// track the time as well.
	 	// if we have less actions for a short period, send them too;
	 	function trackTime() {
	 		var interval = setInterval(function() {
	 			if (_lastActionTime && (getCurrentTime() - _lastActionTime) > 1000) {
	 				if (_actions.length > 0 && _actions.length <= maxActionsToSend) {
	 					sendActions(_actions);
	 					_actions = [];
	 				}
	 			}
	 		}, 1000);
	 	}

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

		this.clearScene = function(actionTracking) {
			if (actionTracking) {
				trackAction('clearScene');
			}

			// Store the current transformation matrix
			_context.save();

			// Use the identity matrix while clearing the canvas
			_context.setTransform(1, 0, 0, 1, 0, 0);
			_context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);

			// Restore the transform
			_context.restore();

			// clear the canvas;
			// _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
		};

		this.redraw = function(actions) {

			// If I am the sender, do nothing.
			if (isSender) {
				return;
			}

			actions = actions || _actions;

			// iterate all actions and call every action.
			var actionItem;
			var action;

			var self = this;

			while(actions.length > 0) {
				actionItem = actions.shift();
				action = actionItem.action;
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