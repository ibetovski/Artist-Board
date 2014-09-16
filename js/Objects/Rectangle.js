(function(exports, Tool) {
	"use strict";
	function Rectangle(options) {

		this.name = 'rect';
		this.context = options.context;

		this.continueDrawing = function() {		};

		this.stopDrawing = function(x, y) {

			Rectangle.prototype.stopDrawing.apply(this, arguments);

			this.fillStyle = "black";
			this.context.fillRect(this.startX, this.startY, this.width, this.height);

			this.isDrawing = false;
		};
	}

	// inheritance
	Rectangle.prototype = Tool.prototype;
	Rectangle.prototype.constructor = Rectangle;

	exports.Rectangle = Rectangle;
})(window, Tool);