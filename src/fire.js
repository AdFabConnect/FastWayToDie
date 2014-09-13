var userEvents  = require('./userEvents'),
    raf         = require('./raf'),
    avatar      = require('./avatar'),
    timer       = require('./timer'),
    hint        = require('./hint'),
    locker      = require('./locker'),
    Cloud       = require('./cloud');

module.exports = function(callBackEnd) {
  var Element = function(className, parent) {
    parent = typeof parent !== 'undefined' ? parent.div : document.body;
    this.div = document.createElement('div');
    parent.appendChild(this.div);
    this.div.className = className;
    this.div.id = className;
  };
  Element.prototype.changePositionLeft = function(pixel) {
    this.div.style.left = (this.getLeft() + pixel) + 'px';
  };
  Element.prototype.getLeft = function() {
    return this.div.getBoundingClientRect().left;
  };
  Element.prototype.getWidth = function() {
    return this.div.getBoundingClientRect().width; 
  };
  var fire = {
    sceneElem: null, 
    fireElem: null,
    avatarElem: null,
    callBackEnd: null,
    decalPxl: 35,
    canWin: false,
    scaleCloud: [1, 0.7],
    checkOrientation: function() {
      locker.lockPortrait();
      this.initFn = this.init.bind(this);

      if (window.innerWidth < window.innerHeight){
        window.addEventListener('orientationChange', this.initFn);
        window.addEventListener('resize', this.initFn);
      } else {
        this.init();
      }
    },
    init: function() { 
      window.removeEventListener('orientationChange', this.initFn);
      window.removeEventListener('resize', this.initFn);

      this.sceneElem  = new Element('sceneFire');
      this.fireElem   = new Element('fire', this.sceneElem);
      this.avatarElem = new Element('avatar',this.sceneElem);
      this.callBackEnd = callBackEnd;


      this.initAvatar();
      this.initFire();
      this.setFireMoving(-0.5);
      
      if ('ontouchend' in document) {
        this.decalPxl = 10;
        this.scaleCloud = [0.7 , 0.4];
        this.setDeviceSpec(80, 117);
      }
      this.initClouds(6);
      this.setListener(-8);
      hint.setHint('Tap to catch fire');
    },
    initAvatar: function() {
        this.avatarElem.div.innerHTML = avatar.getSvg();
        this.avatarElem.div.style.right   = '10px';
        this.avatarElem.div.style.left    = 'auto';
    },
    initFire: function() {
      var svg = '<svg class="fireSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="205px" height="246px" viewBox="0 0 205 246" version="1.1"><path d="M198.90613,157.677914 C206.662141,124.161969 182.003806,82.8312871 182.003806,82.8312871 C182.003806,82.8312871 169.140336,123.257432 146.376266,132.154102 C161.591453,108.108824 151.544222,79.0762405 133.494077,64.5397377 C76.3069369,14.7208591 70.5106752,-31.9507589 76.3069368,29.8158746 C60.3672194,99.6098993 13.9773158,121.460983 0.899273955,157.677914 C-1.12902977,205.982305 52.0929773,244.5 99.9027019,244.5 C147.712427,244.5 185.467068,215.751947 198.90613,157.677914 Z" class="flame" id="a" /><path d="M198.90613,157.677914 C206.662141,124.161969 182.003806,82.8312871 182.003806,82.8312871 C182.003806,82.8312871 169.140336,123.257432 146.376266,132.154102 C161.591453,108.108824 151.544222,79.0762405 133.494077,64.5397377 C76.3069369,14.7208591 70.5106752,-31.9507589 76.3069368,29.8158746 C60.3672194,99.6098993 13.9773158,121.460983 0.899273955,157.677914 C-1.12902977,205.982305 52.0929773,244.5 99.9027019,244.5 C147.712427,244.5 185.467068,215.751947 198.90613,157.677914 Z" class="flame" id="b" /><path d="M198.90613,157.677914 C206.662141,124.161969 182.003806,82.8312871 182.003806,82.8312871 C182.003806,82.8312871 169.140336,123.257432 146.376266,132.154102 C161.591453,108.108824 151.544222,79.0762405 133.494077,64.5397377 C76.3069369,14.7208591 70.5106752,-31.9507589 76.3069368,29.8158746 C60.3672194,99.6098993 13.9773158,121.460983 0.899273955,157.677914 C-1.12902977,205.982305 52.0929773,244.5 99.9027019,244.5 C147.712427,244.5 185.467068,215.751947 198.90613,157.677914 Z" class="flame" id="c" /><path d="M198.90613,157.677914 C206.662141,124.161969 182.003806,82.8312871 182.003806,82.8312871 C182.003806,82.8312871 169.140336,123.257432 146.376266,132.154102 C161.591453,108.108824 151.544222,79.0762405 133.494077,64.5397377 C76.3069369,14.7208591 70.5106752,-31.9507589 76.3069368,29.8158746 C60.3672194,99.6098993 13.9773158,121.460983 0.899273955,157.677914 C-1.12902977,205.982305 52.0929773,244.5 99.9027019,244.5 C147.712427,244.5 185.467068,215.751947 198.90613,157.677914 Z" class="flame" id="d" /></svg>';
      this.fireElem.div.innerHTML = svg;
    },
    initClouds: function(cpt) {
      for (var i = 0; i < cpt; i++) {
        var c = new Cloud();
        this.sceneElem.div.appendChild(c.getCloud((Math.random() * this.scaleCloud[0]) + this.scaleCloud[1], 0));
      }
    },
    setListener: function(pxl) {
      this.touchEndEvent = function touchEndEvent() {
        this.avatarElem.div.className = '';
      }.bind(this);

      this.touchStartEvent = function touchStartEvent() {
        this.avatarElem.changePositionLeft(pxl);
        this.avatarElem.div.style.right = 'auto';        
        this.avatarElem.div.className = 'run';
        if (this.canWin) {
          this.avatarElem.div.style.webkitTransition = 'left 300ms';
          this.checkCollision();
        }
        this.canWin = true;
      }.bind(this);

      document.body.addEventListener(userEvents.startEvent(), this.touchStartEvent, false);
      document.body.addEventListener(userEvents.endEvent(), this.touchEndEvent, false);
    },
    setFireMoving: function(pxl) { 
      var i = 0;
      raf.start(function() {
        if (i % 1 === 0) {
          this.fireElem.changePositionLeft(pxl);
          this.fireElem.div.style.right = 'auto'; 
        }
        i++;
      }.bind(this));
    },
    checkCollision: function() {
      if (this.avatarElem.getLeft() - (this.fireElem.getLeft() + this.fireElem.getWidth() - this.decalPxl) <= 0) { 
        this.destroyGame(true);
      }
    },
    setDeviceSpec: function(w, h) {
      var fireSvg = document.querySelector('.sceneFire .fireSvg'),
          avatarSvg = document.querySelector('.sceneFire .left');

      fireSvg.style.width = w;
      fireSvg.style.height = h;
      avatarSvg.style.width = w;
      avatarSvg.style.height = h;
    },
    destroyGame: function(state) {
      hint.setHint('');

      document.body.removeEventListener(userEvents.startEvent(), this.touchStartEvent, false);
      document.body.removeEventListener(userEvents.endEvent(), this.touchEndEvent, false);

      this.sceneElem.div.parentNode.removeChild(this.sceneElem.div);

      this.callBackEnd(state);
      timer.stop();
    }
  };

  timer.start([12, 9, 6, 5, 4, 3, 2, 1][parseInt(window.levelIndex / window.gamesLength)], function() {
    fire.destroyGame(false);
  }); 

  fire.checkOrientation();
  return fire;
};
