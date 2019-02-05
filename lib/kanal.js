/**
 * Copyright (c) acacode, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

function createInstance() {
  var allEvents = {}

  function createListener(callback, type, options) {
    return {
      type: type,
      callback: callback,
    }
  }
  function addListener(event, callback, type, options) {
    if (!allEvents[event]) {
      allEvents[event] = []
    }
    allEvents[event].push(createListener(callback, type, options))
  }
  function once(event, callback, options) {
    addListener(event, callback, 'once', options)
  }
  function on(event, callback, options) {
    addListener(event, callback, 'default', options)
  }
  function emit(event) {
    var listeners = allEvents[event]
    if (listeners && listeners.length) {
      var data = [].slice.call(arguments, 1)
      for (var i in listeners) {
        listeners[i].callback.apply(null, data)
        if (listeners[i].type === 'once') {
          listeners.splice(i, 1)
        }
      }
      if (!listeners.length) {
        kill(event)
      }
    }
  }
  function kill(event) {
    delete allEvents[event]
  }
  return {
    once: once,
    on: on,
    emit: emit,
    kill: kill,
  }
}

var kanal = createInstance()

if (window) {
  window.kanal = kanal
}

module.exports = kanal
