var userEvents = require('./userEvents'),
    timer = require('./timer'),
    avatar = require('./avatar'),
    hint = require('./hint'),
    locker = require('./locker'),
    fan = require('./fan');

var Air = {
  start: function(callBackEnd) {
    this.callBackEnd = callBackEnd;
    locker.lockPortrait();
    this.setListener();
    
    hint.setHint('Swipe on the hero to get crushed by the fan !');
  },
    
  setListener: function() {
      
    var w = window.screen.availWidth,
        skyrocket = document.getElementById('air'),
        fanDiv = document.getElementById('fanPlace'),
        hulaup = avatar.getAvatar(),
        ventilo = fan.getFan(),
        f = 0.5,
        startX, 
        endX,
        thisIsTheEnd = this.callBackEnd,
        status = false,
        lastMove = null,
        rafID,
        isFinished = false;
    
    skyrocket.style.left = w * 1 / 3 + 'px';
    ventilo.start();
    skyrocket.insertBefore(hulaup, skyrocket.firstChild);
    fanDiv.insertBefore(ventilo, fanDiv.firstChild);
    fanDiv.style.display = 'block';
    
    var wind = function(){
      skyrocket.style.left = (parseInt(skyrocket.style.left) - f) + 'px';
      if (!isFinished) {
        requestAnimationFrame(wind);
      }
    };
        
    var touchMoveEvent = function touchMoveEvent(e) {
      e.preventDefault();
      lastMove = e;
    };
          
    var touchStartEvent = function touchStartEvent(e) {
      startX =  e.touches ? e.touches[0].pageX : e.pageX;
      skyrocket.addEventListener(userEvents.moveEvent(), touchMoveEvent, false);
    };
    
    var destroyGame = function() {
        document.body.removeEventListener(userEvents.startEvent(), touchStartEvent, false);
        document.body.removeEventListener(userEvents.moveEvent(), touchMoveEvent, false);
        document.body.removeEventListener(userEvents.endEvent(), touchEndEvent, false);
        timer.stop();
        ventilo.stop();
        locker.unlock();
        f = 0;
        cancelAnimationFrame(rafID);
        isFinished = true;
        rafID = null;
        thisIsTheEnd(status);
        fanDiv.style.display = 'none';
        skyrocket.removeChild(hulaup);
        fanDiv.removeChild(ventilo);
        
      };
        
    var touchEndEvent = function touchEndEvent() {        
      endX = lastMove.touches ? lastMove.touches[0].pageX : lastMove.pageX;

      var d = endX - startX;
      var p = parseInt(skyrocket.style.left);
      var complexity = window.levelIndex + 1;
      
      //debug = document.getElementById('debug');
      //debug.innerHTML = 'dep : ' + (p + d * 3/complexity) + 'px' + ' - width : ' + document.getElementById('air').offsetWidth + ' - complexity : ' + complexity + ' - swipe : '+parseInt(d) + ' - w : '+ w + ' - p : ' + p;
      
      if (lastMove.touches){
          if (parseInt(d) <= 50 && parseInt(d) > 0){
              skyrocket.style.left = (parseInt(skyrocket.style.left) + d * 1.2 / complexity) + 'px';
     
              if (parseInt(skyrocket.style.left) > w - 50){
                status = true;
                destroyGame();
              }
          }
      } else {
          if (d === parseInt(d)){

            skyrocket.style.left = (parseInt(skyrocket.style.left) + d * 2 / complexity) + 'px';    
      
            if (parseInt(skyrocket.style.left) > w - document.getElementById('air').offsetWidth){
              status = true;
              destroyGame();
            }
          }
      }
    
      skyrocket.removeEventListener(userEvents.moveEvent(), touchMoveEvent, false);
    };
      
    skyrocket.addEventListener(userEvents.startEvent(), touchStartEvent, false);
    skyrocket.addEventListener(userEvents.endEvent(), touchEndEvent, false);       
    rafID = requestAnimationFrame(wind);
    timer.start(10, function() {
      status = false;
      destroyGame();
    });
  }
};

module.exports = function(cb) {
  Air.start(cb);
};
