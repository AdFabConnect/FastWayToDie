
module.exports = {

  lockPortrait: function(text) {
    var b = document.body;
    if (!b.classList.contains('lock-p')){
      b.classList.add('lock-p');
    }
  },

  locklandscape: function(text) {
    var b = document.body;
    if (!b.classList.contains('lock-l')){
      b.classList.add('lock-l');
    }
  },

  unlock: function(text) {
    var b = document.body;
    if (b.classList.contains('lock-l')){
      b.classList.remove('lock-l');
    }
    if (b.classList.contains('lock-p')){
      b.classList.remove('lock-p');
    }
  }

};
