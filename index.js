(function () {
  var root = typeof global === 'object' && global ||
             this;
  var isBrowser = function isBrowser() {
    return (typeof root.window === 'object' && typeof root.document === 'object');
  };

  var scrollHeight = function scrollHeight(target) {
    if (isBrowser() && target === window) {
      return document.body.clientHeight;
    } else {
      return target.scrollHeight;
    }
  };

  var scrollPosition = function scrollPosition(target) {
    if (isBrowser() && target === window) {
      return (document.body.scrollTop + window.innerHeight);
    } else {
      return (target.scrollTop + target.offsetHeight);
    }
  };

  var isReached = function (target, depth) {
    return (scrollPosition(target) / scrollHeight(target) >= depth);
  };

  var ScrollDepth = function ScrollDepth(options) {
    if (options.target == null) {
      throw new Error('target property required.');
    }
    this.target = options.target;
    options.depth = options.depth || 1;
    options.throttle = options.throttle || 12;
    if (options.onReach == null) {
      throw new Error('onReach property required.');
    }

    this.throttledOnReach = (function (fn, throttle) {
      var lock = false;
      return function (e) {
        if (!lock) {
          lock = true;
          if (isReached(options.target, options.depth)) {
            fn(e);
          }
          setTimeout(function () {
            lock = false
          }, throttle);
        }
      };
    })(options.onReach, options.throttle);

    this.target.addEventListener('scroll', this.throttledOnReach);
  };

  ScrollDepth.prototype.cancel = function () {
    this.target.removeEventListener('scroll', this.throttledOnReach);
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = ScrollDepth;
    }
    exports.ScrollDepth = ScrollDepth;
  } else {
    root.ScrollDepth = ScrollDepth;
  }
})();
