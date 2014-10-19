// Libs
var assert = require('chai').assert

// Assets
var Ayouken = require('../src/ayouken.js')
  , Matchers = require('../src/matchers.js')
  , ayouken = new Ayouken()
  , matchers = new Matchers().matchers


// Ayouken

describe('Ayouken', function() {
  describe('initialization', function() {
    it('returns an object', function(){
      assert.typeOf(ayouken, 'object')
    })
  })
})


// Matchers

describe('Matchers', function() {
  var getMatcher = function(command) {
    var res
    matchers.forEach(function(matcher) {
      if(matcher.command === command) {
        res = matcher
        return
      }
    })
    return res
  }

  describe('roulette', function() {
    it('matches with "roulette"', function() {
      var roulette = getMatcher('roulette').matcher
      assert.ok(roulette('roulette'))
      assert.notOk(roulette('wrong'))
    })
  })
})
