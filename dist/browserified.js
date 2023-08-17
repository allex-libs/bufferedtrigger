(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lR = ALLEX.execSuite.libRegistry;
lR.register('allex_bufferedtriggerlib', require('./index')(ALLEX));

},{"./index":4}],2:[function(require,module,exports){
function createBufferedTrigger (execlib) {
  'use strict';
  
  var lib = execlib.lib;

  function BufferedTrigger (cb, timeoutval) {
    this.cb = cb;
    this.timeoutval = timeoutval || 0;
    this.timeout = null;
    this.triggerer = this.trigger.bind(this);
  }
  BufferedTrigger.prototype.destroy = function () {
    this.triggerer = null;
    this.clearTimeout();
    this.timeoutval = null;
    this.cb = null;
  };
  BufferedTrigger.prototype.trigger = function (val) {
    this.fire(val);
  };
  BufferedTrigger.prototype.fire = function (val) {
    //if it is an event
    if (val && val.originalEvent && val.originalEvent.keyCode && val.originalEvent.keyCode.length>1) {
      return;
    }
    if (this.timeout) {
      return;
    }
    if (lib.isFunction(this.cb)) {
      this.cb(val);
      this.timeout = lib.runNext(this.clearTimeout.bind(this), this.timeoutval);
    }
  };
  BufferedTrigger.prototype.clearTimeout = function () {
    if (this.timeout) {
      lib.clearTimeout(this.timeout);
    }
    this.timeout = null;
  };

  return BufferedTrigger;
}
module.exports = createBufferedTrigger;

},{}],3:[function(require,module,exports){
function createBufferedWaiter (execlib) {
  'use strict';
  
  var lib = execlib.lib;

  function BufferedWaiter (cb, timeoutval) {
    this.cb = cb;
    this.timeoutval = timeoutval || 0;
    this.timeout = null;
    this.triggerer = this.trigger.bind(this);
  }
  BufferedWaiter.prototype.destroy = function () {
    this.triggerer = null;
    this.clearTimeout();
    this.timeoutval = null;
    this.cb = null;
  };
  BufferedWaiter.prototype.trigger = function (val) {
    this.clearTimeout();
    this.timeout = lib.runNext(this.fire.bind(this, val), this.timeoutval);
  };
  BufferedWaiter.prototype.fire = function (val) {
    if (lib.isFunction(this.cb)) {
      this.cb(val);
    }
  };
  BufferedWaiter.prototype.clearTimeout = function () {
    if (this.timeout) {
      lib.clearTimeout(this.timeout);
    }
    this.timeout = null;
  };

  return BufferedWaiter;
}
module.exports = createBufferedWaiter;

},{}],4:[function(require,module,exports){
function createLib (execlib) {
  'use strict';
  return {
    BufferedWaiter: require('./bufferedwaitercreator')(execlib),
    BufferedTrigger: require('./bufferedtriggercreator')(execlib)
  };
}
module.exports = createLib;

},{"./bufferedtriggercreator":2,"./bufferedwaitercreator":3}]},{},[1]);
