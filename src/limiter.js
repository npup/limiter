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
