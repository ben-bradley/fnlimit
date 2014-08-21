var should = require('should'),
  fnlimit = require('../');

var Options = function () {
  return {
    limit: 10,
    times: 100,
    callback: function (next) {
      setTimeout(function () {
        next();
      }, 10);
    },
    done: function (err) {
      console.log('all done!');
    }
  }
}

describe('fnlimit', function () {
  var options;

  beforeEach(function () {
    options = new Options();
  });

  it('should be a function', function () {
    (fnlimit).should.be.a.Function;
  });

  it('should error without a .times option', function () {
    delete options.times;
    (function () {
      fnlimit(options);
    }).should.throw();
  });

  it('should error without a .limit option', function () {
    delete options.limit;
    (function () {
      fnlimit(options);
    }).should.throw();
  });

  it('should error without a .callback option', function () {
    delete options.callback;
    (function () {
      fnlimit(options);
    }).should.throw();
  });

  it('should error without a .done option', function () {
    delete options.done;
    (function () {
      fnlimit(options);
    }).should.throw();
  });

  it('should iterate to 100 and stop', function (done) {
    options.done = function (err) {
      done();
    }
    fnlimit(options);
  });

  it('should allow for progress bars', function (done) {
    (function () {
      options.progress = true;
      options.done = function (err) {
        done();
      }
      fnlimit(options);
    }).should.not.throw();
  });

  it('should allow for custom progress bars', function (done) {
    (function () {
      options.progress = ['[:bar] :percent', {
        width: 40
      }];
      options.done = function (err) {
        done();
      }
      fnlimit(options);
    }).should.not.throw();
  });

});
