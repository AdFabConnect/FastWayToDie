var rng = require('./rng');
var raf = require('./raf');
var Avatar = require('./avatar');
var timer = require('./timer');
var Cloud = require('./cloud');
var locker = require('./locker');
var hint = require('./hint');

module.exports = function(callbackEnd) {

	var Ball = function(x, y, callback) {
		var color = rng().randHex();

		this.div = document.createElement('div');
		this.div.innerHTML = '<div class="e-ball" style="background:' + color + '; border-bottom-color:' + color + '; border-top-color:' + color + '"></div>';
		// this.div.style.background = color;
		// this.div.style.borderBottomColor = color;
		// this.div.style.borderTopColor = color;
		this.div.style.webkitTransform = 'scale(.' + (Math.round(Math.random() * 2, 1) + 5) + ')';
		this.div.style.top = y + 'px';
		this.div.style.left = x + 'px';
		this.div.style.zIndex = '999';
		this.div.className = 'e-ball-wrap';

		this.used = false;
		this.div.addEventListener('click', function() {
			if (!this.used) {
				this.div.classList.add('used');
				callback(this.div);
			}
			this.used = true;
		}.bind(this));

		return this.div;
	};

	// Ball.prototype.remove = function() {
		
	// }

	var earth = {
		size: 100,
		numb: 3,
		balls: [],

		aniDie: function() {
			Avatar.getAvatar().removeEventListener('webkitAnimationEnd', this.aniDieFn);
			Avatar.getAvatar().classList.add('die');
			Avatar.getAvatar().classList.add('run');
			this.win(true);
		},

		destroyBall: function(div) {
			var i = 0,
				ball = div.querySelector('.e-ball');

			ball.classList.add('e-boom');
			ball.classList.add('scale');

			var id = raf.start(function() {
				if (i === 30) {
					div.remove(this);
					if (this.life === 1) {
						Avatar.getAvatar().classList.add('die');
						Avatar.getAvatar().classList.add('run');
						this.earthCloud.classList.add('up');

						this.aniDieFn = this.aniDie.bind(this);

						Avatar.getAvatar().addEventListener('webkitAnimationEnd', this.aniDieFn);
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

		orientation: function() {
			window.removeEventListener('orientationChange', this.orientationFn);
			window.removeEventListener('resize', this.orientationFn);

      hint.setHint('Pop the balloon as fast as you can');

			this.earth = document.getElementById('earth');
			this.earthCloud = this.earth.querySelector('.earth-cloud');
			this.bWrap = this.earth.querySelector('.balloon');

			this.setAvatar();
			this.initGame(parseInt(window.levelIndex + 10));

			this.earth.classList.remove('hidden');

			timer.start(10, function() {
				this.win(false);
			}.bind(this));
		},

		init:function() {
			locker.locklandscape();

			this.orientationFn = this.orientation.bind(this);

			if (window.innerWidth > window.innerHeight){
				window.addEventListener('orientationChange', this.orientationFn);
				window.addEventListener('resize', this.orientationFn);
			}else {
				this.orientation();
			}
		},

		win: function(bool) {
			locker.unlock();
			timer.stop();
			this.earth.classList.add('hidden');

			this.remove.call(this);
			callbackEnd(bool);
		},

		remove: function() {
			this.balls.forEach(function(e) {
				e = null;
			});
		},

		initGame: function(cpt) {
			this.life = cpt;

      var i;
      for (i = 0; i <= 10; i++) {
				var c = new Cloud();
				this.earthCloud.appendChild(c.getCloud((Math.random() * (i / 10)) + i / 10, 1500));
      }

			// var av = Avatar.getAvatar().offsetWidth;
			
			for (i = 0; i < cpt; i++) {
				var x = document.body.offsetWidth / 2 + (Math.round(Math.random() * (100))) - (100 / 2) - 60,
					y = Math.round(Math.random() * 20) - 40;

				var b = new Ball(x, y, this.destroyBall.bind(this));

				this.balls.push(b);

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
