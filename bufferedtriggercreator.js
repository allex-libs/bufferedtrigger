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
