var assert = require('chai').assert
  , Ayouken = require('../src/ayouken.js')
  , ayouken = new Ayouken()

describe('Ayouken', function() {
  describe('initialization', function() {
    it('returns an object', function(){
      assert.typeOf(ayouken, 'object')
    })
  })
})
