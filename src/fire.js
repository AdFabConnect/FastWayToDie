var userEvents  = require('./userEvents'),
    raf         = require('./raf'),
    avatar      = require('./avatar'),
    timer       = require('./timer'),
    Cloud       = require('./cloud');

module.exports = function(callBackEnd) {
  var Element = function(className, elemType, parent) {
    parent = typeof parent !== 'undefined' ? parent.div : document.body;
    if (elemType === 'svg') {
      this.div = document.createElementNS('http://www.w3.org/2000/svg', elemType);
      this.div.setAttribute('class', className);
    } else {
      this.div = document.createElement(elemType);
      parent.appendChild(this.div);
      this.div.className = className;
    }
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
    init: function() { 
      this.sceneElem  = new Element('sceneFire', 'div');
      this.fireElem   = new Element('fire', 'svg', this.sceneElem);
      this.callBackEnd = callBackEnd;

      this.initAvatar();
      this.initFire(4);
      this.setListener(-5);
      this.setFireMoving(-1);
      this.initClouds(5);
    },
    initAvatar: function() {
        this.avatarElem = avatar.getAvatar();
        this.sceneElem.div.appendChild(this.avatarElem);
    },
    initFire: function(cpt) {
      var svgNS = this.fireElem.div.namespaceURI;

      for (var i = 0; i < cpt; i++) {
        var path = document.createElementNS(svgNS,'path');
        path.setAttribute('d','M198.90613,157.677914 C206.662141,124.161969 182.003806,82.8312871 182.003806,82.8312871 C182.003806,82.8312871 169.140336,123.257432 146.376266,132.154102 C161.591453,108.108824 151.544222,79.0762405 133.494077,64.5397377 C76.3069369,14.7208591 70.5106752,-31.9507589 76.3069368,29.8158746 C60.3672194,99.6098993 13.9773158,121.460983 0.899273955,157.677914 C-1.12902977,205.982305 52.0929773,244.5 99.9027019,244.5 C147.712427,244.5 185.467068,215.751947 198.90613,157.677914 Z');
        path.setAttribute('class', 'flame');
        path.setAttribute('id', ['a', 'b', 'c', 'd'][i]);
        this.fireElem.div.appendChild(path);
      }
      
      this.sceneElem.div.appendChild(this.fireElem.div);
    },
    initClouds: function(cpt) {
      for (var i = 0; i < cpt; i++) {
        var c = new Cloud();
        this.sceneElem.div.appendChild(c.getCloud((Math.random() * 1.2) + 0.8));
      }
    },
    setListener: function(pxl) {
      this.touchEndEvent = function touchEndEvent() {
        this.avatarElem.className = '';
      }.bind(this);

      this.touchStartEvent = function touchStartEvent() {
        this.avatarElem.style.left = (this.avatarElem.getBoundingClientRect().left + pxl) + 'px';
        this.avatarElem.style.right = 'auto';        
        this.avatarElem.className = 'run';
        this.checkCollision();
      }.bind(this);

      document.body.addEventListener(userEvents.startEvent(), this.touchStartEvent, false);
      document.body.addEventListener(userEvents.endEvent(), this.touchEndEvent, false);
    },
    setFireMoving: function(pxl) { 
      var i = 0;
      raf.start(function() {
        if (i % 5 === 0) {
          this.fireElem.changePositionLeft(pxl);
        }
        i++;
      }.bind(this));
    },
    checkCollision: function() {
      if (this.avatarElem.getBoundingClientRect().left - (this.fireElem.getLeft() + this.fireElem.getWidth()) <= 0) { 
        this.destroyGame(true);
      }
    },
    destroyGame: function(state) {
      document.body.removeEventListener(userEvents.startEvent(), this.touchStartEvent, false);
      document.body.removeEventListener(userEvents.endEvent(), this.touchEndEvent, false);
      this.callBackEnd(state);
      this.sceneElem.div.parentNode.removeChild(this.sceneElem.div);
      timer.stop();
    }
    
  };

  timer.start(10, function() {
    fire.destroyGame(false);
  });

  fire.init();
  return fire;
};
