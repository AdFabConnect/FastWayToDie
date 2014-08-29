var userEvents  = require('./userEvents');
var raf         = require('./raf');

module.exports = function() {

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
    bodyElem: null,
    init: function() {
      this.sceneElem  = new Element('scene', 'div');
      this.bodyElem   = new Element('body', 'div', this.sceneElem);
      this.fireElem   = new Element('fire', 'svg', this.sceneElem);


      this.initFire(4);
      this.setListener(-5);
      this.setFireMoving(-2);
      //this.setSceneMoving();
    },
    setListener: function(pxl) {
      var touchEndEvent = function touchEndEvent() {
        this.bodyElem.changePositionLeft(pxl);
        this.checkCollision();
      }.bind(this);

      document.body.addEventListener(userEvents.endEvent(), touchEndEvent, false);
    },
    setFireMoving: function(pxl) { 
      var i = 0;
      raf.start(function() {
        if (i % 5 === 0) {
          this.fireElem.changePositionLeft(pxl);
          this.checkDefeat();
        }
        i++;
      }.bind(this));
    },
    checkDefeat: function() {
      if (this.fireElem.getLeft() + this.fireElem.getWidth() <= 0) { 
        console.log('PERDU BITCH');
      }
      return false;      
    },
    checkCollision: function() {
      if (this.bodyElem.getLeft() - (this.fireElem.getLeft() + this.fireElem.getWidth()) <= 0) { 
        console.log('DEAD');
      }
      return false;
    },
    initFire: function(cpt) {
      var svgNS = this.fireElem.div.namespaceURI;
      var ids = ['a', 'b', 'c', 'd'];
      for (var i = 0; i < cpt; i++) {
        var path = document.createElementNS(svgNS,'path');
        path.setAttribute('d','M198.90613,157.677914 C206.662141,124.161969 182.003806,82.8312871 182.003806,82.8312871 C182.003806,82.8312871 169.140336,123.257432 146.376266,132.154102 C161.591453,108.108824 151.544222,79.0762405 133.494077,64.5397377 C76.3069369,14.7208591 70.5106752,-31.9507589 76.3069368,29.8158746 C60.3672194,99.6098993 13.9773158,121.460983 0.899273955,157.677914 C-1.12902977,205.982305 52.0929773,244.5 99.9027019,244.5 C147.712427,244.5 185.467068,215.751947 198.90613,157.677914 Z');
        path.setAttribute('class', 'flame');
        path.setAttribute('id', ids[i]);
        this.fireElem.div.appendChild(path);
      }
      
      this.sceneElem.div.appendChild(this.fireElem.div);
    }
  };

  fire.init();

  return fire;
};
