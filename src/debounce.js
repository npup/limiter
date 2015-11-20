/*
*
* debounce(fn, interval[, self]); // returns a debounced function
*   fn      - function
*   interval  - time in ms
*   self    - (optional) explicit `this` for the eventually called function
*
* Usage: document.addEventListener(
*   "mousemove"
*   , limiter.debounce(function (e) { console.log(this, e); }, 500, document.body)
*   , false
* );
*
* The resulting function will be called when the event has occurred,
* and not occurred again within`interval` ms
*
*/

var module, global; // browserify-declared variables

var _slice = [].slice;

function copyEvent(e) {
  var copy = {};
  for (var prop in e) { copy[prop] = e[prop]; }
  return copy;
}



module.exports = function (isPositiveInteger) {
  return function debounce(fn, interval, self) {
    if ("function" != typeof fn) throw new Error("First argument must be a function, was "+fn);
    if (!isPositiveInteger(interval)) throw new Error("Second argument must be a positive integer, was "+interval);
    3 > arguments.length && (self = global);
    var timer, ts, args;
    return function () {
      ts = new Date;
      if ("returnValue" in arguments[0]) { // hoops for old IE event.
        args = [copyEvent(arguments[0]), arguments[1]];
      }
      else {
        args = _slice.call(arguments);
      }
      var tmp = function () {
          var prev = new Date - ts;
          if (prev < interval) { return timer = setTimeout(tmp, interval-prev); }
          timer = null;
          fn.apply(self, args);
        };
      timer || (timer = setTimeout(tmp, interval));
    };
}
};
