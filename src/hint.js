// Set your hint
// hint.setHint('Your hint');

// Don't forget to delete your hint when your game is over
// hint.setHint('');

module.exports = {

  setHint: function(text) {
    document.getElementById('hint').innerHTML = text;
  },

};
