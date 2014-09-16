(function(exports) {

	"use strict";

	// Tool is the parent to be extended by every shape/tool.
	// This should contain the drawing methods.
	//   startDrawing
	//   continueDrawing
	//   stopDrawing

	function Tool() {
		this.name = 'Tool';
		
		// shape drawing properties.
		this.width = 0;
		this.height = 0;
		this.fillStyle = "black";
		
		this.isDrawing = false;
		this.lastDrawingPosition = {};
	}
	
	Tool.prototype.startDrawing = function(event) {
		this.isDrawing = true;
		if (typeof this.startPosition != 'undefined') {
			console.log("[Position] Set last position");
			this.lastDrawingPosition = this.startPosition;
		}

		// throw Error("Please implement startDrawing function");

			// _startPosition = {
			// 	x: event.offsetX,
			// 	y: event.offsetY
			// };

			// keep last drawing position.
			// this.lastDrawingPosition = _startPosition;
	}

	Tool.prototype.continueDrawing = function() {
		throw Error("Please implement continueDrawing function");
	}

	Tool.prototype.stopDrawing = function(event) {

		this.endPosition = {
			x: event.offsetX,
			y: event.offsetY
		};

		// calculate the size:
		var width = _endPosition.x - _startPosition.x;
		var height = _endPosition.y - _startPosition.y;

		this.isDrawing = false;

		// throw Error("Please implement stopDrawing function");
	}

	exports.Tool = Tool;
})(window);