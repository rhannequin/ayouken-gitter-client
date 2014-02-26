function Ayouken(win, doc, $) {

  'use strict';

  var ayouken = {}
    , selector = ".trpChatText:contains('@ayouken')"
    , counter = $(selector).length
    , $textarea = $('#chat-input-textarea')
    , commands = new Commands()

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
    var render = function(message) {
      $textarea.val(message)
      $textarea.trigger($.Event('keydown', { keyCode: 13 }))
    }

    if(text.slice(0, 8) === '@ayouken') {
      var command = text.slice(9)
      if(commands.hasOwnProperty(command)) {
        commands[command](render)
      } else {
        commands.unknown(render)
      }
    }
  }

  function Commands() {
    var c = {}
      , api = new Api()

    c.roulette = function(cb) {
      api.req('/roulette', 'GET', {}, function(res) {
        cb(res.data)
      })
    }

    c.gif = function(cb) {
      api.req('/gif', 'GET', {}, function(res) {
        var data = res.data
        cb(data.title + ': ' + data.link)
      })
    }

    c.help = function(cb) {
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

    c.unknown = function(cb) {}

    return c
  }

  function Api() {
    var api = {}
      , url = 'https://localhost:7001'

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
