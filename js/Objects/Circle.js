(function(exports, Tool) {
	"use strict";
	function Circle(options) {

		this.name = 'circle';
		this.context = options.context;

		this.continueDrawing = function() {}

		this.stopDrawing = function() {

			Circle.prototype.stopDrawing.apply(this, arguments);

			this.context.beginPath();
			// this.context.fillStyle = "black";
			this.context.arc(this.startX, this.startY, this.width, 0, Math.PI * 2);
			this.context.fill();
		}
	}

	// inheritance
	Circle.prototype = Tool.prototype;
	Circle.prototype.constructor = Circle;

	exports.Circle = Circle;
})(window, Tool);