var matchers = [
  {
    matcher: function(test) {
      return test === 'roulette'
    },
    command: 'roulette'
  }
]

var Matchers = function() {
  this.matchers = matchers
}


module.exports = Matchers
