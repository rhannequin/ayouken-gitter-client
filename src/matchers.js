var matchers = [
  {
    matcher: function(test) {
      return test === 'roulette'
    },
    command: 'roulette'
  },
  {
    matcher: function(test) {
      return test === 'gif'
    },
    command: 'gif'
  },
  {
    matcher: function(test) {
      return test === 'help'
    },
    command: 'help'
  },
  {
    matcher: function(test) {
      return new RegExp(/^greet @[\w]+$/).test(test)
    },
    command: 'greet'
  },
  {
    matcher: function(test) {
      return new RegExp(/^mdn [\w\-_]+$/).test(test)
    },
    command: 'mdn'
  },
  {
    matcher: function(test) {
      return new RegExp(/^google (.*)+$/).test(test)
    },
    command: 'google'
  },
  {
    matcher: function(test) {
      return new RegExp(/^hashtag #[\w_]+$/).test(test)
    },
    command: 'hashtag'
  }
]


var Matchers = function() {
  this.matchers = matchers
}


module.exports = Matchers
