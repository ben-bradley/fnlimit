# FnLimit [![Build Status](https://secure.travis-ci.org/ben-bradley/fnlimit.png)](http://travis-ci.org/ben-bradley/fnlimit)

A bit of code that will limit and iterate a function call.

## Install

`npm install fnlimit`

`npm install ben-bradley/fnlimit`

## Example

Iterating a specified number of times

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

Iterating a list of items

```js
var fnlimit = require('../');

var i = 0;

fnlimit({
  limit: 3,
  list: [ 1, 2, 3, 4, 5, 6 ],
  progress: true, // optional
  callback: function (item, next) {
    setTimeout(function () {
      console.log(item); // => 1, 2, 3, ...
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
- __`list`__ - _(Array)_ A list of items to provide to the `callback`.  If specified, each item is injected into `callback` as the first argument and `next()` becomes the second arg.
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

- 0.0.3 - Added `list` option to inject an item into `callback`
- 0.0.2 - Added custom progress bar option
- 0.0.1 - Initial drop
