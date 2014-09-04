var earth = require('./earth'),
    Water = require('./water'),
    fire = require('./fire'),
    userEvents = require('./userEvents'),
    avatar = require('./avatar');

var Game = {

  begin: function() {
    this.levels = [Water, earth, fire];
    this.score = 0;
    this.scoreElement = document.querySelector('#score span');
    this.levelIndex = 0;
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
      itemLife.innerHTML = avatar.getSvg();
      lifes.appendChild(itemLife);
    };

  },

  nextLevel: function() {
    this.levels[this.levelIndex](function(levelState) {
      console.log('level : ' + this.levelIndex + ' finished -> levelState : ' + ((levelState) ? 'win' : 'lose'));
      this.levelIndex++;
      // this.nextLevel();
      if (levelState) {
        this.scoreElement.innerHTML = ++this.score;
      }
      this.animNextLevel();
    }.bind(this));
  },

  animNextLevel: function(bgColor) {
    var bgColor = bgColor || null,
        next = document.querySelector('.next'),
        btn = next.querySelector('.btn');
    if(bgColor) next.backgroundColor = bgColor;
    next.classList.add('on');



    btn.addEventListener(userEvents.endEvent(), function() {
      next.classList.remove('on');
      this.nextLevel();
    }.bind(this), false);
  },

  end: function() {
    
  }

};

document.addEventListener('DOMContentLoaded', function() {
  Game.begin();
}, false);
