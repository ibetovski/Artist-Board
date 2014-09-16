(function(exports) {
	"use strict";

	var MAX_ACTIONS_TO_SEND = 20;
	var _actions = [];
	var _lastActionTime;

	function _getCurrentTime() {
 		return (new Date()).getTime();
 	}

	function ActionTracker(options) {
		// this function will be called when there are actions to be sent.
		this.onEmit = options.onEmit;

		// start waiting for the Artist
		this.checkTime();
	}

	ActionTracker.prototype.add = function(toolType, startX, startY, endX, endY) {
		_actions.push({
			toolType: toolType,
			startX: startX,
			startY: startY,
			endX: endX,
			endY: endY
		});

		_lastActionTime = _getCurrentTime();
	}

	ActionTracker.prototype.checkTime = function() {
		var self = this;
		var interval = setInterval(function() {
 			if (_lastActionTime && (_getCurrentTime() - _lastActionTime) > 1000) {
 				if (_actions.length > 0 && _actions.length <= MAX_ACTIONS_TO_SEND) {
 					self.onEmit(JSON.stringify(_actions));
 					_actions = [];
 				}
 			}
 		}, 1000);
	}

	ActionTracker.prototype.checkCount = function() {
		var _actionsToSend;

		// count the actions, when we reach some amount of actions, send them to the server.		
 		if (_actions.length > MAX_ACTIONS_TO_SEND) {
 			_actionsToSend = _actions.splice(0,MAX_ACTIONS_TO_SEND - 1);

 			this.onEmit(JSON.stringify(_actionsToSend));
 		}
	}

	ActionTracker.prototype.get = function() {
		return _actions;
	}

	exports.ActionTracker = ActionTracker;

})(window);