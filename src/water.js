var userEvents = require('./userEvents');

module.exports = {

  start: function() {
    this.setListener();
  },

  setListener: function() {
    var documentBody = document.body,
        screenWith = window.innerHeight,
        wrapperShake = document.querySelector('#shake'),
        svgShake = wrapperShake.querySelector('#shake svg'),
        currentDistance = 0,
        direction = 'left',
        currentX = 0,
        startX = 0;
    
    var getBounceType = function() {
      return (currentDistance > (screenWith * 0.45))
              ?
                ((currentDistance > (screenWith * 0.75)) ? '-heavy' : '-hard')
              :
                '';
    };

    var bounce = function bounce() {
      var bounceType = getBounceType();
      if (wrapperShake.classList.contains('bounce')){
        wrapperShake.classList.remove('bounce');
      }
      if (wrapperShake.classList.contains('bounce-hard')){
        wrapperShake.classList.remove('bounce-hard');
      }
      if (wrapperShake.classList.contains('bounce-heavy')){
        wrapperShake.classList.remove('bounce-heavy');
      }
      
      wrapperShake.classList.add('bounce' + bounceType);
      var t = setTimeout(function() {
        wrapperShake.classList.remove('bounce' + bounceType);
        clearTimeout(t);
      }, 50);
    };

    var touchMoveEvent = function touchMoveEvent(e) {
      e.preventDefault();

      var newDirection = (currentX > (e.touches ? e.touches[0].pageX : e.pageX)) ? 'left' : 'right';
      currentX = e.touches ? e.touches[0].pageX : e.pageX;

      if (direction !== newDirection){
        svgShake.classList.remove(direction);
        direction = newDirection;
        startX = currentX;
        svgShake.classList.add(direction);
        bounce();
      }
      
      currentDistance = ((currentX < startX) ? -Math.abs(currentX - startX) : Math.abs(currentX - startX));

      console.log(direction);
    };

    var touchStartEvent = function touchStartEvent(e) {
      currentX = startX =  e.touches ? e.touches[0].pageX : e.pageX;
      documentBody.addEventListener(userEvents.moveEvent(), touchMoveEvent, false);
    };

    var touchEndEvent = function touchEndEvent() {
      documentBody.removeEventListener(userEvents.moveEvent(), touchMoveEvent, false);
    };

    documentBody.addEventListener(userEvents.startEvent(), touchStartEvent, false);
    documentBody.addEventListener(userEvents.endEvent(), touchEndEvent, false);

  }

};
