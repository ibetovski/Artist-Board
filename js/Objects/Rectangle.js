(function(exports, Tool) {
	"use strict";
	function Rectangle(options) {


		this.startPosition = {
			x: options.x,
			y: options.y
		};

		this.name = 'Rectangle';
		this.context = options.context;

		this.continueDrawing = function() {		}

		this.stopDrawing = function(x, y) {

			this.width = x - this.startPosition.x;
			this.height = y - this.startPosition.y;

			this.fillStyle = "black";
			this.context.fillRect(this.startPosition.x, this.startPosition.y, this.width, this.height);

			this.isDrawing = false;
		}
	}

	// inheritance
	Rectangle.prototype = new Tool();
	Rectangle.prototype.constructor = Rectangle;

	exports.Rectangle = Rectangle;
})(window, Tool);