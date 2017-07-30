var assert = require("proclaim");
var debounce = require("../dist/limiter.js").debounce;

describe("debounce", function () {


  it("should be a function", function () {
    assert.isFunction(debounce);
  });

  it("should take three arguments", function () {
    assert.equal(debounce.length, 3);
  });


  describe("mandatory arguments", function () {

    describe("first argument", function () {
      var invalidFirstArgs = [void 0, null, 1, "foo", /expr/],
        validFirstArg = function () {},
        validSecondArg = 100;

      it("should throw if first argument is not a function", function () {
        var errorCount = 0;
        invalidFirstArgs.forEach(function (arg) {
          try { debounce(arg, validSecondArg); }
          catch(err) {
            ++errorCount;
            assert.instanceOf(err, Error);
          }
        });
        assert.equal(errorCount, invalidFirstArgs.length);
      });

      it("should have a sensible error message for invalid first argument", function () {
        var errorCount = 0;
        invalidFirstArgs.forEach(function (arg) {
          try { debounce(arg, validSecondArg); }
          catch(err) {
            ++errorCount;
            assert.equal(err.message, "First argument must be a function, was "+arg);
          }
        });
        assert.equal(errorCount, invalidFirstArgs.length);
      });

      it("should throw no error for a function as first argument", function () {
        assert.doesNotThrow(function () {
          debounce(validFirstArg, validSecondArg);
        });
      });

    });


    describe("second argument", function () {

      var invalidSecondArgs = [void 0, null, 1.25, "foo", /expr/, function () {}, NaN, -1],
        validSecondArg = 100,
        validFirstArg = function () {};

      it("should throw if second argument is not a positive integer", function () {
        var errorCount = 0;
        invalidSecondArgs.forEach(function (arg) {
          try { debounce(validFirstArg, arg); }
          catch(err) {
            ++errorCount;
            assert.instanceOf(err, Error);
          }
        });
        assert.equal(errorCount, invalidSecondArgs.length);
      });

      it("should have a sensible error message for invalid second argument", function () {
        var errorCount = 0;
        invalidSecondArgs.forEach(function (arg) {
          try { debounce(validFirstArg, arg); }
          catch(err) {
            ++errorCount;
            assert.equal(err.message, "Second argument must be a positive integer, was "+arg);
          }
        });
        assert.equal(errorCount, invalidSecondArgs.length);
      });

      it("should throw no error for a positive integer as second argument", function () {
        assert.doesNotThrow(function () {
          debounce(validFirstArg, validSecondArg);
        });
      });

    });

  });

  it("should return a function", function () {
    var result = debounce(function () {}, 10);
    assert.isFunction(result);
  });

});

