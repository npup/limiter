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

import isPositiveInteger from "./is-positive-integer";

const _slice = [].slice,
  glob = "undefined" == typeof global ? window : global,
  copyEvent = e => {
    const copy = {};
    for (let prop in e) { copy[prop] = e[prop]; }
    return copy;
  };

const isIEEvent = e => "returnValue" in e;

const debounce = (fn, interval, self) => {
    if ("function" != typeof fn) throw new Error(`First argument must be a function, was ${ fn }`);
    if (!isPositiveInteger(interval)) throw new Error(`Second argument must be a positive integer, was ${ interval }`);
    let timer, ts, args;
    arguments.length == 3 || (self = glob);
    return () => {
      ts = new Date;
      if (isIEEvent(arguments[0])) { // hoops for old IE event.
        args = [copyEvent(arguments[0]), arguments[1]];
      }
      else {
        args = _slice.call(arguments);
      }
      const tmp = () => {
          const prev = new Date - ts;
          if (prev < interval) { return timer = setTimeout(tmp, interval-prev); }
          timer = null;
          fn.apply(self, args);
        };
      timer || (timer = setTimeout(tmp, interval));
    };
};
export default debounce;
