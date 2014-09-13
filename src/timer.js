module.exports = {

  timer: null,
  timerElement: null,

  create: function() {
    this.timerElement = document.createElement('div');
    this.timerElement.id = 'counter-time';
    document.body.appendChild(this.timerElement);
  },

  start: function(duration, callBack) {

    if (!this.timerElement){
      this.create();
    }

    if (this.timer){
      this.stop();
    }
    
    var timerElement = this.timerElement;

    this.timerElement.innerHTML = 0;

    this.timer = setInterval(function() {
      timerElement.innerHTML = duration;
      if (duration-- < 0){
        callBack();
      }
    }, 1000);
  },

  stop: function() {
    this.timerElement.innerHTML = '';
    clearInterval(this.timer);
    this.timer = null;
  }

};
