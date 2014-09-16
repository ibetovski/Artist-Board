(function(exports, Tool) {
	"use strict";
	function Circle(options) {

		this.startPosition = {
			x: options.x,
			y: options.y
		};

		this.name = 'Circle';
		this.context = options.context;

		this.continueDrawing = function() {}

		this.stopDrawing = function() {

			Circle.prototype.stopDrawing.apply(this, arguments);

			this.context.beginPath();
			// this.context.fillStyle = "black";
			this.context.arc(this.startPosition.x, this.startPosition.y, this.width, 0, Math.PI * 2);
			this.context.fill();
		}
	}

	// inheritance
	Circle.prototype = Tool.prototype;
	Circle.prototype.constructor = Circle;

	exports.Circle = Circle;
})(window, Tool);