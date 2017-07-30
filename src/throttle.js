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

import isPositiveInteger from "./is-positive-integer";

const _slice = [].slice,
  glob = "undefined" == typeof global ? window : global;

const throttle = (fn, interval, self) => {
  if ("function" != typeof fn) throw new Error(`First argument must be a function, was ${ fn }`);
  if (!isPositiveInteger(interval)) throw new Error(`Second argument must be a positive integer, was ${ interval }`);
  let ts;
  arguments.length == 3 || (self = glob);
  return () => {
    const now = +new Date;
    if (ts && now<ts+interval) { return; }
    ts = now;
    fn.apply(self, _slice.call(arguments));
  };
};
export default throttle;
