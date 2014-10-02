var ProgressBar = require('progress'),
  util = require('util');

module.exports = function (options) {
  if (!options || !options.limit || !options.callback || !options.done)
    throw new Error('FnLimit requires options!');
  if (!options.times && !options.list)
    throw new Error('FnLimit requires either a list or a # of times');

  var started = 0,
    finished = 0,
    results = [];

  var times = options.times,
    callback = options.callback,
    done = options.done,
    limit = options.limit,
    list = options.list,
    progress = options.progress;

  var _this = this;

  times = (list && util.isArray(list)) ? list.length : times;

  if (progress) {
    var barFormat = (util.isArray(progress)) ? progress[0] : '[:bar] :percent | :current/:total | time: :elapsed | eta: :eta',
      barOpts = (util.isArray(progress)) ? progress[1] : {
        width: 20
      };
    barOpts.total = times;
    var bar = new ProgressBar(barFormat, barOpts);
  }

  function start() {
    var args = [next];
    if (list && list[started])
      args.unshift(list[started]);
    started += 1;
    callback.apply(_this, args);
  }

  function next(err, result) {
    finished += 1;

    results.push(result);

    if (progress)
      bar.tick();
    if (err) {
      done(err);
    } else if (started < times)
      start();
    else if (finished === times)
      done(null, results);
  }

  for (var i = 0; i < limit; i++) {
    start();
  }

}
