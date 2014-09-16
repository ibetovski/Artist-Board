(function(Creator, Messenger, ToolFactory) {

	"use strict";

	// The callback will be executed when new socket message appears.
	// todo: better with promises.
	// var messenger = new Messenger({
	// 	onNewMessage: function(actions) {
	// 		creator.drawByActions(actions);
	// 	}
	// });

	// todo: better with promises.
	var creator = new Creator({
		sendActions: function(actions) {
			messenger.send(actions);
		}
	});

	var canvas = creator.getCanvas();
	var context = canvas.getContext("2d");

	// listen for click and get mouse position.


	var _actions;
	// function trackAction(action, arg) {
	// 	var actionArguments = arg;
	// 	var _actionsToSend;

	// 	// we don't need the entire mouse event structure so we take only what we need.
	// 	if (arg instanceof MouseEvent) {
	// 		actionArguments = {
	// 			clientX: arg.clientX,
	// 			clientY: arg.clientY
	// 		};
	// 	}

	// 	_actions.push({action: action, args: [actionArguments]});

	// 	// track the last action time;
	// 	// _lastActionTime = getCurrentTime();

	// 	// count the actions, when we reach some amount of actions, send them to the server.		
	// 	// if (_actions.length > maxActionsToSend) {
	// 	// 	_actionsToSend = _actions.splice(0,maxActionsToSend - 1);

	// 	// 	sendActions(_actionsToSend);
	// 	// }
	// };

	var tool;
	var currentToolType;
	var toolCreator = new ToolFactory();

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

	canvas.addEventListener("mousedown", function(event) {
		var e = fixEvent(event);
		console.log('1', currentToolType);
		tool = toolCreator.createTool({
			toolType: currentToolType,
			x: e.offsetX,
			y: e.offsetY,
			context: context
		});

		tool.startDrawing();

		// creator.startDrawing(event, true);
	}, false);

	canvas.addEventListener("mousemove", function(event) {
		var e = fixEvent(event);
		console.log('2');
		if (typeof tool != "undefined") {
			tool.continueDrawing(e.offsetX, e.offsetY);
		}
	}, false);

	canvas.addEventListener("mouseup", function(event) {
		var e = fixEvent(event);
		tool.stopDrawing(e);
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

})(Creator, Messenger, ToolFactory);