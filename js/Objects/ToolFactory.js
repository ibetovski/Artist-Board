// Tool factory is meant to create every object we need.
(function(exports, Circle, Rectangle, FreeHand) {
	"use strict";

	function ToolFactory() {};

	// by Default we will create freehand tool.
	ToolFactory.prototype.toolClass = FreeHand;

	ToolFactory.prototype.createTool = function(options) {
		switch(options.toolType) {
			case "circle":
				this.toolClass = Circle;
				break;
			case "rect":
				this.toolClass = Rectangle;
				break;
			case "freehand":
				this.toolClass = FreeHand;
				break;
		}

		console.log('[Factor] Create tool');
		return new this.toolClass(options);
	};

	exports.ToolFactory = ToolFactory;

})(window, Circle, Rectangle, FreeHand);