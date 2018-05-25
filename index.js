import Vue from 'vue'
import BotUI from 'botui'
import BotUICss from 'botui-css'
import BotUITheme from 'botui-theme-default'

var botui = new BotUI('hello-world', {
  vue: Vue // pass the dependency.
})


botui.message.add({
  type: 'embed', // this is 'text' by default
  content: 'https://www.youtube.com/embed/ZRBH5vHhm4c'
});

botui.message.add({
  loading: true
}).then(function (index) {
  // do some stuff like ajax, etc.

  botui.message.update(index, {
    loading: false,
    cssClass: 'custom-class',
    content: 'Hello, this is a message.'
  });
});

botui.message.add({
  delay: 3000,
  loading: true,
  content: 'Hello, this is delayed message shown after a loading message.'
});

botui.message.bot({
  content: 'Hello World from bot!'
}).then(function () { 
  // wait till previous message has been shown.
  botui.message.human({
    delay: 1000,
    human: true,
    content: 'Hello World from human!'
  }).then(() => {
    botui.message.add({ // show a message
      human: true,
      content: 'Whats your name?'
    }).then(function () { // wait till its shown
      return botui.action.text({ // show 'text' action
        action: {
          placeholder: 'Your name'
        }
      });
    }).then(function (res) { // get the result
      botui.message.add({
        content: 'Your name is ' + res.value
      })
    });
  })
})