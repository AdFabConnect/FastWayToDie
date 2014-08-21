module.exports = {

  touch : 'ontouchend' in document,

  startEvent : (this.touch) ? 'touchstart' : 'mousedown',

  moveEvent : (this.touch) ? 'touchmove' : 'mousemove',

  endEvent : (this.touch) ? 'touchend' : 'mouseup'
    
};
