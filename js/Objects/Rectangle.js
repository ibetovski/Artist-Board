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

			Rectangle.prototype.stopDrawing.apply(this, arguments);

			this.fillStyle = "black";
			this.context.fillRect(this.startPosition.x, this.startPosition.y, this.width, this.height);

			this.isDrawing = false;
		}
	}

	// inheritance
	Rectangle.prototype = Tool.prototype;
	Rectangle.prototype.constructor = Rectangle;

	exports.Rectangle = Rectangle;
})(window, Tool);