var rng = require('./rng');

module.exports = function() {

	var Ball = function(x, y) {
		this.div = document.createElement('div');
		this.div.style.background = rng().randHex();
		this.div.style.webkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
		this.div.className = 'e-ball';

		document.body.appendChild(this.div);

		this.div.addEventListener('click', function(e) {
			this.div.remove(this);
		}.bind(this));
	};

	var earth = {
		size: 100,

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
