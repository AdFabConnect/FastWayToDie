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


      this.initFire(10);
      this.setListener();
      this.setFireMoving();
      //this.setSceneMoving();
    },
    setListener: function() {
      var touchEndEvent = function touchEndEvent() {
        this.bodyElem.changePositionLeft(-5);
        this.collision();
      }.bind(this);

      document.body.addEventListener(userEvents.endEvent(), touchEndEvent, false);
    },
    setFireMoving: function() { 
      var i = 0;
      raf.start(function() {
        if (i % 2 === 0) {
          this.fireElem.changePositionLeft(-1);
        }
        i++;
      }.bind(this));
    },
    collision: function() {
      if (this.bodyElem.getLeft() - (this.fireElem.getLeft() + this.fireElem.getWidth()) <= 0) { 
        return true;
      }
      return false;
    },
    initFire: function(cpt) {
      var svgNS = this.fireElem.div.namespaceURI;
      for (var i = 0; i < cpt; i++) {
        var path = document.createElementNS(svgNS,'path');
        path.setAttribute('d','M 118.5607,287.49258 C 125.34732,270.12555 113.89584,242.59764 110.28978,226.49036 C 100.50645,211.98657 101.45181,194.47421 106.16418,178.41263 C 113.1009,152.5375 114.24611,30.43176 226.18931,3.090747 C 139.37176,58.27337 197.01889,127.50163 206.41698,160.83623 C 211.90747,186.1695 209.10079,212.57338 196.71951,235.35605 C 179.62589,266.80984 133.98643,284.1453 119.5607,287.49258 z');
        path.setAttribute('class', 'flame');
        path.setAttribute('id', i);
        this.fireElem.div.appendChild(path);
      }
      
      this.sceneElem.div.appendChild(this.fireElem.div);
    }
  };

  fire.init();

  return fire;
};
