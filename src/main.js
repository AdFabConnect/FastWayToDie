var earth = require('./earth'),
    attachFastClick = require('./fastclick'),
    Water = require('./water'),
    fire = require('./fire'),
    Air = require('./air'),
    userEvents = require('./userEvents'),
    avatar = require('./avatar');
    window.levelIndex = 0;
    window.gamesLength = 0;

var Game = {

  begin: function() {
    attachFastClick(document.body);

    var start = document.querySelector('.start .btn'),
        bodyClass = document.body.classList;

    document.getElementById('life').innerHTML = '';

    bodyClass.add('start-screen');
    var startFn = function() {
      start.removeEventListener('click', startFn, false);
      if (bodyClass.contains('start-screen')) {
        bodyClass.remove('start-screen');
      }
      Game.startGame();
    };
    start.addEventListener('click', startFn, false);
  },

  startGame: function() {
    this.levels = [earth, Water, fire, Air];
    window.gamesLength = this.levels.length;
    this.scoreElement = document.querySelector('#score span');
    window.levelIndex = 0;
    this.scoreElement.innerHTML = this.score = 0;
    this.lifeLeft = 2;
    this.createLife();
    this.nextLevel();
  },

  createLife: function() {
    var lifes = document.querySelector('#life'),
        itemLife,
        i;

    for (i = 2; i >= 0; i--) {
      itemLife = document.createElement('div');
      itemLife.id = 'life-' + i;
      itemLife.className = 'dead';
      itemLife.innerHTML = avatar.getSvg();
      lifes.appendChild(itemLife);
    }

  },

  nextLevel: function() {
    this.levels[window.levelIndex % window.gamesLength](function(levelState) {
      console.log('level : ' + (window.levelIndex % window.gamesLength) + ' finished -> levelState : ' + ((levelState) ? 'win' : 'lose'));
      window.levelIndex++;
      
      if (levelState) {
        this.scoreElement.innerHTML = ++this.score;
      } else {
        document.querySelector('#life-' + this.lifeLeft--).classList.remove('dead');
      }

      if (this.lifeLeft < 0) {
        alert('GAME OVER');
        window.levelIndex = 0;
        this.begin();
      } else {
        // if (levelIndex >= this.levels.length) {
        //   levelIndex = 0;
        // }
        this.animNextLevel();
      }

    }.bind(this));
  },

  animNextLevel: function(bgColor) {
    var bgColor = bgColor || null,
        next = document.querySelector('.next'),
        btn = next.querySelector('.btn');
    if (bgColor) next.backgroundColor = bgColor;
    next.classList.add('on');

    var startNext = function() {
      btn.removeEventListener(userEvents.endEvent(), startNext, false);
      next.classList.remove('on');
      Game.nextLevel();
    };

    btn.addEventListener(userEvents.endEvent(), startNext, false);
  },

  end: function() {
    
  }

};

document.addEventListener('DOMContentLoaded', function() {
  Game.begin();
}, false);
