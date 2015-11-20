var assert = require("proclaim");

var limiter = require("../dist/limiter.js");

describe("module limiter", function () {

  it("should be an object", function () {
    assert.isObject(limiter);
  });

  it("should expose exactly two functions, `throttle` and `debounce`", function () {
    var keys = [];
    for (var key in limiter) {
      if (limiter.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    assert.equal(keys.length, 2);
    assert.isFunction(limiter.throttle);
    assert.isFunction(limiter.debounce);
  });

});
