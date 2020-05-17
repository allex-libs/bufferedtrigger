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
