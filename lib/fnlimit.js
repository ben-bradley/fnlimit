var ProgressBar = require('progress');

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

  var bar = new ProgressBar('[:bar] :percent | :current/:total | time: :elapsed | eta: :eta', {
    width: 20,
    total: times
  });

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
