(function(exports, Tool) {
	"use strict";
	function Rectangle(options) {

		this.startPosition = {
			x: options.x,
			y: options.y
		};

		this.name = 'Rectangle';

		this.stopDrawing = function() {
			this.fillStyle = "black";
			_context.fillRect(_startPosition.x, _startPosition.y, this.width, this.height);

			this.isDrawing = false;
		}
	}

	// inheritance
	Rectangle.prototype = new Tool();
	Rectangle.prototype.constructor = Rectangle;

	exports.Rectangle = Rectangle;
})(window, Tool);