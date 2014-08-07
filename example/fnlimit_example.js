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
