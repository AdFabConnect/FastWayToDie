var userEvents = require('./userEvents'),
    timer = require('./timer');

var Water = {

  start: function() {
    this.ocean = document.getElementById('ocean');
    document.body.classList.add('water');
    this.setListener();
    this.createWave();
  },

  stop: function() {
    this.removeListener();
  },

  destroyWave: function() {
    while (this.ocean.hasChildNodes()) {
      this.ocean.removeChild(this.ocean.lastChild);
    }
  },

  createWave: function() {
    var waveWidth = 10,
        waveCount = Math.floor(window.innerWidth / waveWidth),
        docFrag = document.createDocumentFragment();

    Water.destroyWave();

    for (var i = 0; i < waveCount; i++){
      var wave = document.createElement('div');
      wave.className += ' wave';
      docFrag.appendChild(wave);
      wave.style.left = i * waveWidth + 'px';
      wave.style.webkitAnimationDelay = (i / 100) + 's';
    }
    
    this.ocean.appendChild(docFrag);
  },

  addFish: function(el) {
    el.innerHTML = '<svg width="56px" height="37px" viewBox="0 0 56 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><g sketch:type="MSLayerGroup" transform="translate(-3.000000, -6.000000)"><path d="M58.8828123,23.479248 C57.3488511,22.5564312 46.7842473,28.9466052 46.5249023,28.4672852 C44.6475157,24.9975092 39.2845478,16.7891955 31.0158617,9.83110781 C23.1499023,3.21191406 7.184655,6.50878227 3.756348,14.9941399 C3.49320506,15.6454415 16.7949214,16.5286118 23.578125,22.0722656 C26.0390625,24.0834961 5.05343177,19.3847346 5.35819767,20.8674701 C6.57518416,26.7883069 13.8939811,30.5446441 22.7749023,31.9672852 C32.5671719,33.5359157 41.9631187,32.0045908 45.8999023,30.2260742 C46.3046003,30.0432443 51.844737,42.0668246 53.3203135,42.4167477 C55.122234,42.8440612 52.2024006,31.1555224 52.2749023,30.9760742 C52.322745,30.8576595 60.2590818,24.3071989 58.8828123,23.479248 Z" fill="#EB6B33" sketch:type="MSShapeGroup"></path><path d="M19.0004064,16.9110771 C20.3811183,16.9110771 21.5004064,15.791789 21.5004064,14.4110771 C21.5004064,13.0303653 20.3811183,11.9110771 19.0004064,11.9110771 C17.6196945,11.9110771 16.5004064,13.0303653 16.5004064,14.4110771 C16.5004064,15.791789 17.6196945,16.9110771 19.0004064,16.9110771 Z" fill="#000000" sketch:type="MSShapeGroup"></path></g></svg>';
  },

  setListener: function() {
    var documentBody = document.body,
        screenWith = window.innerHeight,
        wrapperShake = document.querySelector('#avatar'),
        svgShake = wrapperShake.querySelector('#avatar svg'),
        fish1 = document.getElementById('fish-1'),
        fish2 = document.getElementById('fish-2'),
        currentDistance = 0,
        direction = 'left',
        isMoving = false,
        isFinished = false,
        currentX = 0,
        startX = 0,
        rafID;

    fish2.style.bottom = fish1.style.bottom = fish2.style.left = fish1.style.right = '0px';

    this.addFish(fish1);
    this.addFish(fish2);

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

      isMoving = (Math.abs(currentDistance) > window.innerWidth * 0.3);
    };

    var touchStartEvent = function touchStartEvent(e) {
      currentX = startX =  e.touches ? e.touches[0].pageX : e.pageX;
      documentBody.addEventListener(userEvents.moveEvent(), touchMoveEvent, false);
    };

    var touchEndEvent = function touchEndEvent() {
      documentBody.removeEventListener(userEvents.moveEvent(), touchMoveEvent, false);
    };

    var destroyGame = function() {
      documentBody.removeEventListener(userEvents.startEvent(), touchStartEvent, false);
      documentBody.removeEventListener(userEvents.moveEvent(), touchMoveEvent, false);
      documentBody.removeEventListener(userEvents.endEvent(), touchEndEvent, false);
      timer.stop();
      isFinished = true;
      cancelAnimationFrame(rafID);
    };

    var moveFish = function() {
      var quaterHeight = window.innerHeight * 0.2,
          halfWidthHit = window.innerWidth * 0.4,
          goBack = window.innerWidth < 400 ? 0.7 : 0.4,
          fishBottom = parseInt(fish2.style.bottom),
          nb = Math.ceil(Math.abs(currentDistance / 100)),
          newRight = (parseInt(fish1.style.right) + nb);

      if (!isMoving) {
        fish2.style.left = (parseInt(fish2.style.left) - goBack) + 'px';
        fish1.style.right = (parseInt(fish1.style.right) - goBack) + 'px';
      } else {
        fish2.style.left = ((parseInt(fish2.style.left) + nb) + 'px');
        fish1.style.right = newRight + 'px';
      }

      if (quaterHeight > fishBottom){
        fish2.style.bottom = fish1.style.bottom = (fishBottom + nb) + 'px';
      }

      if (!isFinished && newRight > halfWidthHit){
        window.alert('YOUR DEAD');
        destroyGame();
      } else {
        requestAnimationFrame(moveFish);
      }
    };

    rafID = requestAnimationFrame(moveFish);

    documentBody.addEventListener(userEvents.startEvent(), touchStartEvent, false);
    documentBody.addEventListener(userEvents.endEvent(), touchEndEvent, false);

    window.addEventListener('orientationchange', this.createWave, false);
    window.addEventListener('resize', this.createWave, false);

    timer.start(10, function() {
      window.alert('YOU LOSE');
      destroyGame();
    });
    
  },

  removeListener: function() {
    window.removeEventListener('orientationchange', this.createWave, false);
    window.removeEventListener('resize', this.createWave, false);
  }

};

module.exports = Water;
