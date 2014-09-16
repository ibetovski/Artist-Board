(function(exports, Tool) {
	"use strict";
	function FreeHand(options) {

		this.startPosition = {
			x: options.x,
			y: options.y
		};

		this.name = 'FreeHand';
		this.context = options.context;

		// console.log('context:', this.context);

		this.continueDrawing = function(x, y) {

			// if not drawing with freehand tool, stop;
			if (!this.isDrawing) {
				return;
			}

			// debugger;
			this.context.stokeStyle = "black";
			this.context.lineJoin = "round";
			this.context.lineWidth = 3;
			this.context.moveTo(this.lastDrawingPosition.x, this.lastDrawingPosition.y);

			// keep the currect position as last.
			this.lastDrawingPosition.x = x;
			this.lastDrawingPosition.y = y;

			this.context.lineTo(x, y);
			this.context.stroke();
		};


		this.stopDrawing = function() {
			this.isDrawing = false;
		}
	}

	// inheritance
	FreeHand.prototype = new Tool();
	FreeHand.prototype.constructor = FreeHand;

	exports.FreeHand = FreeHand;
})(window, Tool);