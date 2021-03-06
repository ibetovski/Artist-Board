(function(Messenger, ToolFactory, ActionTracker) {

	"use strict";

	// The callback will be executed when new socket message appears.
	// todo: better with promises.
	var messenger = new Messenger({
		onNewMessage: function(actions) {
			// creator.drawByActions(actions);

			for (var i in actions) {
				toolCreator.createTool({ toolType: actions[i].toolType }).
					create({
						startX: actions[i].startX,
						startY: actions[i].startY,
						endX: actions[i].endX,
						endY: actions[i].endY
					});
			}
		}
	});

	// todo: better with promises.
	var canvas = document.getElementById("scene-canvas");
 	if (typeof canvas.getContext == "undefined") {
 		canvas.innerHTML = "This browser doesn't support HTML5 canvas";
 		return;
 	}

	// listen for click and get mouse position.

	var tool;
	var currentToolType;
	var toolCreator = new ToolFactory(canvas);
	var actionTracker = new ActionTracker({onEmit: messenger.send.bind(messenger)});

	/**
	 * Use this to fix the differences between Chrome and Mozila.
	 */
	function fixEvent(e) {
		var curleft;
		var curtop;
		var obj;

	    if (!e.hasOwnProperty('offsetX')) {
	        curleft = curtop = 0;
	        if (e.target.offsetParent) {
	           obj=e.target;
	           do {
	              curleft += obj.offsetLeft;
	              curtop += obj.offsetTop;
	           } while (obj = obj.offsetParent);
	        }
	        e.offsetX=e.layerX-curleft;
	        e.offsetY=e.layerY-curtop;
	    }

	    return e;
	}

	var _startX,
		_startY;

	canvas.addEventListener("mousedown", function(event) {
		var e = fixEvent(event);

		tool = toolCreator.createTool({
			toolType: currentToolType
		});

		_startX = e.offsetX;
		_startY = e.offsetY;

		// tool.startDrawing();
	}, false);

	canvas.addEventListener("mousemove", function(event) {
		var e = fixEvent(event);

		if (typeof tool != "undefined") {
			tool.continueDrawing(e.offsetX, e.offsetY);
		}
	}, false);

	canvas.addEventListener("mouseup", function(event) {
		var e = fixEvent(event);

		tool.create({
			startX: _startX,
			startY: _startY,
			endX: event.offsetX,
			endY: event.offsetY
		});

		// tool.stopDrawing(e.offsetX, e.offsetY);
		actionTracker.add(tool.name, tool.startX, tool.startY, e.offsetX, e.offsetY);
	}, false);



	// listen on click on every shape to draw.
	var buttons = document.getElementsByClassName("button-shape");

	for(var i=0; i<buttons.length; i++) {
		(function() {
			buttons[i].addEventListener('click', function() {
				currentToolType = this.getAttribute("data-shape");
				// creator.changeShape(shape, true);
			});
		})(i);
	}

	// keep all the actions and repeat them.
	var actionButtons = document.getElementsByClassName("button-action");

	for(var i=0; i<actionButtons.length; i++) {
		(function() {
			actionButtons[i].addEventListener('click', function() {
				// get the tracked actions and send them to the server.
				creator.clearScene(true);
			});
		})(i);
	}

})(Messenger, ToolFactory, ActionTracker);