var rng = require('./rng');
var raf = require('./raf');

module.exports = function() {

	var Ball = function(x, y) {
		var color = rng().randHex();

		this.div = document.createElement('div');
		this.div.style.background = color;
		this.div.style.borderBottomColor = color;
		this.div.style.borderTopColor = color;
		this.div.style.top = y + 'px';
		this.div.style.left = x + 'px';
		this.div.style.zIndex = '999';
		this.div.className = 'e-ball';

		document.body.appendChild(this.div);

		this.div.addEventListener('click', function(e) {
			earth.destroyBall(this.div);
		}.bind(this));
	};

	var earth = {
		size: 100,

		destroyBall: function(div) {
			var i = 0;

			div.classList.add('e-boom');
			div.classList.add('scale');

			raf.start(function() {
				if (i === 30) {
					div.remove(this);
					return;
				}else if (i === 15) {
					div.classList.remove('e-end');
					div.style.background = 'none';
					div.classList.add('e-end');
				}else if (i === 10) {
					div.classList.add('e-boom');
				}
				i++;
			}.bind(this));
		},

		init:function() {

			this.initGame(10);
		},

		initGame: function(cpt) {
			
			for (var i = 0; i < cpt; i++) {
				var b = new Ball(Math.round(Math.random() * (document.body.offsetWidth - this.size)), Math.round(Math.random() * this.size * 2));
			}
		}
	};

	earth.init();

	return earth;
};
