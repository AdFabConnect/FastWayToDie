var rng = require('./rng');
var raf = require('./raf');
var Avatar = require('./avatar');

module.exports = function(callbackEnd) {

	var Ball = function(x, y, callback) {
		var color = rng().randHex();

		this.div = document.createElement('div');
		this.div.innerHTML = '<div class="e-ball" style="background:'+color
			+'; border-bottom-color:'+color
			+'; border-top-color:'+color+'"></div>'
		// this.div.style.background = color;
		// this.div.style.borderBottomColor = color;
		// this.div.style.borderTopColor = color;
		this.div.style.webkitTransform = 'scale(.'+(Math.round(Math.random()*2, 1)+5)+')';
		this.div.style.top = y + 'px';
		this.div.style.left = x + 'px';
		this.div.style.zIndex = '999';
		this.div.className = 'e-ball-wrap';

		this.div.addEventListener('click', function(e) {
			callback(this.div);
		}.bind(this));

		return this.div;
	};

	// Ball.prototype.remove = function() {
		
	// }

	var earth = {
		size: 100,
		numb: 10,
		balls: [],

		destroyBall: function(div) {
			var i = 0,
				ball = div.querySelector('.e-ball');

			ball.classList.add('e-boom');
			ball.classList.add('scale');

			var id = raf.start(function() {
				if (i === 30) {
					div.remove(this);
					if(this.life <= 0) {
						this.win(callbackEnd);
					}
					this.life--;
					raf.stop(id);
				}else if (i === 15) {
					ball.classList.remove('e-end');
					ball.style.background = 'none';
					ball.classList.add('e-end');
				}else if (i === 10) {
					ball.classList.add('e-boom');
				}
				i++;
			}.bind(this));
		},

		init:function() {
			this.earth = document.getElementById('earth');
			this.bWrap = this.earth.querySelector('.balloon');

			this.setAvatar();
			this.initGame(this.numb);
		},

		win: function() {
			this.remove();
			callbackEnd();
		},

		remove: function() {
			balls.forEach(function(e) {
				detele e;
			});
		},

		initGame: function(cpt) {
			this.life = cpt;

			var av = Avatar.getAvatar().offsetWidth;
			
			for (var i = 0; i < cpt; i++) {
				var x = document.body.offsetWidth/2 + (Math.round(Math.random() * (av * 3))) - (av * 3 / 2) - 40,
				//var x = Math.round(Math.random() * (document.body.offsetWidth - this.size)),
					y = Math.round(Math.random() * 20 * 2) + 20;

				var b = new Ball(x, y, this.destroyBall.bind(this));

				var deltaY = 150 - y + (b.offsetHeight / 2);
				var deltaX = document.body.offsetWidth / 2 - (x - (b.offsetWidth / 2));

				var angle = (Math.atan(deltaX/deltaY) * 180 / Math.PI + 180);

				this.balls.push(b);

				//var dif = (document.body.offsetWidth / 2) - x - (b.querySelector('.e-ball').offsetWidth / 2);
				//b.style.webkitTransform = 'rotate(' + angle + 'deg)';

				//console.log('deltaY', deltaY, 'deltaX', deltaX, 'angle', angle, deltaX/deltaY);

				this.bWrap.appendChild(b);
			}
		},

		setAvatar: function() {
			var div = Avatar.getAvatar();

			this.earth.appendChild(div);
		}
	};

	earth.init();

	return earth;
};
