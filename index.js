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
    if(text.slice(0, 8) === '@ayouken') {
      var command = text.slice(9)
        , message

      if(commands.hasOwnProperty(command)) {
        message = commands[command]()
      } else {
        message = "Don't understand what you mean by `" + command + "`, bro"
      }

      $textarea.val(message)
      $textarea.trigger($.Event('keydown', { keyCode: 13 }))
    }
  }

  function Commands() {
    var c = {}

    c.roulette = function() {
      return (Math.floor(Math.random() * 6 + 1) === 6) ? 'Bang!' : 'Click...'
    }

    return c
  }

  return ayouken

}

new Ayouken(window, window.document, window.$).launch()
