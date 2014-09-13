/*

// instanciate fan
var fan = require('./Fan');
var f = fan.getFan();

// add fan
document.body.appendChild(f);

f.start(); // start anim
f.stop(); // stop anim

*/

var Fan = function (){

  var htmlFan = document.createElement('div');

  htmlFan.id = 'fan';
  htmlFan.innerHTML = '<svg id="fan" width="47px" height="168px" viewBox="0 0 47 168" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="fan" sketch:type="MSLayerGroup" transform="translate(0.000000, 1.000000)"><path d="M22 150.5 L22 163.5" id="Line" stroke="#979797" stroke-width="2" stroke-linecap="square" sketch:type="MSShapeGroup"/><path d="M21.8738281 166 C23.3476562 165.8 34 166.8 34 164 C34 161.2 28.6 159 22 159 C15.372583 159 10 161.2 10 164 C10 166.8 20.1 165.8 21.9 166 Z" id="Oval-1" fill="#979797" sketch:type="MSShapeGroup"/><path d="M21.5029297 -0.3 C13.3833008 -0.3 12 4 12 4 L12 146 C12 146 13.7 150.3 21.5 150.3 C29.2563477 150.3 31 146 31 146 L31 4 C31 4 29.6 -0.3 21.5 -0.3 Z" id="Rectangle-1" fill="#1E5DA7" sketch:type="MSShapeGroup"/><path d="M31 130 L41.6704427 130 C41.6704427 130 46.6 91 46.6 71 C46.6104349 54 41.7 19 41.7 19 L31 19 L31 130 Z" id="Rectangle-2" fill="#979797" sketch:type="MSShapeGroup"/><rect id="fan-t" fill="#4990E2" sketch:type="MSShapeGroup" x="0" y="10" width="11" height="64"/><rect id="fan-b" fill="#143F71" sketch:type="MSShapeGroup" x="0" y="74" width="11" height="64"/></g></g></svg>';

  this.getFan = function(){
    return htmlFan;
  };

  htmlFan.start = function(){
    htmlFan.classList.add('anim');
  };

  htmlFan.stop = function(){
    htmlFan.classList.remove('anim');
  };

  if (Fan.caller !== Fan.getInstance){
    throw new Error('This object cannot be instanciated');
  }
};
 
Fan.instance = null;
 
Fan.getInstance = function(){
  if (this.instance === null){
    this.instance = new Fan();
  }
  return this.instance;
};
 
module.exports = Fan.getInstance();
