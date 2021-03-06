var Avatar = function (){

  var htmlAvatar = document.createElement('div'),
      svg = '<svg class="left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="161px" height="233px" viewBox="0 0 161 233" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g sketch:type="MSLayerGroup" transform="translate(3.000000, -2.000000)"><g sketch:type="MSShapeGroup"><path d="M124.7 106.7 C124.1 53.7 129.6 -2.3 81 1.9 C44.4 5.1 44.5 39 33.8 95.4 C29 120.4 22 155.9 31 172.9 C39.5 189 55.9 192.9 81 188.9 C103.4 182.5 125.4 154.2 124.7 106.7 Z" fill="#EC7EA5"/><path d="M123.5 77.5 C123.5 77.5 137.1 90.7 148.6 80.6 C154.392578 76.3 154.6 70.1 154.6 70.1" stroke="#EC7EA5" stroke-width="5" stroke-linecap="square"/><path d="M0.106445313 62.8 C0.106445313 62.8 1.9 71 11.4 74.5 C20.8388672 78 38.1 76.5 38.1 76.5" stroke="#EC7EA5" stroke-width="5" stroke-linecap="square"/><path class="pied1" d="M46.1279297 186.2 C46.1279297 186.2 55.4 203.9 55.9 231.5 C60.7495117 232.6 71.8 232.4 71.8 232.4" stroke="#EC7EA5" stroke-width="5" stroke-linecap="square"/><path class="pied2" d="M75.5 186.4 C75.5 186.4 80.4 193.3 83.8 206.1 C85.5 212.5 86.8 220.4 87 229.6 C91.8 230.7 102.9 230.5 102.9 230.5 " stroke="#EC7EA5" stroke-width="5" stroke-linecap="square"/></g><g stroke="#470F20" sketch:type="MSShapeGroup" stroke-linecap="square"><path class="mouth" d="M72.4 70.9 C72.4 70.9 84.6 78.6 100.4 76.3 C110 74.6 117.5 68.5 117.5 68.5 " stroke-width="2"/><path d="M74.5 49.5 C74.5 49.5 81.5 52.9 86.5 52.3 C91 52.1 93.5 49.5 93.5 49.5 "/><path d="M101.4 49.5 C101.4 49.5 106.2 52.9 110.6 52.3 C114 52.1 116 49.5 116 49.5 "/></g></g></g></svg>';

  htmlAvatar.id = 'avatar';
  htmlAvatar.innerHTML = svg;

  this.getAvatar = function(){
    return htmlAvatar;
  };

  this.getSvg = function(){
    return svg;
  };

  if (Avatar.caller !== Avatar.getInstance){
    throw new Error('This object cannot be instanciated');
  }
};
 
Avatar.instance = null;
 
Avatar.getInstance = function(){
  if (this.instance === null){
    this.instance = new Avatar();
  }
  return this.instance;
};
 
module.exports = Avatar.getInstance();
