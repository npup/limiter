/**
* function utility:
*
* throttle(fn, interval[, self]); // returns throttled function
*   fn       - function
*   interval   - time in ms
*   self     - (optional) explicit `this` for the eventually called function
*
* Usage: document.body.addEventListener(
*   "mousemove"
*   , limiter.throttle(function (e) { console.log(this, e); }, document.body)
*   , 1000
*   , false
* );
*
* The resulting function will not be called more often than once every `interval` ms.
*
*/
var module, global; // browserify-declared variables

var _slice = [].slice;

module.exports = function (isPositiveInteger) {
  return function throttle(fn, interval, self) {
    if ("function" != typeof fn) throw new Error("First argument must be a function, was "+fn);
    if (!isPositiveInteger(interval)) throw new Error("Second argument must be a positive integer, was "+interval);
    3 > arguments.length && (self = global);
    var ts;
    return function () {
      var now = +new Date;
      if (ts && now<ts+interval) { return; }
      ts = now;
      fn.apply(self, _slice.call(arguments));
    };
  };
};
