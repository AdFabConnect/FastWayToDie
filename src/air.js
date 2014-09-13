var userEvents = require('./userEvents'),
    timer = require('./timer'),
    avatar = require('./avatar'),
    hint = require('./hint'),
    locker = require('./locker'),
    fan = require('./fan');

var Air = {
  start: function(callBackEnd) {
    this.callBackEnd = callBackEnd;
    this.setListener();
    locker.lockPortrait();
    
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
    
    skyrocket.style.left = w * 1 / 2 + 'px';
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
      };
        
    var touchEndEvent = function touchEndEvent(e) {        
      endX = lastMove.touches ? lastMove.touches[0].pageX : lastMove.pageX;

      var d = endX - startX;
      var p = parseInt(skyrocket.style.left);
      
      if (lastMove.touches){
          var complexity = 1-parseInt(window.levelIndex/window.gamesLength)*0.3;

          if (parseInt(d) <= 50){
              skyrocket.style.left = (p + d * complexity) + 'px';
     
              if (p > w-10){
                status = true;
                destroyGame();
              }
          }
      } else {
          if (d === parseInt(d)){
            
            skyrocket.style.left = (p + d * 2) + 'px';    
      
            if (p > w - 200){
              status = true;
              destroyGame();
            }
              
            if (p > w * 3 / 4){
              f = 3;
            } else if (p > w / 2){
              f = 2;
            } else if (p > w / 4){
              f = 1;
            } else {
              f = 0.5;
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
