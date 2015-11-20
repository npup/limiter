# limiter

Module for managing function calls

## throttle

Obtain a function that will be called no more often than every `interval` ms.

#### Signature

	throttle(fn, interval[, self]); // returns a throttled function

	Parameters:
	fn        - [function]
	interval  - [positive integer] time in ms
	self      - explicit `this` for the eventually called function (optional)

#### Usage

	document.addEventListener(
	  "mousemove"
	  , limiter.throttle(
	      function (e) { console.log(this, e); }
	      , 500
	      , document.body
	    )
	  , false
	);



## debounce

Obtain a function that will be called when the event in question has occurred,
and not occurred again within `interval` ms.

#### Signature

	debounce(fn, interval[, self]); // returns a debounced function

	Parameters:
	fn        - [function]
	interval  - [positive integer] time in ms
	self      - explicit `this` for the eventually called function (optional)


#### Usage

	document.addEventListener(
	  "keyup"
	  , limiter.debounce(
	      function (e) { console.log(this, e); }
	      , 500
	      , document.body
	    )
	  , false
	);


