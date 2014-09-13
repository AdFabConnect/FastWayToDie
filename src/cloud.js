/*
* var c = new Cloud();
*
* c.getCloud((Math.random() * max) + min)
*
*/

var Cloud = function Cloud() {
  if (!(this instanceof Cloud)) {
    return new Cloud();
  }
  this.htmlCloud = document.createElement('div');
  this.htmlCloud.className = 'cloud';
};

Cloud.prototype.getCloud = function getCloud(scale, y) {
	y = y || 100;
	
  this.htmlCloud.style.webkitTransform = 'translate(' + Math.round(Math.random() * (document.body.offsetWidth - 100)) + 'px, ' + Math.round(Math.random() * y * 2) + 'px) scale(' + scale + ')';
  return this.htmlCloud;
};

module.exports = Cloud;
