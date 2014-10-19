var assert = require('chai').assert
  , Matchers = require('../src/matchers.js')
  , matchers = new Matchers().matchers

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

  describe('gif', function() {
    it('matches with "gif"', function() {
      var gif = getMatcher('gif').matcher
      assert.ok(gif('gif'))
      assert.notOk(gif('wrong'))
    })
  })

  describe('help', function() {
    it('matches with "help"', function() {
      var help = getMatcher('help').matcher
      assert.ok(help('help'))
      assert.notOk(help('wrong'))
    })
  })

  describe('greet', function() {
    var greet = getMatcher('greet').matcher
    it('matches with "greet @username"', function() {
      assert.ok(greet('greet @someone'))
    })
    it('does not matche with "greet"', function() {
      assert.notOk(greet('greet'))
    })
    it('does not matche with "greet @"', function() {
      assert.notOk(greet('greet @'))
    })
    it('does not matche with "greet @name @name"', function() {
      assert.notOk(greet('greet @name @name'))
    })
  })

  describe('mdn', function() {
    var mdn = getMatcher('mdn').matcher
    it('matches with "mdn text"', function() {
      assert.ok(mdn('mdn text'))
    })
    it('matches with "mdn text-text"', function() {
      assert.ok(mdn('mdn text-text'))
    })
    it('matches with "mdn text_text"', function() {
      assert.ok(mdn('mdn text_text'))
    })
    it('does not matche with "mdn"', function() {
      assert.notOk(mdn('mdn'))
    })
    it('does not matche with "mdn text"', function() {
      assert.notOk(mdn('mdn text text'))
    })
  })

  describe('google', function() {
    var google = getMatcher('google').matcher
    it('matches with "google query"', function() {
      assert.ok(google('google query'))
    })
    it('matches with "google query-query"', function() {
      assert.ok(google('google query query'))
    })
    it('matches with "google query_query"', function() {
      assert.ok(google('google text_text'))
    })
    it('matches with "google query_query"', function() {
      assert.ok(google('google query_query'))
    })
    it('matches with "google query query"', function() {
      assert.ok(google('google query query'))
    })
    it('does not matche with "google"', function() {
      assert.notOk(google('google'))
    })
  })

  describe('hashtag', function() {
    var hashtag = getMatcher('hashtag').matcher
    it('matches with "hashtag #hashtag"', function() {
      assert.ok(hashtag('hashtag #hashtag'))
    })
    it('matches with "hashtag #tag_tag"', function() {
      assert.ok(hashtag('hashtag #tag_tag'))
    })
    it('does not matche with "hashtag"', function() {
      assert.notOk(hashtag('hashtag'))
    })
    it('does not matche with "hashtag #"', function() {
      assert.notOk(hashtag('hashtag #'))
    })
    it('does not matche with "hashtag #tag #tag"', function() {
      assert.notOk(hashtag('hashtag #tag #tag'))
    })
    it('does not matche with "hashtag #tag-tag"', function() {
      assert.notOk(hashtag('hashtag #tag #tag-tag'))
    })
  })
})
