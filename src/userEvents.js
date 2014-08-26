module.exports = {

	touch : 'ontouchend' in document,

	startEvent : function() {
		return (this.touch) ? 'touchstart' : 'mousedown';
	},

	moveEvent : function() {
		return (this.touch) ? 'touchmove' : 'mousemove';
	},

	endEvent : function() {
		return (this.touch) ? 'touchend' : 'mouseup';
	}

};
