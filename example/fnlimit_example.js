var fnlimit = require('../');

var i = 0;

fnlimit({
  times: 20,
  limit: 6,
  progress: true,
  callback: function (next) {
    setTimeout(function () {
      //      console.log(++i);
      next();
    }, 1000);
  },
  done: function (err) {
    console.log('All done!');
  }
});
