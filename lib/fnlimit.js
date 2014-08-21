var ProgressBar = require('progress'),
  util = require('util');

module.exports = function (options) {
  if (!options || !options.limit || !options.times || !options.callback || !options.done)
    throw new Error('FnLimit requires options!');

  var started = 0,
    finished = 0;

  var times = options.times,
    callback = options.callback,
    done = options.done,
    limit = options.limit,
    progress = options.progress;

  if (progress) {
    var barFormat = (util.isArray(progress)) ? progress[0] : '[:bar] :percent | :current/:total | time: :elapsed | eta: :eta',
      barOpts = (util.isArray(progress)) ? progress[1] : {
        width: 20
      };
    barOpts.total = times;
    var bar = new ProgressBar(barFormat, barOpts);
  }

  function start() {
    started += 1;
    callback(next);
  }

  function next(err) {
    finished += 1;
    if (progress)
      bar.tick();
    if (err)
      done(err);
    else if (started < times)
      start();
    else if (finished === times)
      done();
  }

  for (var i = 0; i < limit; i++) {
    start();
  }

}
