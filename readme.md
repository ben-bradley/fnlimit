# FnLimit [![Build Status](https://secure.travis-ci.org/ben-bradley/fnlimit.png)](http://travis-ci.org/ben-bradley/fnlimit)

A bit of code that will limit and iterate a function call.

## Install

`npm install fnlimit`

`npm install ben-bradley/fnlimit`

## Example

```js
var fnlimit = require('../');

var i = 0;

fnlimit({
  times: 20,
  limit: 6,
  progress: true, // optional
  callback: function (next) {
    setTimeout(function () {
      next();
    }, 1000);
  },
  done: function (err) {
    console.log('All done!');
  }
});
```

## Options

- __`times`__ - _(Number)_ The number of times that you want to call the `callback`.
- __`limit`__ - _(Number)_ The number of `callback`s to run at the same time.
- __`progress`__ - _(Boolean|Array, optional)_ If `true`, then it will display the default progress bar with each call of `next()`.  Alternatively, you can provide an array of arguments to send to `ProgressBar()` using
```js
fnlimit({
  times: 20,
  limit: 6,
  // see https://github.com/visionmedia/node-progress#tokens
  progress: [ '[:bar] :percent', { width: 80 } ], // or progress: true,
  callback: function (next) {
    setTimeout(function () {
      next();
    }, 1000);
  },
  done: function (err) {
    console.log('All done!');
  }
});
```
- __`callback`__ - _(Function)_ The function to iterate.  Provides a `next` function called within the `callback` to iterate correctly.
- __`done`__ - _(Function)_ The function to call when all iterations are complete.  Provides an error which is passed through if provided to `next`.

## Versions

- 0.0.2 - Added custom progress bar option
- 0.0.1 - Initial drop
