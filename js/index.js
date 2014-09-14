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

	WebSocket = WebSocket || MozWebSocket;

	// listen to sockets
	var socket = new WebSocket("ws://localhost:8282", 'handshake');
	console.log(socket.readyState);

	socket.onopen = function() {
		console.log('Sockets connection is established');
	};

	socket.onmessage = function(event) {
		console.log('socket data:', event.data);
	};

	socket.onerror = function() { 
        // websocket is closed.
        console.log("Socket Error", arguments); 
    };

	socket.onclose = function() { 
        // websocket is closed.
        console.log("Connection is closed...", arguments); 
    };

})(Creator);