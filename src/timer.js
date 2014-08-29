module.exports = {

  timer: null,

  start: function(duration, callBack) {
    if (this.timer){
      this.stop();
    }

    this.timer = setInterval(function() {
      console.log(duration);
      if (duration-- < 0){
        callBack();
      }
    }, 1000);
  },

  stop: function() {
    clearInterval(this.timer);
    this.timer = null;
  }

};
