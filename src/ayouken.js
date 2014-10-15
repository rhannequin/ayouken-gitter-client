function Ayouken(win, doc, $) {

  'use strict';


  var ayouken = {}
    , botName = '{botName}'
    , botMention = '@' + botName
    , selector = ".js-chat-item-text:contains('" + botMention + "')"
    , counter = $(selector).length
    , $textarea = $('#chat-input-textarea')
    , commands = new Commands()

    , gitterApiParams = {gitterApiParams}

  ayouken.launch = function() {
    var s = $(selector)
      , l = s.length
    if(l > counter) {
      counter = l
      var text = $(s[l-1]).text()
      talk(text)
    }
    setTimeout(ayouken.launch, 1000)
  }


  function talk(text) {
    if(text.slice(0, 8) === botMention) {
      var command = text.slice(9).trim()
      commands.execute(command, function(message) {
        gitterApiParams.data.text = message
        $.ajax({
            url: gitterApiParams.url
          , method: gitterApiParams.method
          , data: gitterApiParams.data
        })
        // $textarea.val(message)
        // $textarea.trigger($.Event('keydown', { keyCode: 13 }))
      })
    }
  }

  function Commands() {
    var c = {}
      , api = new Api()
      , matchers = initMatchers()

    c.execute = function(command, cb) {
      matchers.every(function(matcher) {
        if(matcher.matcher(command)) {
          matcher.command(command, cb)
          return false
        }
        return true
      })
    }

    function initMatchers() {
      return [
          { command: roulette, matcher: function(test) { return test === 'roulette' } }
        , { command: gif, matcher: function(test) { return test === 'gif' } }
        , { command: help, matcher: function(test) { return test === 'help'}}
        , { command: greet, matcher: function(test) { return new RegExp(/greet/).test(test) } }
        , { command: mdn, matcher: function(test) { return new RegExp(/mdn/).test(test) } }
        , { command: google, matcher: function(test) { return new RegExp(/google/).test(test) } }
        , { command: hashtag, matcher: function(test) { return new RegExp(/#/).test(test) } }
      ]
    }

    function roulette(command, cb) {
      api.req('/roulette', 'GET', {}, function(res) {
        cb(res.data)
      })
    }

    function gif(command, cb) {
      api.req('/gif', 'GET', {}, function(res) {
        var data = res.data
        cb(data.title + ': ' + data.link)
      })
    }

    function greet(command, cb) {
      var user = command.match(/greet (.*)/)[1]
      api.req('/greet/' + user, 'GET', {}, function(res) {
        var data = res.data
        cb(res.data)
      })
    }

    function mdn(command, cb) {
      var search = command.match(/mdn (.*)/)[1]
      api.req('/mdn/' + search, 'GET', {}, function(res) {
        var data = res.data
        cb(res.data)
      })
    }

    function google(command, cb) {
      var search = command.match(/google (.*)/)[1]
      api.req('/google/' + search, 'GET', {}, function(res) {
        var data = res.data
        cb(res.data)
      })
    }

    function hashtag(command, cb) {
      var hashtag = command.match(/#(.\S*)/)[1]
      api.req('/hashtag/' + hashtag, 'GET', {}, function(res) {
        var data = res.data
        cb(res.data)
      })
    }

    function help(command, cb) {
      api.req('/help', 'GET', {}, function(res) {
        var list = res.data
          , commands = []
          , res
        list.forEach(function(el) {
          commands.push('| `' + el.command + '` | ' + el.description)
        })
        res = "| Command   |   Description\n|:-----------|:------------|\n"
        res += commands.join("\n")
        cb(res)
      })
    }

    function unknown(command, cb) {}

    return c
  }

  function Api() {
    var api = {}
      , url = 'https://localhost:3000'

    api.req = function(endpoint, type, data, success, error) {
      endpoint = endpoint || '/'
      type = type || 'GET'
      data = data || {}
      success = success || function(){}
      error = error || function(){}
      var ajax = $.ajax({
          url: url + endpoint
        , type: type
        , data: data
        , dataType: 'jsonp'
        , crossDomain: true
      })
      ajax.done(success)
      ajax.fail(error)
    }

    return api
  }

  return ayouken

}

new Ayouken(window, window.document, window.$).launch()
