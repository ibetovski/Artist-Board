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
	}

	Tool.prototype.continueDrawing = function() {
		throw Error("Please implement continueDrawing function");
	}

	Tool.prototype.stopDrawing = function(x, y) {

		this.endPosition = {
			x: x,
			y: y
		};

		// calculate the size:
		this.width = x - this.startPosition.x;
		this.height = y - this.startPosition.y;

		this.isDrawing = false;
	}

	exports.Tool = Tool;
})(window);