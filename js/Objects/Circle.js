(function(exports, Tool) {
	"use strict";
	function Circle(options) {

		this.startPosition = {
			x: options.offsetX,
			y: options.offsetY
		};

		this.name = 'Circle';
		this.stopDrawing = function() {

			Circle.prototype.stopDrawing.apply(this, arguments);

			this.context.beginPath();
			// this.context.fillStyle = "black";
			this.context.arc(_startPosition.x, _startPosition.y, width, 0, Math.PI * 2);
			this.context.fill();
		}
	}

	// inheritance
	Circle.prototype = new Tool();
	Circle.prototype.constructor = Circle;

	exports.Circle = Circle;
})(window, Tool);