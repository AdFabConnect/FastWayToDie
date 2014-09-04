// var earth = require('./earth');
// earth();

// var Water = require('./water');

// Water.start();

// var fire = require('./fire');
// fire();
var earth = require('./earth'),
    Water = require('./water'),
    fire = require('./fire'),
    userEvents = require('./userEvents');

var Game = {

  begin: function() {
    this.levels = [Water, earth, fire];

    this.levelIndex = 0;

    this.nextLevel();
  },

  createLife: function() {
    var lifes = document.querySelector('.life'),
        heart ='',
        heart ='';
    for (var i = 2; i >= 0; i--) {
      lifes.appendChild('');
      lifes.appendChild('');
    };
  },

  nextLevel: function() {
    this.levels[this.levelIndex](function(levelState) {
      console.log('level : ' + this.levelIndex + ' finished -> levelState : ' + ((levelState) ? 'win' : 'lose'));
      this.levelIndex++;
      // this.nextLevel();
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
