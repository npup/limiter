(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.limiter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
// Utility
function isPositiveInteger(arg) {
  return "number" == typeof arg && 0==arg%1 && -1<arg  && arg==arg;
}

var throttle = require("./throttle")(isPositiveInteger);
var debounce = require("./debounce")(isPositiveInteger);


module.exports = {
  "throttle": throttle
  , "debounce": debounce
};

},{"./debounce":1,"./throttle":3}],3:[function(require,module,exports){
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

},{}]},{},[2])(2)
});