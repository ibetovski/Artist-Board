(function(exports) {
	"use strict";
	function Messenger(callbacks) {

		// WebSocket comunication.
		WebSocket = WebSocket || MozWebSocket;

		// listen to sockets
		var socket = new WebSocket("ws://" + window.location.hostname + ":8282", 'handshake');

		socket.onopen = function() {
			console.log('Sockets connection is established');
		};

		socket.onmessage = function(event) {
			if (typeof callbacks.onNewMessage === "function") {
				console.log('[Messenger] Received actions...');
	    		callbacks.onNewMessage.call(this, JSON.parse(event.data));
	    	}
		};

		socket.onerror = function() { 
	        // websocket is closed.
	        console.log("Socket Error", arguments); 
	    };

	    socket.onclose = function() { 
	        // websocket is closed.
	        console.log("Connection is closed...", arguments); 
	    };	    

	    this.send = function(data) {
	    	console.log('[Messenger] Sending actions...', data);
	    	var r = new XMLHttpRequest();
	 		r.open("POST", "http://" + window.location.hostname + ':8080/track-actions', true);
	 		r.onreadystatechange = function () {
	 			if (r.readyState != 4 || r.status != 200) return; 
	 			console.log(r.responseText);
	 		};
	 		r.send(data);
	    }
	}

	exports.Messenger = Messenger;
})(window);